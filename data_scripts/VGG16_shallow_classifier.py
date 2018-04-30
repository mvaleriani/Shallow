from keras.applications.vgg16 import VGG16
from keras.preprocessing.image import ImageDataGenerator
from keras import optimizers
from keras.models import Sequential
from keras.layers import Dropout, Flatten, Dense
from time_history import TimeHistory
from result_collection import record_row
import os

# Variables meant for tweaking
notes = "Initial Run with complete data"
path_to_excel_sheet = os.path.dirname(os.path.abspath(__file__)) + '/results.xlsx'
model_version = "channels_first_test"
loss_function = 'categorical_crossentropy'
momentum = 0.9
learning_rate = 0.01 #0.01
metrics = 'categorical_accuracy'
weights = 'vgg16'
nb_train_samples = 15614 # 4630
nb_validation_samples = 4872 # 3000
epochs = 20 #20 is picked at random, use that for standard
batch_size = 100
time_callback = TimeHistory()
record_obj = {
    'notes': notes,
    'path_to_excel_sheet': path_to_excel_sheet,
    'model_version': model_version,
    'loss_function': loss_function,
    'momentum': momentum,
    'learning_rate': learning_rate,
    'metrics': metrics,
    'weights': weights,
    'nb_train_samples': nb_train_samples,
    'nb_validation_samples': nb_validation_samples,
    'epochs': epochs,
    'batch_size': batch_size
}
# Core Variable means one of the main features meant for tweaking
root = os.path.dirname(os.path.abspath(__file__))
weights_path = root + '/keras/weights/vgg16_weights.h5'
print("weights_path:", weights_path)
img_width, img_height = 224, 224

train_data_dir = root + '/data/train'
validation_data_dir = root + '/data/validation'


# build the VGG16 network
model = VGG16(weights=None, include_top=False, input_shape=(3, 224, 224))
print('Model loaded.')

# build a classifier model to put on top of the convolutional model
top_model = Sequential() # Determines the type of top model
# Adds the convolutional model to the classifier
for layer in model.layers:
    top_model.add(layer)
# formats the input for the classifier to the convolutional base output
top_model.add(Flatten(input_shape=model.output_shape[1:]))

# Condenses the input from flatten down to 256 nodes
top_model.add(Dense(256, activation='relu'))

# Discards a portion of the test data, prevents overfitting. Core Variable 
top_model.add(Dropout(0.5)) #0.5
# top_model.add(Dense(256, activation='relu'))

# Condenses the remaining input down into 2 categories
top_model.add(Dense(2, activation='softmax', name='predictions'))

# set the first 25 layers (up to the last conv block)
# to non-trainable (weights will not be updated)
# for layer in top_model.layers[:25]:
    # layer.trainable = False

# compile the model with a SGD/momentum optimizer
top_model.compile(loss=loss_function,
              optimizer=optimizers.SGD(lr=learning_rate, momentum=momentum, decay=1e-6, nesterov=True), #learning rate(lr) and momentum are Core Variables
              # SGD options to consider: Nesterov, learning rate decay
              metrics=[metrics])

# prepare data augmentation configuration
train_datagen = ImageDataGenerator(
    rescale=1. / 255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True)

test_datagen = ImageDataGenerator(rescale=1. / 255)

train_generator = train_datagen.flow_from_directory(
    train_data_dir,
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical')

validation_generator = test_datagen.flow_from_directory(
    validation_data_dir,
    target_size=(img_height, img_width),
    batch_size=batch_size,
    class_mode='categorical')

# fine-tune the top_model
history = top_model.fit_generator(
    train_generator,
    samples_per_epoch=nb_train_samples,
    epochs=epochs,
    validation_data=validation_generator,
    validation_steps=nb_validation_samples/batch_size,
    verbose=1,
    callbacks=[time_callback])

top_model.summary()

path_to_save_model = '{}/keras/models/{}_model.h5'.format(root, model_version)
path_to_save_weight = '{}/keras/weights/{}_weight.h5'.format(root, model_version)

top_model.save(path_to_save_model)
top_model.save_weights(path_to_save_weight)
record_row(history, record_obj, time_callback.times)

# Comment back in if you want to use the prototype heatmap
# display_heatmap_results(model_version)
