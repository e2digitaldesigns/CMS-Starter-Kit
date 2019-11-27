const messages = [
  {
    table_id: "220",
    child_id: "e17647cd5cd845a1ea9cdc4ae52f3973",
    form_type: "contact",
    form_seen: "0",
    form_array: {
      site: "beta.express.e2pcom",
      name: "Casana Bey",
      to_id: "5d1caeacfb26a4b1bc2d4689c02666e1",
      email: "tekx2@yahoo.com",
      company: "E2 Digital",
      phone: "(313) 622-1037",
      date: "1498091087",
      message:
        "Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
      attachments: []
    },
    form_del: "0",
    form_date: "1498091087",
    form_recipient_trash: "0",
    form_recipient_del: "0",
    form_recipient_id: "5d1caeacfb26a4b1bc2d4689c02666e1",
    form_sender_trash: "0",
    form_sender_del: "0",
    form_sender_id: "",
    form_sent_to_array: "",
    form_thread_id: "",
    isSelected: false
  },
  {
    table_id: "225",
    child_id: "e17647cd5cd845a1ea9cdc4ae52f3973",
    form_type: "quote",
    form_seen: "1",
    form_array: {
      site: "beta.express.e2pcom",
      name: "Casana Bey",
      email: "tekx2@yahoo.com",
      company: "E2 Digital",
      phone: "(313) 622-1037",
      to_id: "a0a76854a3b26bfd8c5c7c9dcf6a337d",
      date: "1498147930",
      member_id: "517f26ef2991662314c54fc623185f6f",
      quote_id: "af66720560560abd4c673ea0e7834392",
      transaction_id: "db4f55ea3ec3b54eb76932b564509920",
      invoice_id: "14981-47930-epl",
      jobName: "Quote Thmbs",
      type: "Print",
      width: "5",
      height: "6",
      sides: "2-Sided",
      quantity: "1",
      number_of_rders: "1",
      deadline: "06/30/2017",
      specifications: "Lorem ipsutur ridiculus mus.",
      attachments: []
    },
    form_del: "0",
    form_date: "1498091985",
    form_recipient_trash: "0",
    form_recipient_del: "0",
    form_recipient_id: "5d1caeacfb26a4b1bc2d4689c02666e1",
    form_sender_trash: "0",
    form_sender_del: "0",
    form_sender_id: "",
    form_sent_to_array: "",
    form_thread_id: "",
    isSelected: true
  },
  {
    table_id: "229",
    child_id: "e17647cd5cd845a1ea9cdc4ae52f3973",
    form_type: "inner",
    form_seen: "1",
    form_array: {
      site: "beta.express.e2pcom",
      sender_id: "aa68a1f0192956c61f99b3a48ed8a46b",
      name: "Diallo Bey",
      to_id: "5d1caeacfb26a4b1bc2d4689c02666e1",
      date: "1498092039",
      subject: "SUB env testing 2 SUB",
      message:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      attachments: ["111"]
    },
    form_del: "0",
    form_date: "1498092039",
    form_recipient_trash: "0",
    form_recipient_del: "0",
    form_recipient_id: "5d1caeacfb26a4b1bc2d4689c02666e1",
    form_sender_trash: "0",
    form_sender_del: "0",
    form_sender_id: "aa68a1f0192956c61f99b3a48ed8a46b",
    form_sent_to_array: [
      {
        staff_id: "5d1caeacfb26a4b1bc2d4689c02666e1",
        staff_name: "Casana XPL Admin"
      }
    ],
    form_thread_id: "",
    isSelected: false
  },
  {
    table_id: "235",
    child_id: "e17647cd5cd845a1ea9cdc4ae52f3973",
    form_type: "inner",
    form_seen: "0",
    form_array: {
      site: "beta.express.e2pcom",
      sender_id: "aa68a1f0192956c61f99b3a48ed8a46b",
      name: "The Young Turks",
      to_id: "5d1caeacfb26a4b1bc2d4689c02666e1",
      date: "1498098888",
      subject: "SUB 001",
      message:
        "Loremommodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      attachments: ["111"]
    },
    form_del: "0",
    form_date: "1498092039",
    form_recipient_trash: "0",
    form_recipient_del: "0",
    form_recipient_id: "5d1caeacfb26a4b1bc2d4689c02666e1",
    form_sender_trash: "0",
    form_sender_del: "0",
    form_sender_id: "aa68a1f0192956c61f99b3a48ed8a46b",
    form_sent_to_array: [
      {
        staff_id: "5d1caeacfb26a4b1bc2d4689c02666e1",
        staff_name: "Waka Waka"
      }
    ],
    form_thread_id: "",
    isSelected: false
  }
];

export function getMessages() {
  return messages;
}
