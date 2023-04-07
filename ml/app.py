import numpy as np
from flask import Flask, jsonify, request
from model.Reader import text_reader, name_reader, theme_reader
from model.MF import MatrixFactorization
from keras.models import load_model

app = Flask(__name__)

# 00. Static Variables 읽어내기
encoded_imgs = text_reader("./static/encoded_imgs.txt")
origin_imgs = text_reader("./static/origin_imgs.txt")
name_perfumes = name_reader("./static/name_perfumes.txt")

name_top = name_reader("./static/name_top.txt")
name_middle = name_reader("./static/name_middle.txt")
name_base = name_reader("./static/name_base.txt")

name_all_sorted_notes = name_reader("./static/name_all_sorted_notes.txt")
name_all_sorted_top = name_reader("./static/name_all_sorted_top.txt")

c_model = load_model("./model/c_model_path/")
decoder = load_model("./model/decoder_path/")

theme_path = ["./static/result_woody.txt", "./static/result_floral.txt", "./static/result_sweet.txt",
              "./static/result_city.txt"]
no_theme_path = ["./static/nofresh.txt", "./static/nocitrus.txt", "./static/noarabian.txt",
                 "./static/novanilla.txt", "./static/nomusk.txt", "./static/noLike.txt"]
theme = [theme_reader(i) for i in theme_path]
no_theme = [theme_reader(i) for i in no_theme_path]

#################################################################
# 01. 최초 선호도 테스트
@app.route('/ml/result', methods=['POST'])
def get_result():
    params = request.get_json()
    choose = params['choose']
    past_preference = params['pastPreference']
    if past_preference == '':
        past_preference = np.full((1, 32), 0.001).tolist()
    else:
        past_preference = [list(map(float, params['pastPreference'].split(';')[:-1]))]
    theme_preference = theme[choose[0]]
    no_preference = no_theme[choose[3]]
    new_preference = ''
    for i in range(len(past_preference[0])):
        now = (past_preference[0][i] + theme_preference[i] - no_preference[i]) / 3
        new_preference += str(now)
        new_preference += ';'
    result = {"preference": new_preference}
    return jsonify(result)


# 02. 선호도 점수 출력
# 02-1-a. 향수 상세
@app.route('/ml/predict/detail', methods=['POST'])
def predict_detail():
    params = request.get_json()
    if params['preference'] == '':
        preference = np.full((1, 32), 0.001).reshape(1, -1)
    else:
        preference = list(map(float, params['preference'].split(';')[:-1]))
        preference = np.array(preference).reshape(1, -1)
    now_perfume = params['nowPerfume']
    target_perfume = np.array(encoded_imgs[now_perfume]).reshape(1, -1)
    predict_rate = target_perfume.dot(preference.T)[0][0]
    decoded_preference = decoder(preference)[0]
    decoded_img_prefer = np.array(decoded_preference).reshape(1, -1)
    origin_target_perfume = np.array(origin_imgs[now_perfume]).reshape(1, -1)
    fav_notes = []
    wor_notes = []
    for i in range(len(decoded_img_prefer[0])):
        if 0.5 > origin_target_perfume[0][i]:
            continue
        if decoded_img_prefer[0][i] > 0.5:
            now_note_name = name_all_sorted_notes[i]
            fav_notes.append(now_note_name)
        else:
            now_note_name = name_all_sorted_notes[i]
            wor_notes.append(now_note_name)
    if predict_rate >= 5.0:
        predict_rate = 5.0
    result = {"predictRate": round(predict_rate, 1),
              "favNotes": fav_notes[:5],
              "worNotes": wor_notes[:5]}
    return jsonify(result)


# 02-1-b. 향수 상세
@app.route('/ml/predict/detail/similar', methods=['POST'])
def predict_detail_similar():
    params = request.get_json()
    now_perfume = params['nowPerfume']
    target_perfume = np.array(encoded_imgs[now_perfume]).reshape(1, -1)
    similar_perfumes = []
    for pi in range(1003):
        if pi == now_perfume:
            continue
        similar_perfumes.append((target_perfume.dot(
            np.array(encoded_imgs[pi]).reshape(-1, 1)).tolist()[0][0], pi))
    similar_perfumes.sort()
    temp = []
    for spi in similar_perfumes[:5]:
        temp.append(spi[1])
    result = {"similarPerfumes": temp}
    return jsonify(result)


# 02-2. want it
@app.route('/ml/predict/want', methods=['POST'])
def predict_want():
    params = request.get_json()
    if params['preference'] == '':
        preference = np.full((1, 32), 0.001).reshape(1, -1)
    else:
        preference = list(map(float, params['preference'].split(';')[:-1]))
        preference = np.array(preference).reshape(1, -1)
    wants = params['wantPerfume']
    answer_arr = []
    for now in wants:
        target_perfume = np.array(encoded_imgs[now]).reshape(1, -1)
        answer = target_perfume.dot(preference.T)[0][0]
        if answer > 5:
            answer = 5.0
        answer_arr.append({"predict": answer, "perfumeIndex": now})
    answer_arr.sort(key=lambda x: x["predict"], reverse=True)
    result_json = {"result": []}
    for aaa in answer_arr:
        result_json["result"].append(aaa)
    return jsonify(result_json)


# 02-3. 전체
@app.route('/ml/predict/all', methods=['POST'])
def predict_all():
    params = request.get_json()
    if params['preference'] == '':
        preference = np.full((1, 32), 0.001).reshape(1, -1)
    else:
        preference = list(map(float, params['preference'].split(';')[:-1]))
        preference = np.array(preference).reshape(1, -1)
    answer_arr = []
    for i in range(1003):
        target_perfume = np.array(encoded_imgs[i]).reshape(1, -1)
        answer = target_perfume.dot(preference.T)[0][0]
        if answer > 5:
            answer = 5.0
        answer_arr.append({"predict": answer, "perfumeIndex": i})
    answer_arr.sort(key=lambda x: x["predict"], reverse=True)
    result_json = {"result": []}
    cnt_set = set()
    for st in [0, 10, 30, 50, 80, 120, 170]:
        cnt = 0
        for i in range(st, len(answer_arr)):
            aaa = answer_arr[i]
            if cnt == 3:
                break
            now_name = name_perfumes[aaa["perfumeIndex"]]
            if now_name in cnt_set:
                continue
            result_json["result"].append(aaa)
            cnt_set.add(now_name)
    return jsonify(result_json)


# 03. 선호도 업데이트
@app.route('/ml/update', methods=['POST'])
def update_preference():
    params = request.get_json()
    data = params['perfumes']
    pidx, prate = data[0]["perfumeIndex"], data[0]["rating"]
    R = [[prate]]
    input_vec = np.array(encoded_imgs[pidx]).reshape(1, -1)
    for i in range(1, len(data)):
        pidx, prate = data[i]["perfumeIndex"], data[i]["rating"]
        R.append([prate])
        input_vec = np.concatenate(
            (input_vec, np.array(encoded_imgs[i]).reshape(1, -1)), axis=0)
    factorizer = MatrixFactorization(input_vec, np.array(R), k=32, learning_rate=0.01, reg_param=0.01, epochs=500, verbose=True)
    factorizer.fit()
    preference = factorizer.print_results()
    new_preference = ''
    for pre in preference[0]:
        new_preference += str(pre)
        new_preference += ';'
    result = {"preference": new_preference}
    return jsonify(result)


# 04. 워드클라우드
@app.route('/ml/word', methods=['POST'])
def get_words():
    params = request.get_json()
    if params['preference'] == '':
        preference = np.full((1, 32), 0.001).reshape(1, -1)
    else:
        preference = list(map(float, params['preference'].split(';')[:-1]))
        preference = np.array(preference).reshape(1, -1)
    decoded_preference = decoder(preference)[0]
    decoded_preference = np.array(decoded_preference).reshape(1, -1)
    temp = []
    for i in range(len(decoded_preference[0])):
        temp.append((decoded_preference[0][i], i))
    temp.sort(reverse=True)
    result_json = {"cloud": []}
    cnt = 0
    for tpp in temp:
        if cnt == 50:
            break
        now_note_name = name_all_sorted_notes[tpp[1]]
        result_json["cloud"].append({"text": now_note_name, "value": str(tpp[0])})
        cnt += 1
    return jsonify(result_json)


# 05. 탑노트와 선호 노트 정렬
@app.route('/ml/graph', methods=['POST'])
def get_note_graph():
    params = request.get_json()
    if params['preference'] == '':
        preference = np.full((1, 32), 0.001).reshape(1, -1)
    else:
        preference = list(map(float, params['preference'].split(';')[:-1]))
        preference = np.array(preference).reshape(1, -1)
    decoded_preference = decoder(preference)[0]
    decoded_preference = np.array(decoded_preference).reshape(1, -1)
    predicted = c_model.predict(decoded_preference)
    top_res_idx = np.where(predicted == np.amax(predicted))[1].tolist()[0]
    top_res = name_all_sorted_top[top_res_idx]
    note_sorted_name, now_middle_note, now_base_note = [], [], []
    for i in range(len(decoded_preference[0])):
        now_note_name = name_all_sorted_notes[i]
        if now_note_name in name_middle:
            now_middle_note.append((decoded_preference[0][i], now_note_name))
        else:
            now_base_note.append((decoded_preference[0][i], now_note_name))
    now_middle_note.sort(reverse=True)
    now_base_note.sort(reverse=True)
    result_json = {"mainScent": top_res, "middleWeight": [], "baseWeight": []}
    cnt = 0
    for mnsi in now_middle_note:
        if cnt == 30:
            break
        mw, mi = mnsi
        result_json["middleWeight"].append({"word": mi, "weight": str(mw)})
        cnt += 1
    cnt = 0
    for bnsi in now_base_note:
        if cnt == 30:
            break
        bw, bi = bnsi
        result_json["baseWeight"].append({"word": bi, "weight": str(bw)})
        cnt += 1
    return jsonify(result_json)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=False)

# if __name__ == '__main__':
#     app.run(host='localhost', port=5000, threaded=False)
