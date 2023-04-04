from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
from model.AutoEncoder import decoder
from model.Classification import c_model
from model.EncodeReader import text_reader, name_reader
from model.MF import MatrixFactorization

app = Flask(__name__)
# CORS(app, resource={r'*': {'origins': 'http://localhost:8081/api'}})
# cors = CORS(app, resources={r"/api/*": {"localhost:8000": "*"}})

## 00. Static Variables 읽어내기
encoded_imgs = text_reader("encoded_imgs.txt")
origin_imgs = text_reader("origin_imgs.txt")
scents_name = name_reader()

################################################################# 임시 !!
factor = {1:[0, 1, 2, 3], 2:[4, 5, 6],
          3:[7, 8, 9, 10, 11], 4:[12, 13, 14, 15],
          5:[16, 17, 18, 19], 6:[20, 21, 22, 23],
          7:[24, 25, 26, 27], 8:[28, 29, 30, 31]}
#################################################################
## 01. 최초 선호도 테스트
@app.route('/api/ml/result', methods=['POST'])
def get_result():
    ## >> input : preference="0.9;0.8 ..."  || a=[1, 3, 2 ...]
    params = request.get_json()
    print(params)
    choose = params['choose']
    preference = params['pastPreference']
    if preference == '':
        preference = np.full((1, 32), 0.001).tolist()
    else:
        preference = list(map(float, params['pastPreference'].split(';')))
    ############################## bias 수정 !!!!!!!
    for choice in choose:
        if choice == 1:
            for i in factor[choice]:
                preference[0][i] += 0.05
    ############################## bias 수정 !!!!!!!
    result = ''
    for pre in preference:
        result += str(pre)
        result += ';'
    ## >> output : '0.454984;0.49897;0.894723...'
    return jsonify(result)

## 02. 선호도 점수 출력
## 02-1-a. 향수 상세
@app.route('/api/ml/predict/detail', methods=['POST'])
def predict_detail():
    ## >> input : preference="0.9;0.8 ..."  || now_perfume=30
    params = request.get_json()
    preference = list(map(float, params['preference'].split(';')[:-1]))
    preference = np.array(preference).reshape(1, -1)
    now_perfume = params['nowPerfume']
    target_perfume = np.array(encoded_imgs[now_perfume]).reshape(1, -1)
    predict_rate = target_perfume.dot(preference.T)
    decoded_img_prefer = decoder.predict(preference)
    origin_target_perfume = np.array(origin_imgs[now_perfume]).reshape(1, -1)
    fav_notes = []
    wor_notes = []
    for i in range(len(decoded_img_prefer[0])):
        if 0.5 > origin_target_perfume[0][i]:
            continue
        if decoded_img_prefer[0][i] > 0.5:
            fav_notes.append(i)
        else:
            wor_notes.append(i)
    if predict_rate >= 5:
        predict_rate = 5.0
    result = {"predictRate": round(predict_rate[0][0]/2, 1), "favNotes": fav_notes[:5], "worNotes": wor_notes[:5]}
    return jsonify(result)

## 02-1-b. 향수 상세
@app.route('/api/ml/predict/detail/similar', methods=['POST'])
def predict_detail_similar():
    ## >> input : preference="0.9;0.8 ..."  || now_perfume=30
    params = request.get_json()
    now_perfume = params['nowPerfume']
    target_perfume = encoded_imgs[now_perfume].reshape(1, -1)
    similar_perfumes = []
    for pi in range(1003):
        if pi == now_perfume:
            continue
        similar_perfumes.append((target_perfume.dot(origin_imgs[pi].reshape(1, -1)), pi))
    similar_perfumes_idx = np.argsort(similar_perfumes, reversed=True)
    result = {"similarPerfumes": similar_perfumes_idx[:10]}
    return result


## 02-2. want it
@app.route('/api/ml/predict/want', methods=['POST'])
def predict_want_it():
    ## >> input : preference="0.9;0.8 ..."  || wantit=[5, 3, 2, ...]
    params = request.get_json()
    preference = list(map(float, params['preference'].split(';')))
    preference = np.array(preference).reshape(1, -1)
    wants = params['wantPerfume']
    answer_arr = []
    for now in wants:
        target_perfume = encoded_imgs[now].reshape(1, -1)
        answer = target_perfume.dot(preference.T)
        if answer > 5:
            answer = 5.0
        answer_arr.append((round(answer, 2), now))
    ## >> output : [4.8, 233], [3.3, 10] ...
    return answer_arr

## 02-3. 전체
@app.route('/api/ml/predict/all', methods=['POST'])
def predict_all():
    ## >> input : preference="0.9;0.8 ..."
    params = request.get_json()
    preference = list(map(float, params['preference'].split(';')))
    preference = np.array(preference).reshape(1, -1)
    answer_arr = []
    for i in range(1003):
        target_perfume = encoded_imgs[i].reshape(1, -1)
        answer = target_perfume.dot(preference.T)
        if answer > 5:
            answer = 5.0
        answer_arr.append((round(answer, 2), i))
    ## >> output : [4.8, 233], [3.3, 10] ...
    return answer_arr

## 03. 선호도 업데이트
@app.route('/api/ml/update', methods=['POST'])
def update_preference():
    ## >> input : perfumes = [[향수idx, 평점], ... ]
    params = request.get_json()
    data = params['perfumes']
    pidx, prate = data[0]
    R = [[prate]]
    input_vec = encoded_imgs[pidx].reshape(1, -1)
    for i in range(1, len(data)):
        pidx, prate =data[i]
        R.append([prate])
        input_vec = np.concatenate((input_vec, encoded_imgs[i].reshape(1, -1)), axis=0)
    factorizer = MatrixFactorization(input_vec, R, k=32, learning_rate=0.01, reg_param=0.01, epochs=500, verbose=True)
    factorizer.fit()
    preference = factorizer.print_results()
    result = ''
    for pre in preference:
        result += str(pre)
        result += ';'
    return result

## 04. 워드클라우드
@app.route('/api/ml/words', methods=['POST'])
def get_words():
    ## input : preference='0.92;0.83;...'
    params = request.get_json()
    preference = list(map(float, params['preference'].split(';')))
    preference = np.array(preference).reshape(1, -1)
    decoded_preference = decoder(preference)
    decoded_preference_idx = np.argsort(decoded_preference, reversed=True)
    result = []
    for dpi in decoded_preference_idx:
        result.append((scents_name[1][dpi], decoded_preference))
    ## >> output : [['vanilla', 0.98], ['Musk, 0.88], ...]
    return jsonify(result)

## 05. 탑노트와 선호 노트 정렬
@app.route('/api/ml/update', methods=['POST'])
def get_note_graph():
    ## input : preference='0.92;0.83;...'
    params = request.get_json()
    preference = list(map(float, params['preference'].split(';')))
    preference = np.array(preference).reshape(1, -1)
    decoded_preference = decoder(preference)        ## 아마 오류
    top_res_idx = c_model.predict(decoded_preference).index(1)
    top_res = scents_name[0][top_res_idx]
    note_sorted_idx = np.argsort(decoded_preference, reversed=True)
    result = {"mainScent":top_res, "middleWeight":note_sorted_idx[:80], "baseWeight":note_sorted_idx[81:160]}
    ## >> output : top='Vanilla' || middleWeight=['0.20, 0.98, ....] || baseWeight=['0.20, 0.98, ....]
    return jsonify(result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=False)