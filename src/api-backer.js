import openSocket from "socket.io-client";
const socket = openSocket("http://192.168.1.72:8000");

function subscribeToAdminChatServices(cb) {
  socket.on("sendAdminChatMessage", data => cb(null, data));
}

function sendChatMessage(data) {
  socket.emit("sendAdminChatMessage", data);
}

function subscribeToAdminChatStatusToggle(cb) {
  socket.on("sendAdminChatStatus", data => cb(null, data));
}

function sendChatStatus(data) {
  console.log(15, "ADMIN-STATUS | status:", data.value);
  socket.emit("sendAdminChatStatus", data);
}

function subscribeToAdminChatBeacon(cb) {
  socket.on("adminChatBeacon", data => cb(null, data));
}

function sendAdminChatBeacon(data) {
  //console.log(26, "api.js", data);
  if (data.chatAvailable !== 3) {
    //console.log(28, "api.js | send ", data);
    socket.emit("adminChatBeacon", data);
  }
}

function subscribeToNotifications(cb) {
  socket.on("notifications", timestamp => cb(null, timestamp));
  //socket.emit("subscribeToNotifications", 5000);
}

function sendNotification() {
  //console.log(15, "xxxxxxxxxxxxxxxxxxxxxx");
  socket.emit("subscribeToNotifications", 5000);
}

export {
  subscribeToNotifications,
  sendNotification,
  subscribeToAdminChatServices,
  sendChatMessage,
  subscribeToAdminChatStatusToggle,
  sendChatStatus,
  subscribeToAdminChatBeacon,
  sendAdminChatBeacon
};
