import openSocket from "socket.io-client";
const socket = openSocket(process.env.REACT_APP_PUSH_NOTIFICATION_SERVICE);
//const socket = openSocket("https://e2ps-push.herokuapp.com");

const socketServices = {
  subscribeChatServices(cb) {
    socket.on("chatServices", data => cb(null, data));
  },
  unSubscribeChatServices() {
    socket.removeAllListeners("chatServices");
  },
  sendChatData(data) {
    socket.emit("chatServices", data);
  },

  subscribeNotificationServices(cb) {
    socket.on("notificationServices", data => cb(null, data));
  },
  unSubscribeNotificationServices() {
    socket.removeAllListeners("notificationServices");
  },
  sendNotificationData(data) {
    socket.emit("notificationServices", data);
  },

  subscribeUserChatServices(cb) {
    socket.on("userChatServices", data => cb(null, data));
  },
  unSubscribeUserChatServices() {
    socket.removeAllListeners("userChatServices");
  },
  sendUserChatData(data) {
    socket.emit("userChatServices", data);
  }
};

export default socketServices;
