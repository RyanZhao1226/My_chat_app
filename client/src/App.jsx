import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    socket.on('chat message', (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off('chat message');
  }, []);


  // Creative addition
  const joinRoom = () => {
    if (username && room) {
      socket.emit('join room', { room, username });
      setIsJoined(true);
      setMessages([]); // clear previous messages
    }
  };

  const leaveRoom = () => {
    socket.emit('leave room');
    setIsJoined(false);
    setRoom('');
    setMessages([]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const msg = {
      user: username,
      text: input,
      time: new Date().toLocaleTimeString(),
      room,
    };
    socket.emit('chat message', msg);
    setInput('');
  };

  if (!isJoined) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Join a Chat Room</h2>
        <input
          placeholder="Your nickname"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          style={{ marginLeft: 10 }}
        />
        <button onClick={joinRoom} style={{ marginLeft: 10 }}>
          Join
        </button>
      </div>
    );
  }

  return (
    <div className="center-wrapper">
      {!isJoined ? (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <h2>Join a Chat Room</h2>
          <input
            placeholder="Your nickname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            style={{ marginLeft: 10 }}
          />
          <button onClick={joinRoom} style={{ marginLeft: 10 }}>
            Join
          </button>
        </div>
      ) : (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <h2>
            {username} in room: <code>{room}</code>
          </h2>
          <button onClick={leaveRoom}>Leave Room</button>
          <div
            style={{
              height: '300px',
              overflowY: 'scroll',
              border: '1px solid #ccc',
              margin: '10px 0',
              padding: 10,
              textAlign: 'left',
              background: '#f9f9f9',
            }}
          >
            {messages.map((msg, index) => (
              <div key={index} style={{ color: msg.system ? 'gray' : 'black' }}>
                {msg.system ? (
                  <em>
                    [{msg.time}] {msg.text}
                  </em>
                ) : (
                  <div>
                    <strong>{msg.user}</strong> <small>{msg.time}</small>: {msg.text}
                  </div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{ width: '80%' }}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}  

export default App;