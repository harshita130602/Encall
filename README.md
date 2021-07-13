# Welcome to ENCALL :)

![](https://i.imgur.com/bcU6nYd.png)


---


## CONTENTS OF THIS FILE
* **Introduction**
* **Technologies used**
* **Requirements**
* **Installation**
* **Agile Methodology**
* **Configuration**
* **Features**
* **Maintainer**
---



## Introduction
**ENCALL** is a Peer-to-Peer Communication platform developed by **Harshita Upadhyay** using Reactjs, Nodejs along with SOCKET.IO and WebRTC. It is a suitable application for web as well as mobile to use for Interviews as it offers Video/Audio Conferencing along with notes and whiteboard facility.
Hosted on - https://encall.netlify.app/

## Technologies used

* **ReactJS** 
Reatjs has been used for the **Front-end** as it is used for building user interfaces and for handling the view layer for web and mobile apps, which is what needed. **Encall is a web as well as mobile application.**

* **NodeJS**
Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. So, here it is used for **Back-end**.

* **WebRTC**
WebRTC (Web Real-Time Communication) is a free and open-source project providing web browsers and mobile applications with real-time communication (RTC) via simple application programming interfaces (APIs). It allows audio and video communication to work inside web pages by allowing direct peer-to-peer communication, eliminating the need to install plugins or download native apps. So, here it is used for **peer-to-peer video communication**.
* **SOCKET. IO**
Socket. IO enables real-time, bidirectional and event-based communication. It works on every platform, browser or device, focusing equally on reliability and speed. So, here it is used for **Video-communication as well as live text-editor** feature.    
---

## Requirements
   Your system must fulfill the following requirements in order to run it locally :- 
   * npm (Node package manager)
   * Reactjs
   * Nodejs
   * socket.io
   * cors
   * material-ui
   
You can install all the above requirements by first installing npm in your system and then run the following command:-
```
cd 'Project-directory name'
npm i
cd client
npm i
```


---

 ## Installation
   Follow the below instructions to run the code on your system:-
```
git clone https://github.com/harshita130602/Encall
cd Encall
npm install
npm run server
```
Then open another terminal window and type the following commands after entering Encall directory
```
cd client
npm install
npm start
```


---

## Agile Methodology Used
The Agile methodology is a way to manage a project by breaking it up into several phases, popularly known as sprints. So, the whole development of the project was divided into four different sprints :- 
*  **Design** - The Design Sprint is a fast-paced, agile approach to product design. Essentially, it was a week long process which was used to develop and test new ideas using a series of highly-effective Design Thinking exercises. All of the features of the application were decided along with the design of the front-end of the application. 
    ***Note*** - Front-end was finalised using Adobe Illustrator.

* **Build** - The focus of the Build phase,which was a week long, was to develop the system to the point where it is ready for pre-production testing. In previous phases, the majority of the requirements have been identified and the architecture for the system has been baselined. So, In this sprint, the whole backend along with frontend was coded for the following features:- 
    * Video/Audio Meeting
    * Turn on/off the Audio/Video
    * Downloadable Notes   


* **Adapt** - In the adapt phase of five days, the peer-to-peer '*chat feature*' was adapted as per the requirement. Along with it, the feature of '*notification for chat*' was also added to the project. 

* **Testing & Delivery** -  In a week long phase of testing and delivery, all of the features were tested for 3 days and some of the features were refined, the refinement and deployment of the application took 2 days. After the completion of the application, two days were given to technical document along with the demo video.
---

 ## Configuration
 The whole File/Folder(s) location inside the main project directory is described below:-
 
![](https://i.imgur.com/OieKUo5.png)


---

## Features
All the features of the application are described below along with the relevant snapshots:-
* ### 1:1 Video chat (Minimum Requirement)
    WebRTC and Socket. IO have been used to enable the feature of Video chatting (peer-to-peer). In this feature, two people can video-chat with each other. The screenshot of the same is given below:-
    ![](https://i.imgur.com/QKS7AQv.png)

* ### Start a new meeting
    User can start a new call instantly by clicking on the 'Start Meeting' button on the home page and then, entering their name. The screenshots of starting a new call is given below:-
    ![](https://i.imgur.com/2Dai3i8.png)



---




* ### Instantly join a call with a meeting link
    Meeting can be joined by using either the link or meeting ID. When the user join a meet, it will send the other user, who is already in the meet, a notification so that he/she can accept/reject the call as per covenience. The screenshot is attached below:
    ![](https://i.imgur.com/0LGi5ls.png)


* ### Live Editor (Whiteboard) with syntax highlighting for Interviews
    As the whiteboard works in real-time, so again Socket.IO has been used to enable this feature. User has to switch to interview mode (from the options) to start using the text-editor. The screenshot of the editor is attached below:-
    ![](https://i.imgur.com/y0kbRhp.png)

* ### Notes (downloadable as PDF) 
    jsPDF library has been used to enable the downloading option of Notes. JSPDF is an open-source library for generating PDF documents using nothing but JavaScript. The screenshot of the notes is given below:-
    ![](https://i.imgur.com/DAQcDkk.png)

* ### Real time chat - (ADAPT STAGE)
    Users can chat with each other in real-time by using the Chat feature. The chat feature can be used by clicking on the chat icon that appears just below the video-box of the user. The screenshot is given below:
    ![](https://i.imgur.com/PmES7bY.png)

* ### Chat Notifications
    Whenever User-2 sends the User-1 a message, User-1 gets notification about with it. The screenshot is attached below:- 
    ![](https://i.imgur.com/rCHgQQK.png)


* ### Instant notifications of Call
    Whenever User2 calls the User1, User1 gets notification so that User1 can either accept or reject the call as per convenience. The screenshot is attached below:-  
    ![](https://i.imgur.com/I53FIs0.png)

* ### Turn On/Off audio/video
    User can turn on/off their audio as well as Video during Video call. The screenshot is attached below:-
    ![](https://i.imgur.com/SVz06PU.png)

---

### Maintainer

This repository is maintained by [Harshita Upadhyay](https://github.com/harshita130602). If you want to contribute, feel free to open a [pull request](https://github.com/harshita130602/Encall/pulls). If you have any doubts, feel free to open an [issue](https://github.com/harshita130602/Encall/issues).


---

## Made with :hearts: by Harshita Upadhyay