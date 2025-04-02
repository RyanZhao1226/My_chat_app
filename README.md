# **My chat app - Implemented with Socket.io**

A real-time chat application built with React (Vite) and Socket.IO. Users can choose a nickname, join specific chat rooms, and exchange messages instantly. The app features room-based messaging, system notifications (such as when users join or leave), and timestamped messages. Designed for learning, collaboration, or demoing real-time communication with WebSockets.

## Setting up

Backend startup:

```
cd server
npm install
npm start
```

Frontend startup:

```
cd client
npm install
npm run dev
```

Open the browser and visit http://localhost:5173

## Features

* **Real-time Messaging**

  Instantly send and receive messages without refreshing the page.
* **Chat Room Support (Creative addition)**

  Users can join specific chat rooms to have isolated group conversations.
* **Nickname Selection**

  Each user can enter a custom nickname before joining a room.
* **System Messages**

  See notifications when users join, leave, or disconnect from a room.
* **Timestamps for Messages**

  Every message is tagged with the exact time it was sent.
* **Join/Leave Room Control (Creative addition)**

  Users can leave a room and return to the room selection interface.
* **React + Vite Frontend**

  Fast development experience with modern tooling.
* **Express + Socket.IO Backend**

  Simple and scalable WebSocket-based server for handling real-time communication.

## Project structure

```
My_chat_app/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vite.config.js
├── server/
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
├── .gitignore                 # Manage git config
├── eslint.config.js           # Manage eslint config
├── LICENSE                    # Show the license
├── README.md
```

## Links

**Video**

https://youtu.be/ByAIy1FHECQ

## Acknowledgment

**Usage of AI** 

https://docs.google.com/document/d/1fQSiavF_-va4-RNQAQOUzjmFtkrwEqIi91F5yVy9JT8/edit?usp=sharing
