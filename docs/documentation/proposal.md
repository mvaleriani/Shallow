# Proposal

## Background / Overview

History of DeepFake

* DeepFakes made their first online-appearance as an innocent tech-demo, meant to simply swap faces. Eventually, the software made its way into the hands of the Internet who proceeded to make NSFW videos using popular movie actresses.

What does DeepFake do?

* FakeApp (The modern generator of DeepFakes) will take in a considerable amount of images for a particular person before being given a video. Using the 3-dimensional model of the face, the AI maps over the old face with it’s idea of the target.  

What is the reason you want to combat this? Moral? Ethical? Consent?

* In terms of philosophy, the concept of a DeepFake is a nightmare, carrying large implications for the world at large.  First and foremost, neither the target of the fake and the “host” would give their consent to the use of their likenesses. Furthermore, large-scale application of the technology would erode the credibility of video evidence in the court of law.

What is TensorFlow?

* An open source library primarily meant for the construction and training of neural networks. It provides many abstract methods that allow for a quick deployment of a working neural network. We will be using a version of TensorFlow called TensorFlow.js which allows for a machine learning model to be run in the browser, on the end users side.

Why did we choose it?

* Google’s official support for TensorFlow as well as the community surrounding the technology made it very appetizing for an entry point into the field of machine learning.

How will we incorporate it?

* TensorFlow.js will allow us to embed our model’s interface into the webpage for easy access. From here, the user can upload a video file or supply a link to a video that will be evaluated by the trained model.

## Functionality / MVP

- [ ] Data collection 

    - [ ] Amount of data is appropriate to obtain            accurate results
    - [ ] Data correlates to three different classes
        - [ ] DeepFakes
        - [ ] Random
            - [ ] Corresponding celebrity
- [ ] Data processing
    - [ ] 3000+ DeepFaked’d frames extracted from videos 
    - [ ] 3000+ frames of corresponding celebrities with no alterations
    
    - [ ] 3000+ frames of random, unaltered images with faces
    
    - [ ] Correct label and file structure of frames 
- [ ] Model creation 
- [ ] Model training 
- [ ] Model and data evaluation
- [ ] Importing the model to the frontend
  - [ ] Integration of TensorFlow.js to utilize the model created by Keras 
  - [ ] Allowing the user to utilize the pre-trained model to analyze their own videos
  - [ ] Set specific requirements necessary for accurate results by the user
- [ ] Front end styling and bug-free navigation
  - [ ] User is able to upload a video file to be analyzed 
  - [ ] Integration of a video clipping / face cropping for analysis 

## Wireframe 
![Wireframe](https://i.imgur.com/6QWlmR1.png)

## Technologies / Challenges

### Technologies

* TensorFlow.js ( JavaScript )
  * Low-level machine learning code where backpropagation, gradient descent, and loss calculations are run.
* Keras ( Python )
  * High-level machine code used to manage the models within Tensorflow. Allows for faster prototyping and modification.
* React / Redux 
  * Frontend rendering and state manager. Users will interact with the trained model here by specifying the file they wish to analyze.
* Possibly Rails
  * ???
* Scraper / Selenium
  * Necessary if grabbing the files in bulk (via zip file or torrent) leads to data corruption. The scraper would parse a given site’s HTML and grab all urls to relevant videos  
* OpenCV
  * Necessary if we want to automate video to frames data processing  
### Challenges
* Learning Python, Keras, TensorFlow.js, and core concepts of machine learning
* Data bias
* Amount of data
* Usefulness of extracted data
* Automating data collection
* Automating data processing
* Optimization of data used, data processing, and actual machine training
  * Data must be sifted through to eliminate any frames not relevant to recognizing deepfakes (i.e. frames where the face is out of view)

## Tasks / Timeline

### Tasks

- [ ] Collecting training data
  - [ ] This includes false positives and false negatives
  - [ ] This is where our bias challenge will arise but more of that data will help
  - [ ] Data must not lean more towards positive or negative results; unbiased
  - [ ] Using at least 300 videos of DeepFake’d videos with at least 10 frames containing the DeepFake’d face
  - [ ] Using at least 300 videos of random videos with no alteration and at least 10 frames containing faces 
  - [ ] Using at least 300 videos with at least 10 frames of the corresponding celebrity’s face
- [ ] Preparing training data
  - [ ] 3000+ DeepFaked’d frames extracted from videos 
  - [ ] 3000+ frames of corresponding celebrities with no alterations
  - [ ] 3000+ frames of random, unaltered images with faces
  - [ ] Correct label and file structure of frames 
  - [ ] Automate frame clipping of videos and generate 224x224 facial images
    - [ ] Facial images generated using FaceCropJet
    - [ ] Frames generated using XYZ
- [ ] Train the model
- [ ] Review and evaluate prediction and record results
- [ ] Rinse and repeat until certain time has elapsed or until accurate / effective
- [ ] Front-end stuff such as video upload and analysis
  - [ ] Integration of video clipping / face cropping on front end 
  - [ ] Integration of Keras model with user interaction 
    - [ ] Video file chooser

### Timeline  

#### Day 1 Apr 21  

- [ ] Research
- [ ] Core concepts of Machine Learning
- [ ] Keras, TensorFlow.js and other new technologies used   

#### Day 2 Apr 22  

- [ ] Developing a proposal
- [ ] Delegation of workload 
- [ ] Research and inner-group proposals
- [ ] Start on data collection and processing
- [ ] Start on model development  

#### Day 3 Apr 23  

- [ ] Completion of different model versions 
- [ ] Obtaining appropriate dataset to test models
- [ ] Start on model testing
- [ ] More data collection / front-end integration  

#### Day 4 Apr 24  

- [ ] Appropriate dataset to test and evaluate models
- [ ] Evaluation of dataset and models
- [ ] Choosing model(s) to train on
- [ ] Continue data collection and processing / front-end integration  

#### Day 5 Apr 25  

- [ ] Continue model training and evaluation 
- [ ] Evaluate data
- [ ] Continue data collection and processing / front-end integration
- [ ] Automating data processing  

#### Day 6 Apr 26  

- [ ] Continue model training and evaluation 
- [ ] Evaluate data 
- [ ] If necessary, collect more data and process data  

#### Day 7 Apr 27  

- [ ] Continue model training and evaluation
- [ ] If necessary, collect more data and process data
- [ ] Front-end styling
- [ ] Testing model on the front-end  

#### Day 8 Apr 28  

- [ ] Continue model training and evaluation
- [ ] If necessary, collect more data and process data
- [ ] Front-end styling
- [ ] Testing model on front-end 
- [ ] Research notes and documentation  

#### Day 9 Apr 29  

- [ ] Production readme 
- [ ] Full testing
- [ ] Research notes and documentation  

#### Day 10 Apr 30  

- [ ] Project turn-in  

