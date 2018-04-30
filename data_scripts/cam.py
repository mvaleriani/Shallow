from keras.models import *
from keras.callbacks import *
import keras.backend as K
import cv2
import os

def get_output_layer(model, layer_name):
    # get the symbolic outputs of each "key" layer (we gave them unique names).
    layer_dict = dict([(layer.name, layer) for layer in model.layers])
    layer = layer_dict[layer_name]
    return layer

def visualize_class_activation_map(model_path, img_path, output_path):
        model = load_model(model_path)
        original_img = cv2.imread(img_path, 1)
        width, height, _ = original_img.shape

        #Reshape to the network input shape (3, w, h).
        img = np.array([np.transpose(np.float32(original_img), (2, 0, 1))])
        
        #Get the 512 input weights to the softmax.
        class_weights = model.layers[-1].get_weights()[0]
        model.summary()
        final_conv_layer = get_output_layer(model, "block5_conv3")
        get_output = K.function([model.layers[0].input], [final_conv_layer.output, model.layers[-1].output])
        [conv_outputs, predictions] = get_output([img])
        conv_outputs = conv_outputs[0, :, :, :]

        #Create the class activation map.
        cam = np.zeros(dtype = np.float32, shape = conv_outputs.shape[1:3])
        for i, w in enumerate(class_weights[:, 1]):
                cam += w * conv_outputs[i, :, :]
        print ("Predictions")
        print ("===================================")
        print(img_path)
        print("Fake Percentage: ", format((predictions[0][0] * 100), '.8f'), '%')
        print("Real Percentage: ", format((predictions[0][1] * 100), '.8f'), '%')
        print ("===================================")
        
        cam /= np.max(cam)
        cam = cv2.resize(cam, (height, width))
        heatmap = cv2.applyColorMap(np.uint8(255*cam), cv2.COLORMAP_JET)
        heatmap[np.where(cam < 0.2)] = 0
        img = heatmap*0.5 + original_img
        cv2.imwrite(output_path, img)

root = os.path.dirname(os.path.abspath(__file__))
model_path = root + '/channels_first_test_model.h5'
output_path1 = root + '/heatmap_real1.jpg'

image_path1 = root + '/real1.jpg'


visualize_class_activation_map(model_path, image_path1, output_path1)
