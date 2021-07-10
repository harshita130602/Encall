const app = require('express')();
const cors = require('cors');
const server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

// To establish connection
io.on('connection', (socket) => {
  socket.emit('me', socket.id);

// Socket handlers below ---------------------------------------------------------------------------------------------------

  // for updating user media
  socket.on('updateMyMedia', (data) => {
    io.to(data.userToUpdate).emit('updateUserMedia', data.data);
  });

  // For call
  socket.on('calluser', ({ userToCall, from, name, signal, documentId }) => {
    io.to(userToCall).emit('calluser', { signal, from, name, documentId });
  });

  // To answer call
  socket.on('answercall', (data) => {
    io.to(data.to).emit('updateUserMedia', {
      type: data.type,
      mediaStatus: data.mediaStatus,
    });
    io.to(data.to).emit('callaccepted', data.signal,data.name);
  });

  // For sending changes
  socket.on('send-changes', (delta, userId) => {
    io.to(userId).emit('recieve-changes', delta);
  });

  // To send message
  socket.on('send-message', (data) => {
    io.to(data.userToSend).emit('recieve-message', data.data);
  });

  // To end the call
  socket.on('callended', (userToUpdate) => {
    io.to(userToUpdate).emit('callended');
  });
});

// Socket handlers end here ----------------------------------------------------------------------------------------------------------


// This request is to make sure that server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});


// To get the port at which server is running
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
