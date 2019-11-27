const settings = [
  { key: 18, type: "no", label: "Enable Notifications", cs: "notifications" },
  {
    key: 19,
    type: "no",
    label: "Enable Notification Sound",
    cs: "notificationsSound"
  },
  { key: 10, type: "no", label: "Customer Login", cs: "customerLogin" },
  { key: 15, type: "no", label: "Design Note", cs: "designOrderNote" },
  { key: 13, type: "no", label: "Design Approval", cs: "designOrderApproval" },
  { key: 31, type: "no", label: "Internal Messaging", cs: "internalMessaging" },
  { key: 11, type: "no", label: "New Orders", cs: "newOrders" },
  { key: 14, type: "no", label: "New User", cs: "newUser" },
  { key: 17, type: "no", label: "Quote Request", cs: "quoteRequest" },
  { key: 12, type: "no", label: "Shopping Cart", cs: "shoppingCart" },
  { key: 16, type: "no", label: "Staff Login", cs: "staffLogin" },
  { key: 20, type: "no", label: "Supplier", cs: "supplier" },

  {
    key: 22,
    type: "sms",
    label: "Enable SMS Notifications",
    cs: "smsNotifications"
  },

  {
    key: 23,
    type: "sms",
    label: "Shopping Cart",
    cs: "smsShoppingCart"
  },
  {
    key: 24,
    type: "sms",
    label: "Customer Login",
    cs: "smsCustomerLogin"
  },
  {
    key: 25,
    type: "sms",
    label: "Design Order Notes",
    cs: "smsDesignOrderNote"
  }
];

const clientSettings = {
  notifications: 1,
  notificationsSound: 0,
  customerLogin: 1,
  designOrderNote: 0,
  designOrderApproval: 0,
  internalMessaging: 0,
  newOrders: 0,
  newUser: 1,
  quoteRequest: 0,
  shoppingCart: 1,
  staffLogin: 1,
  supplier: 1,

  smsNotifications: 1,
  smsShoppingCart: 0,
  smsCustomerLogin: 1,
  smsDesignOrderNote: 0
};

// const settings = {
//   customerLogin: 1,
//   newOrders: 0,
//   shoppingCart: 1,
//   designOrderApproval: 0,
//   newUser: 1,
//   designOrderNote: 0,
//   staffLogin: 1,
//   quoteRequest: 0,
//   notifications: 1,
//   notificationsSound: 0,
//   supplier: 1,
//   internalMessaging: 0,
//   "text-message-notifications": 1,
//   smsShoppingCart: 0,
//   smsCustomerLogin: 1,
//   smsDesignOrderNote: 0
// };

export function getRightContentSettings() {
  return settings;
}

export function getRightContentClientsSettings() {
  return clientSettings;
}
