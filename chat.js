const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const cors = require('cors');
const user = require('./routes/user');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

io.on('connection', (socket) => {
  socket.on('message', ({ name, message }) => {
    io.emit('message', { name, message });
  });

  socket.on('join_room', ({ room_name }) => {
    console.log('Joing Room, Room Name: ' + room_name);
    console.log(socket.rooms);
    socket.join(room_name);
  });

  socket.on('message_to_server', ({ room_name, from, msg }) => {
    io.in(room_name).emit('message_to_client', {
      from,
      msg,
    });
  });

  socket.on('leave_room', ({ room_name }) => {
    socket.leave(room_name);
    console.log('Leaving Room, Room Name: ' + room_name);
    console.log(socket.rooms);
  });

  socket.on('disconect', () => {
    console.log('A client has been disconected');
  });
});

app.use('/user', user);

server.listen(4000, () => console.log(`Server has been started on ${4000} PORT`));
