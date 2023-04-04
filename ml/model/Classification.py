from tensorflow import keras
from keras.layers import Dense, Conv2D, MaxPooling1D

c_model = keras.Sequential()

c_model.add(Dense(128, activation='relu'))
c_model.add(Dense(64, activation='relu'))
c_model.add(Dense(11, activation='softmax'))

c_model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# # history = c_model.fit(x_train, y_train, epochs=20, validation_split=0.2, batch_size=10)
# history = c_model.fit(x_all, y_all, epochs=20, batch_size=20, shuffle=True, validation_split=0.2)

# loss_test, acc_test = c_model.evaluate(x_test, y_test)


