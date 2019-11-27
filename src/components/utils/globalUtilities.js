export function decodeHtml(string) {
  let txt = document.createElement("textarea");
  txt.innerHTML = string;
  console.log(txt.innerHTML);
  return txt.value;
}

export function notificationMaping() {
  return {
    "customer-login": "customerLogin",
    "internal-messaging": "internalMessaging",
    "staff-login": "staffLogin"
  };
}
