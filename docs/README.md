<p align="center"> 
  
  <a href="https://mvaleriani.github.io/Shallow/#/">
    <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/RNN.png">
  </a>
  
   <a href="https://mvaleriani.github.io/Shallow/#/">
    <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/title.png">
  </a>
  
  <p align="center"><i>"Deepfake detection with deep learning"</i></p>
</p> 

## Shallow
Shallow is a web-based application developed using VGG16, a Keras convolutional neural network specializing in photo-recognition, React.js and Tensorflow.js. Our goal with this project was to create a Convolutional Neural Network (CNN) capable of distinguishing between real and faked videos in order to protect the reputation and integrity of anyone who could be affected by faked videos.  
  
[Try us out!](https://mvaleriani.github.io/Shallow/#/)
## Why was this created?

In 2017, fake celebrity pornographic videos called Deep Fakes surfaced, creating scandals for all involved and opening the door to what is actually possible to fake. Since it's introduction, the technology behind DeepFakes has been used in politics as well as "revenge porn". As it currently stands, only the quality of the video is able to distinguish the authenticity, and that will disappear as the process is refined.

Our goal with this project was to create a Convolutional Neural Network (CNN) capable of distinguishing between real and faked videos in order to protect the reputation and integrity of anyone who could be affected by faked videos.

<a name="links">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/RNN_1_24x24.png">
      Linking Pleasures
  </h2>  
</a>

- [Main Feature](#main-feature)
- [Data Collection and Processing](#data)
- [Model Configurations](#model-config)
- [Training the Model](#model-training)
- [Results](#results)
- [Acknowledgements](#acknowledgements)
- [Project Direction](#project-direction)

<a name="technologies">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/RNN_1_24x24.png">
      Technologies
  </h2>  
</a>
  
|Tensorflow.js|Keras|React|HTML5/CSS3/JavaScript|
|:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:|
|<img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/tfjs_32x32.jpg">|<img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/keras_32x32.png">|<img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/react.png">|<img src="https://github.com/MoistCode/ImaginaryNumblr/blob/master/readme_gifs/Webp.net-resizeimage(4).png">|


<a name="main-feature">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/RNN_1_24x24.png">
      Main Feature
  </h2>  
</a>
  Users will be able to upload a video, select the face crops they want to test, and once they have 20, run them through the model. From there, the user will wait as the model processes the image and will have the image's authenticity appear.

<a name="data">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/RNN_1_24x24.png">
      Data Collection & Processing
  </h2>  
</a>
  Our dataset consists of four different categories. fake training data, real training data, fake validation data, and real validation data. Variety was met in the real training data with a focus of 30% images of non-adult film stars and 70% of adult film stars. The same ratio was also used for our validation dataset however, all data in the validation set are images the model has never seen before. 

<a name="model-config">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/RNN_1_24x24.png">
      Model Configuration
  </h2>  
</a>
  Our model utilizes the VGG16 model, a deep-learning neural network specializing in distinguishing images. There were no pre-trained weights that were used as we felt the classifications were drastically different from those provided by ImageNet. Instead, the weights were randomized. The top layer of the provided VGG16 model was also not used. Instead four additional layers (Flatten, Dense, Dropout, and Dense) were added in which the activation function is 'RELU' and 'SOFTMAX' respectively and a numerical parameter of 0.5 for the Dropout layer to reduce the risk of overfitting. A list of configurations is provided below:  
    
    
* Loss Function: Categorical Cross Entropy
* Weights: None (Initially random)
* Training Samples: 15614 images (224x224)
* Validation Samples: 4872 images (224x224)
* Epochs Ran: 20
* Batch Size: 100
* Learning Rate: 0.01
* Momentum: 0.9


<a name="model-training">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/RNN_1_24x24.png">
      Model Training
  </h2>  
</a>

  Our model was train on two separate datasets and validated on an additional two datasets. Training was spent on 15613 different images with a ratio of 50/50 between DeepFake'd images and real images. Validation occured on 4872 with the same 50/50 ratio between DeepFake'd images and real images. The validation dataset are images the model has never encountered before.

<a name="results">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/RNN_1_24x24.png">
      Results
  </h2>  
</a>
  Our base model for Shallow is VGG16, an award winning photo-recognition CNN. Since we are using an already establish model, we only needed to fine tune it for our purposes. With that in mind, we were able to achieve 99% accuracy with our model.  
It should be noted though, that our model was trained on the data available to us and may not be fully representative for all people. With that in mind, we aspire to continue teaching and developing our model if the current trend continues to grow.
 <h3>Training Results</h3>
 <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/train_loss.png">

 <h3>Fake Image ConvNet Heatmap</h3>
 <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/fake_hm.png">

 <h3>Real Image ConvNet Heatmap</h3>
 <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/real_hm.png">

<a name="acknowledgements">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/RNN_1_24x24.png">
      Acknowledgements
  </h2>  
</a>

```
Very Deep Convolutional Networks for Large-Scale Image Recognition
K. Simonyan, A. Zisserman
arXiv:1409.1556
```
  
  <a name="project-direction">
  <h2>
    <img src="https://raw.githubusercontent.com/MoistCode/Resources/master/Programming/ReadmeStructures/Shallow/images/RNN_1_24x24.png">
      Project Direction
  </h2>  
</a>

* Further training / tweaking
* Diverse dataset
* Extend supported video formats
* Add support for video links
* Extend supported image formats
* Add support for image links
* Individual professional development of Machine-Learning concepts
* Application of model for small organizations
