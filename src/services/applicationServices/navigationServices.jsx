const leftNagivationListItems = [
  {
    id: "lm1",
    display: "Dashboard",
    icon: "fa fa-tachometer"
  },

  {
    id: "lm2",
    display: "Order Management",
    icon: "fa fa fa-tags"
  },

  {
    id: "lm3",
    display: "Internal Messaging",
    icon: "fa fa-comment"
  },

  {
    id: "lm4",
    display: "Client Management",
    icon: "fa fa-envelope"
  }
];

export function getLeftNavigation() {
  return leftNagivationListItems;
}
