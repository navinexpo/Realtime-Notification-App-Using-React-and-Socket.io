import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    if (!senderName || !receiverName || !type) {
        console.error('Missing required parameters: senderName, receiverName, type');
        return;
    }
    const receiver = getUser(receiverName);
    if (!receiver) {
        console.error(`No user found with the name ${receiverName}`);
        return;
    }
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
});

  socket.on("disconnect", () => {
    // console.log("someone has left");
    removeUser(socket.id);
  });
});

io.listen(5000);
