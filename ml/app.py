import numpy as np
from flask import Flask, jsonify, request
from model.Reader import text_reader, name_reader
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

c_model_path = "./model/c_model_path/"
decoder_path = "./model/decoder_path/"
c_model = load_model(c_model_path)
decoder = load_model(decoder_path)


# 임시 !!
factor = {1: [0, 1, 2, 3], 2: [4, 5, 6],
          3: [7, 8, 9, 10, 11], 4: [12, 13, 14, 15],
          5: [16, 17, 18, 19], 6: [20, 21, 22, 23],
          7: [24, 25, 26, 27], 8: [28, 29, 30, 31]}
#################################################################
# 01. 최초 선호도 테스트
@app.route('/ml/result', methods=['POST'])
def get_result():
    params = request.get_json()
    choose = params['choose']
    preference = params['pastPreference']
    if preference == '':
        preference = np.full((1, 32), 0.001).tolist()
    else:
        preference = [list(map(float, params['pastPreference'].split(';')[:-1]))]
    ################# bias 수정 !!!!!!!
    for choice in choose:
        if choice == 1:
            for i in factor[choice]:
                preference[0][i] += 0.05
    ################# bias 수정 !!!!!!!
    new_preference = ''
    for pre in preference[0]:
        new_preference += str(pre)
        new_preference += ';'
    result = {"preference": new_preference}
    return jsonify(result)


# 02. 선호도 점수 출력
# 02-1-a. 향수 상세
@app.route('/ml/predict/detail', methods=['POST'])
def predict_detail():
    params = request.get_json()
    preference = list(map(float, params['preference'].split(';')[:-1]))
    preference = np.array(preference).reshape(1, -1)
    now_perfume = params['nowPerfume']
    target_perfume = np.array(encoded_imgs[now_perfume]).reshape(1, -1)
    predict_rate = target_perfume.dot(preference.T)
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
    if predict_rate >= 5:
        predict_rate = 5.0
    result = {"predictRate": round(predict_rate[0][0], 1),
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
    cnt = set()
    for aaa in answer_arr:
        if len(cnt) == 30:
            break
        now_name = name_perfumes[aaa["perfumeIndex"]]
        if now_name in cnt:
            continue
        result_json["result"].append(aaa)
        cnt.add(now_name)
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
    preference = list(map(float, params['preference'].split(';')[:-1]))
    preference = np.array(preference).reshape(1, -1)
    decoded_preference = decoder(preference)[0]
    decoded_preference = np.array(decoded_preference).reshape(1, -1)
    temp = []
    for i in range(len(decoded_preference[0])):
        temp.append((decoded_preference[0][i], i))
    temp.sort(reverse=True)
    result_json = {"cloud": []}
    for tpp in temp:
        now_note_name = name_all_sorted_notes[tpp[1]]
        result_json["cloud"].append({"word": now_note_name, "weight": str(tpp[0])})
    # string 으로 이름으로 보내기 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return jsonify(result_json)


# 05. 탑노트와 선호 노트 정렬
@app.route('/ml/graph', methods=['POST'])
def get_note_graph():
    params = request.get_json()
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
    for mnsi in now_middle_note:
        mw, mi = mnsi
        result_json["middleWeight"].append({"word": mi, "weight": str(mw)})
    for bnsi in now_base_note:
        bw, bi = bnsi
        result_json["baseWeight"].append({"word": bi, "weight": str(bw)})
    return jsonify(result_json)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=False)

# if __name__ == '__main__':
#     app.run(host='localhost', port=5000, threaded=False)
