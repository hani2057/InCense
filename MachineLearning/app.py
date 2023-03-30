import json
from flask import Flask, request
from flask_cors import CORS
import numpy as np

from AutoEncoder import MatrixFactorization
encoded_imgs = open("/content/noon_perfumes_dataset.csv")

app = Flask(__name__)
# CORS(app)
cors = CORS(app, resources={r"/api/*": {"localhost:8000": "*"}})

# def ajaxImage(imageSize):
#     content = request.values['image'].split(';')[1]
#     image_encoded = content.split(',')[1]
#     body = base64.decodebytes(image_encoded.encode('utf-8'))
#     img = np.array(Image.open(BytesIO(body)).convert("L"))
#     # image = cv2.resize(img, imageSize)/255.0
#     image = np.reshape(img, (1, imageSize[0], imageSize[1]))
#     return image

## 수정 사항 >> 연관관계 분석
factor = {"a":[0, 1, 2, 3], "b":[4, 5, 6],
          "c":[7, 8, 9, 10, 11], "d":[12, 13, 14, 15],
          "e":[16, 17, 18, 19], "f":[20, 21, 22, 23],
          "g":[24, 25, 26, 27], "i":[28, 29, 30, 31]}


## 01. 최초 선호도 테스트
@app.route('/result', methods=['GET'])
def get_result():
    preference = np.full((1, 32), 0.001)
    data = json.loads('data')   ## a=131002
    for ele in data:
        if ele == 1:
            for i in factor[ele]:
                preference[0][i] += 0.05
    result = ''
    for pre in preference[0]:
        result += str(pre)
        result += ';'           ##'0.454984;0.49897;0.894723'
    return result


## 02. 선호도 기반 향수 점수 출력
#### encoded_image 를 바로 저장해서 사용
@app.route('/predict', methods=['GET'])
def make_prediction():
    ## pref='0.13213;0.495323;...
    ## now_perf = 향수idx
    preference = list(map(float, json.loads('pref').split(';')))
    preference = np.array(preference).reshape(1, -1)
    now = json.loads('now_perf')
    target_perfume = encoded_imgs[now].reshape(1, -1)
    answer = target_perfume.dot(preference.T)
    return str(answer)


## 03. 선호도 업데이트
@app.route('/update', methods=['GET'])
def update_preference():
    ## perfs = [[향수idx, 평점], ... ]
    data = json.loads('perfs')  ## a=131002
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




if __name__ == '__main__':
    app.run(host='localhost', port=5000, threaded=False)