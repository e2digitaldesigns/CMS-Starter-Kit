//https://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever/

//PUSH NOTIFICATIONS
//socket = io('https://67.227.136.39:8080', {secure: true});
//socket = io('https://pusher.e2printsoft.com:9000', {secure: true});

//LOCATION INFORMATION
//https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
$(document).ready(function() {
  "use strict";

});

$(document).on("click", ".dropdown-content-holder", function(e) {
  "use strict";
  e.stopPropagation();
});

$(document).ready(function() {
  "use strict";
  theSlimScrollReset();
  repsonsive();
  chatPing();
  setRightDivActive();
  //document.cookie = "chat-open=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //console.log(document.cookie);
  setChatState();
  rightMenuStart();
  lefttMenuStart();
  rightDivHelpStarter();

  $('[data-toggle="tooltip"]').tooltip(); //data-placement="right"  echo '<a href="#" data-toggle="tooltip" title="Hooray!">Hover over me</a>';

  $("#notifications-design-order-notes-scroller").slimscroll({
    color: "#888",
    height: "300px",
    alwaysVisible: true,
    railVisible: true,
    railColor: "#bbb",
    railOpacity: 0.2
  });

  $("time.show-time").timeago();
});

$(window).resize(function() {
  "use strict";
  theSlimScrollReset();
  //repsonsive()
});

function repsonsive() {
  "use strict";
  if ($(window).width() <= 768) {
    $("#wrapper").addClass("toggle-left-menu-hide");
    $("#wrapper").addClass("toggle-right-menu-hide");
    $("li.parent").removeClass("open");
  } else if ($(window).width() <= 1024) {
    $("#wrapper").addClass("toggle-left-menu-hide");
    $("#wrapper").addClass("toggle-right-menu-hide");
    $("li.parent").removeClass("open");
  }
}

////////////////////////////////////////////
//MENU TOGGLE///////////////////////////////
////////////////////////////////////////////
$(".menu-toggle").click(function(e) {
  "use strict";
  e.preventDefault();
});

$(document).on("click", ".sidebar-elements>li.parent ul li a", function(e) {
  "use strict";
  e.stopPropagation();
});

$(document).on("click", ".sidebar-elements>li.parent", function(e) {
  "use strict";
  e.preventDefault();
  $("li.parent")
    .not(this)
    .removeClass("open");
  $(this).toggleClass("open");

  if ($(this).hasClass("open")) {
    //$("#wrapper").removeClass("toggle-left-menu-hide");
  }
});

$(document).on("click", ".left-menu-toggle", function(e) {
  "use strict";
  e.preventDefault();
  theLeftMenuToggler();
});

function theLeftMenuToggler() {
  "use strict";
  $("#wrapper").toggleClass("toggle-left-menu-hide");

  if (
    $(window).width() <= 768 &&
    $("#wrapper").hasClass("toggle-left-menu-hide") === false
  ) {
    $("#wrapper").addClass("toggle-right-menu-hide");
  }

  $(".sidebar-elements>li.parent").removeClass("open");
  var leftMenuShow =
    $("#wrapper").hasClass("toggle-left-menu-hide") === false ? 1 : 0;

  setCookie($("#global-user-id").val() + "-left-menu-show", leftMenuShow, 1);

  if ($("#wrapper").hasClass("toggle-left-menu-hide") === true) {
    var objectClass = ".left-sidebar-content";
    $(objectClass)
      .parent()
      .replaceWith($(objectClass));
    $(".left-sidebar-content").css("overflow", "visible");
  } else {
    slimScrollSetterLeftMenu();
  }
}

function lefttMenuStart() {
  "use strict";
  //console.log('left-check: '+ getCookie($("#global-user-id").val()+"-left-menu-show"));

  if (getCookie($("#global-user-id").val() + "-left-menu-show") === "0") {
    $("#wrapper").addClass("toggle-left-menu-hide");
    $("li.parent").removeClass("open");
  }
}

$(document).on("click", ".right-menu-toggle", function(e) {
  "use strict";
  e.preventDefault();
  $("#wrapper").toggleClass("toggle-right-menu-hide");

  if (
    $(window).width() <= 768 &&
    $("#wrapper").hasClass("toggle-right-menu-hide") === false
  ) {
    $("#wrapper").addClass("toggle-left-menu-hide");
  }

  var rightMenuShow =
    $("#wrapper").hasClass("toggle-right-menu-hide") === false ? 1 : 0;
  setCookie($("#global-user-id").val() + "-right-menu-show", rightMenuShow, 1);
});

function rightMenuStart() {
  "use strict";
  if (
    getCookie($("#global-user-id").val() + "-right-menu-show") === "1" &&
    $(window).width() >= 768
  ) {
    $("#wrapper").removeClass("toggle-right-menu-hide");
  }
}

$(document).on("click", ".parent", function(e) {
  "use strict";
  e.preventDefault();

  var windowHeight = $(window).height();
  var ulOffset = $(".sidebar-elements").offset().top;
  var liOffset = $(this).offset().top;

  var offset = liOffset - ulOffset;

  //console.log('windowHeight:',windowHeight,'ulOffset:',ulOffset,'liOffset:',liOffset);
  $(".left-sidebar-content").animate({ scrollTop: offset }, 1500);
});
////////////////////////////////////////////
//MENU TOGGLE///////////////////////////////
////////////////////////////////////////////

////////////////////////////////////////////
//SLIM SCROLLS//////////////////////////////
////////////////////////////////////////////
function theSlimScrollReset() {
  "use strict";
  slimScrollSetter(".setting-list-scroll", $(window).height() - 145);

  slimScrollSetterLeftMenu(); //Left Menu
  slimScrollSetter(".contact-list-scroll", $(window).height() - 210); // Chat Contact List
  slimScrollSetter(".message-list-scroll", $(window).height() - 240); // Chat Contact List
  slimScrollSetter(".notification-list-scroll", $(window).height() - 180);
  slimScrollSetter(".todo-list-scroll", $(window).height() - 240);
  slimScrollSetter("#internal-messaging-scroll", $(window).height() - 300);
  slimScrollSetter("#mail-message-scroll", $(window).height() - 230);
}

function slimScrollSetterLeftMenu() {
  "use strict";
  //console.log( 'left-menu-show cookie: ',getCookie($("#global-user-id").val()+"-left-menu-show") );

  if (getCookie($("#global-user-id").val() + "-left-menu-show") !== "0") {
    slimScrollSetter(".left-sidebar-content", $(window).height() - 60);
  } else {
    var menuHeight = $(".main-content-div").height() + 120;
    $(".left-menu-div").css("height", menuHeight + "px");
  }
}

function slimScrollSetter(target, height) {
  "use strict";
  $(target).slimscroll({
    color: "#999",
    height: height + "px",
    alwaysVisible: true,
    railVisible: true,
    railColor: "#bbb",
    railOpacity: 0.3
  });
}
////////////////////////////////////////////
//SLIM SCROLLS//////////////////////////////
////////////////////////////////////////////

////////////////////////////////////////////
//CHAT//////////////////////////////////////
////////////////////////////////////////////
function alertSoundChat() {
  "use strict";
  var song = $("#alertAudioChat").get(0);
  song.play();
}

function alertGritChat(data) {
  "use strict";
  var userName = $('.open-the-chat[chat-user-id="' + data.senderID + '"]').attr(
    "chat-user-name"
  );
  //console.log(userName);

  $.gritter.add({
    title: "Message from " + userName,
    text: data.message,
    image: "https://placehold.e2printsoft.com/50",
    sticky: false,
    time: ""
  });
}

function setChatState() {
  var chatOpen = getCookie($("#global-user-id").val() + "chat-open");
  var chatOpenUserID = getCookie(
    $("#global-user-id").val() + "chat-open-user-id"
  );

  if (chatOpen == "1" && chatOpenUserID != "") {
    var name = $(
      ".user .open-the-chat[chat-user-id='" + chatOpenUserID + "']"
    ).attr("chat-user-name");
    $("#chat-message-holder").attr("chat-user-id", chatOpenUserID);
    $("#chat-opened-user-name").text(name);
    $("#right-chat-div")
      .addClass(" chat-opened ")
      .attr("open-chat-div-user-id", chatOpenUserID);
    chatLoader(chatOpenUserID);
  }
}

//STAFF CHAT WINDOW OPEN
////////////////////////////////////////////
$(document).on("click", ".open-the-chat", function(q) {
  q.preventDefault();

  $(this)
    .parent(".chat-contact-list-indy")
    .removeClass("user-unread-message");

  $("#chat-message-holder").html("");
  $("#chat-message-holder").attr("chat-user-id", $(this).attr("chat-user-id"));
  $("#chat-opened-user-name").text($(this).attr("chat-user-name"));
  $("#right-chat-div")
    .addClass(" chat-opened ")
    .attr("open-chat-div-user-id", $(this).attr("chat-user-id"));
  $("#chat-contact-list-search").val("");
  $("#chat-message-box").val("");

  setCookie($("#global-user-id").val() + "chat-open", "1", 1);
  setCookie(
    $("#global-user-id").val() + "chat-open-user-id",
    $(this).attr("chat-user-id"),
    1
  );

  //console.log(document.cookie)
  chatLoader($(this).attr("chat-user-id"));
});

function chatLoader(senderID) {
  $.post(
    "main-console-includes/jsval/template-globals.php",
    {
      action: "load-chat",
      childID: $("#global-child-id").val(),
      senderID: senderID,
      userID: $("#global-user-id").val()
    },
    function(data) {
      //console.log(data);
      var theData = $.parseJSON(data);

      $.each(theData.chatArray, function(key, value) {
        var theClass =
          value.senderID == $("#global-user-id").val() ? "self" : "friend";
        var message =
          '<li class="' +
          theClass +
          '"><div class="msg">' +
          nl2br(value.message) +
          "</div></li>";
        $("#chat-message-holder").append(message);
      });

      chatMessageScrollTop();

      setTimeout(function() {
        chatMessageScrollTop();
        $(".chat-contact-list-indy").show();
      }, 200);
    }
  );
}

//STAFF CHAT WINDOW CLOSE
////////////////////////////////////////////
$(document).on("click", ".close-the-chat", function(q) {
  q.preventDefault();
  $("#right-chat-div")
    .removeClass(" chat-opened ")
    .attr("open-chat-div-user-id", "");
  $("#chat-message-holder").attr("chat-user-id", "");
  clearChatCookie();
});

//CHAT MESSAGE SCROLL
////////////////////////////////////////////
function chatMessageScrollTop() {
  var value = 9999999999999999999;
  $("#chat-message-list").scrollTop(value);
}

//CHAT IS TYPING
////////////////////////////////////////////
function sendIsTyping() {
  "use strict";

  nodeSendArray.pushType = "chat-is-typing";
  nodeSendArray.childID = $("#global-child-id").val();
  nodeSendArray.senderID = $("#global-user-id").val();
  nodeSendArray.receiverID = $("#chat-message-holder").attr("chat-user-id");
  socket.emit("push-notification", nodeSendArray);
}

//SEND CHAT MESSAGE
////////////////////////////////////////////
function sendMessage() {
  "use strict";
  var receiverID = $("#chat-message-holder").attr("chat-user-id");

  var str = $("#chat-message-box").val();

  if (!str.replace(/\s/g, "").length) {
    $("#chat-message-box").val("");
    return false;
  }

  var msg = $.trim($("#chat-message-box").val());

  var message =
    '<li class="self"><div class="msg">' + nl2br(msg) + "</div></li>";

  $("#chat-message-holder").append(message);

  //theDiv = $("#chat-message-holder");

  chatMessageScrollTop();
  $("#chat-message-box").val("");

  ////////////////////////////////////////

  moveRecent(receiverID, msg, 0, 0);

  var nodeSendArray = {};

  nodeSendArray.pushType = "chat-message";
  nodeSendArray.childID = $("#global-child-id").val();
  nodeSendArray.senderID = $("#global-user-id").val();
  nodeSendArray.receiverID = $("#chat-message-holder").attr("chat-user-id");
  nodeSendArray.message = msg;
  nodeSendArray.url = window.location.href;
  nodeSendArray.resolution = $(window).width() + "x" + $(window).height();
  nodeSendArray.operatingSystem = getOS();
  nodeSendArray.browswer = getBrowser();

  socket.emit("push-notification", nodeSendArray);

  $.post(
    "main-console-includes/jsval/template-globals.php",
    {
      action: "save-chat",
      childID: $("#global-child-id").val(),
      senderID: $("#global-user-id").val(),
      receiverID: receiverID,
      message: encodeURIComponent(msg)
    },
    function() {}
  );

  //console.log( 'scroll to top',$(window).scrollTop(), 'height',$(window).height()  );

  /*
	//CREATE IMAGE
	html2canvas(document.querySelector("html")).then(function(canvas) {

		$.ajax({ 
			type: "POST", 
			url:  "main-console-includes/jsval/template-globals.php",
			dataType: 'text',
			data: {
				base64data : canvas.toDataURL('image/jpeg'),
				staffID    : $("#global-user-id").val(),
				action     : 'save-chat-image',
			}
		});

	});*/
}

function getBrowser() {
  "use strict";
  return "n/a";
}

function getOS() {
  "use strict";
  var OSName = "Unknown OS";
  if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
  else if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
  else if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
  else if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
  return OSName;
}

//RECIEVE CHAT MESSAGE
////////////////////////////////////////////
function newChatMessage(data) {
  "use strict";
  var thisUserID = $("#global-user-id").val();

  if (thisUserID !== data.senderID && thisUserID === data.receiverID) {
    var message =
      '<li class="friend"><div class="msg">' +
      nl2br(data.message) +
      "</div></li>";

    var openChatDiv = $(
      "#chat-message-holder[chat-user-id='" + data.senderID + "']"
    );
    var chatDivDisplay = $("#right-chat-div").css("display");

    if (chatDivDisplay === "none") {
      //console.log('make chat beep - div display none');
      alertSoundChat();
      alertGritChat(data);
    } else if (openChatDiv.length === 1) {
      $(openChatDiv).append(message);
    } else {
      //console.log('make chat beep - chat not open');
      alertSoundChat();
    }

    chatMessageScrollTop();

    setTimeout(function() {
      chatMessageScrollTop();
    }, 200);

    moveRecent(data.senderID, data.message, openChatDiv, 1);
  }
}

//MOVE NEW MESSAGE
////////////////////////////////////////////
function moveRecent(senderID, message, openChatDiv, type) {
  "use strict";
  var prefix = type == 0 ? "you: " : "";

  $(".user .open-the-chat[chat-user-id='" + senderID + "']")
    .children()
    .children(".name")
    .children(".message")
    .text(prefix + message.substring(0, 15) + "...");
  var chatListDiv = $(
    ".user .open-the-chat[chat-user-id='" + senderID + "']"
  ).parent();

  $("#chat-contact-list").prepend(chatListDiv);

  var chatListDiv = $("#chat-contact-list div.user:first-child");
  $(chatListDiv).show();

  if (type == 1) {
    var openChatDiv = $(
      "#chat-message-holder[chat-user-id='" + senderID + "']"
    );
    if (openChatDiv.length == 0) {
      $(".open-the-chat[chat-user-id='" + senderID + "']")
        .parent()
        .addClass("user-unread-message");
    }
  }

  var i = 0;

  setTimeout(function() {
    for (i = 0; i < 5; i++) {
      var fade = i * 0.01;
      $(chatListDiv)
        .fadeTo(100, fade)
        .fadeTo(100, 1.0);
    }
  }, 200);

  //console.log(chatListDiv.html())
}

//STAFF CHAT ENTER
////////////////////////////////////////////
$(document).on("keypress", "#chat-message-box", function(e) {
  "use strict";
  if (e.keyCode === 13) {
    if (e.shiftKey === true) {
      //console.log('new line');
    } else {
      e.preventDefault();
      sendMessage();
    }
    //return false;
  } else {
    sendIsTyping();
  }
});

function nl2br(str) {
  var breakTag = "<br />";
  return (str + "").replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    "$1" + breakTag + "$2"
  );
}

//STAFF CHAT SEARCH
////////////////////////////////////////////
$(document).ready(function() {
  // NEW SELECTOR
  jQuery.expr[":"].Contains = function(a, i, m) {
    return (
      jQuery(a)
        .text()
        .toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0
    );
  };

  // OVERWRITES OLD SELECTOR
  jQuery.expr[":"].contains = function(a, i, m) {
    return (
      jQuery(a)
        .text()
        .toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0
    );
  };
});

$(document).on("keyup", "#chat-contact-list-search", function(q) {
  var chatSearchTerm = $(this).val();

  if (chatSearchTerm == "") {
    $(".chat-contact-list-indy").show();
  } else {
    if (
      $(
        ".chat-contact-list-indy a.open-the-chat div.user-data span.name:contains(" +
          chatSearchTerm +
          ")"
      ).length > 0
    ) {
      $(".chat-contact-list-indy").hide();
      $(
        ".chat-contact-list-indy a.open-the-chat div.user-data span.name:contains(" +
          chatSearchTerm +
          ")"
      )
        .parent()
        .parent()
        .parent()
        .show();
    }
  }
});

//CHECK ONLINE STATUS
////////////////////////////////////////////
//varChatPing = setInterval(function(){ chatPing() }, 10000);

$(document).on("click", ".chat-status-check", function(q) {
  q.preventDefault();
  chatPing();
});

function chatPing() {
  nodeSendArray = {};
  nodeSendArray["pushType"] = "chat-status-check";
  nodeSendArray["childID"] = $("#global-child-id").val();
  socket.emit("push-notification", nodeSendArray);
  $(".user .open-the-chat")
    .children()
    .children(".status")
    .addClass(" offline ");
}

function checkChatStatus(data) {
  nodeSendArray = {};
  nodeSendArray["pushType"] = "chat-status-check-return";
  nodeSendArray["childID"] = $("#global-child-id").val();
  nodeSendArray["senderID"] = $("#global-user-id").val();
  nodeSendArray["status"] = $("#chat-user-available").is(":checked") ? 1 : 0;
  socket.emit("push-notification", nodeSendArray);
}

function updateChatStatus(data) {
  if (data.status == 1) {
    $(".user .open-the-chat[chat-user-id='" + data.senderID + "']")
      .children()
      .children(".status")
      .removeClass(" away ")
      .removeClass(" offline ");
  } else {
    $(".user .open-the-chat[chat-user-id='" + data.senderID + "']")
      .children()
      .children(".status")
      .removeClass(" away ")
      .addClass(" offline ");
  }
}

function updateAdminChatStatus(data) {
  //console.log('updateAdminChatStatus');

  if (data.status == 1) {
    $(".user .open-the-chat[chat-user-id='admin-support-id']")
      .children()
      .children(".status")
      .removeClass(" away ")
      .removeClass(" offline ");
  } else {
    $(".user .open-the-chat[chat-user-id='admin-support-id']")
      .children()
      .children(".status")
      .removeClass(" away ")
      .addClass(" offline ");
  }
}
////////////////////////////////////////////
//CHAT//////////////////////////////////////
////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CUSTOMER CHAT/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////// 5d1caeacfb26a4b1bc2d4689c02666e1
$(document).ready(function() {
  "use strict";

  if (chatPageCheck() === "0") {
    return false;
  }
  customerChatHeightReset();
  customerChatCheckOnlineUser();
  getCustomerChatRequest();
  onlineUserCountDown();
  setTimeout(function() {
    openChatCheck();
  }, 3000);
});

//CHAT PAGE CHECK
/////////////////////////////////////////////
function chatPageCheck() {
  var theReturn = "0";
  var urlParams = new URLSearchParams(location.search);

  if (
    urlParams.get("content") === "customer-chat" &&
    urlParams.get("action") === "customer-chat"
  ) {
    theReturn = "1";
  }

  return theReturn;
}

//GET CUSTOMER CHAT REQUEST
////////////////////////////////////////////
function getCustomerChatRequest() {
  "use strict";

  $.post(
    "main-console-includes/jsval/template-globals.php",
    {
      action: "get-customer-chat-users",
      childID: $("#global-child-id").val(),
      userID: $("#global-user-id").val()
    },
    function(data) {
      //console.clear();
      //console.log(data); return false;

      var theData = $.parseJSON(data);
      var chatTemplate = $("#template-chat-online-user").html();

      $.each(theData.openChats, function(index, value) {
        $("#customer-chat-open-chats").append(
          chatTemplate
            .replace("{{sessionID}}", value.sessionID)
            .replace("{{onlineCheck}}", "0")
            .replace("{{customerName}}", value.name)
            .replace("{{domain}}", "-----")
            .replace("{{url}}", "-----")
            .replace("{{sessionID}}", value.sessionID)
        );
      });

      $.each(theData.chatRequest, function(index, value) {
        $("#customer-chat-online-users").append(
          chatTemplate
            .replace("{{sessionID}}", value.sessionID)
            .replace("{{customerName}}", value.name)
            .replace("{{domain}}", value.name)
            .replace("{{url}}", value.name)
            .replace("{{sessionID}}", value.sessionID)
        );

        var li = ".online-users[session-id='" + value.sessionID + "']";
        $(
          ".online-users[session-id='" + value.sessionID + "'] .chat-options"
        ).show();
      });
    }
  );
}

//CUSTOMER CHAT CHECK ONLINE FOR USERS
////////////////////////////////////////////
function customerChatCheckOnlineUser() {
  nodeSendArray["pushType"] = "online-users-check";
  nodeSendArray["childID"] = $("#global-child-id").val();
  nodeSendArray["sessionID"] = "global";
  //console.log(nodeSendArray);
  socket.emit("push-notification", nodeSendArray);
}

//ONLINE USER BEACON
////////////////////////////////////////////
function onlineUserBeacon(data) {
  "use strict";

  if (data.childID !== $("#global-child-id").val()) {
    return false;
  }

  var li = ".online-users[session-id='" + data.sessionID + "']";
  $(li).attr("timer", 18);
  $(li + " .customer-chat-status")
    .removeClass("offline")
    .addClass("online");
}

//OPEN CHAT CHECK
////////////////////////////////////////////
function openChatCheck() {
  "use strict";

  /*
	$("li.online-users[online-check='1']").each(function(index){
		//console.log('openChatChec',index);
	});
	*/

  $("li.online-users[online-check='0']").hide();
}

//COUNT DOWN
////////////////////////////////////////////
function onlineUserCountDown() {
  "use strict";

  setInterval(function() {
    $("li.online-users").each(function(index) {
      //console.log(index);
      var count = parseInt($(this).attr("timer"));
      //console.log( $(this).parent().attr('id') ); //customer-chat-online-users

      if (count < 5) {
        var li =
          ".online-users[session-id='" +
          $(this).attr("session-id") +
          "'] .customer-chat-status";
        $(li)
          .removeClass("online")
          .addClass("offline");

        if (
          $(this)
            .parent()
            .attr("id") == "customer-chat-open-chats"
        ) {
        }

        if (
          $(this)
            .parent()
            .attr("id") == "customer-chat-online-users"
        ) {
          $(this).slideUp();
        }
      } else {
        $(this).attr("timer", count - 1);
      }
    });
  }, 1000);
}

//CUSTOMER CHAT HEIGHT RESET
////////////////////////////////////////////
$(window).resize(function() {
  "use strict";
  customerChatHeightReset();
});

function customerChatHeightReset() {
  $("#main-chat-holder").height($(window).height() - 190);

  //chat-message-holder
  $(".chat-message-holder-inside").slimscroll({
    color: "#888",
    height: "100%",
    size: "8px",
    distance: "5px",
    alwaysVisible: false,
    railVisible: false,
    railColor: "#bbb",
    railOpacity: 0.6
  });
}

//ONLINE USER RETURN
////////////////////////////////////////////
function onlineUserCheckReturn(data) {
  //return false;
  "use strict";

  //console.log(data);

  if (data.childID !== $("#global-child-id").val()) {
    return false;
  }

  if ($("#customer-chat-open-chats").length !== 1) {
    return false;
  }

  var chatTemplate = $("#template-chat-online-user").html();
  var companyName = data.companyName !== "" ? data.companyName : "Unnamed User";
  var placement =
    data.staffID === $("#global-user-id").val()
      ? "customer-chat-open-chats"
      : "customer-chat-online-users";

  if ($(".online-users[session-id='" + data.sessionID + "']").length == 0) {
    //NEW
    //console.log('xx new', data.sessionID, data.staffID);
    $("#" + placement).append(
      chatTemplate
        .replace("{{sessionID}}", data.sessionID)
        .replace("{{onlineCheck}}", "1")
        .replace("{{customerName}}", companyName)
        .replace("{{domain}}", data.domain)
        .replace("{{url}}", data.url)
        .replace("{{sessionID}}", data.sessionID)
    );
  } else {
    //UPDATE
    //console.log('xx update', data.sessionID, data.staffID);
    var li = ".online-users[session-id='" + data.sessionID + "']";
    $(li).show();
    $(li).attr("timer", 30);
    $(li).attr("online-check", "1");
    //$(li+" span.chat-company-name").text(companyName);
    $(li + " span.chat-domain").text(data.domain);
    $(li + " span.chat-url").text(data.url);
    $(li + " .customer-chat-status")
      .addClass("online")
      .removeClass("offline");
  }

  //MOVE FORM ONLINE TO OPEN CHAT
  if (
    data.isChat == 1 &&
    data.staffID === $("#global-user-id").val() &&
    $(
      "#customer-chat-open-chats li.online-users[session-id='" +
        data.sessionID +
        "']"
    ).length == 0
  ) {
    var duplicate = $(".online-users[session-id='" + data.sessionID + "']");
    $("#customer-chat-open-chats").append(duplicate);
  }
}

//CHAT REQUEST
/////////////////////////////////////////////
function chatRequest(data) {
  "use strict";
  //console.log(data);

  if (data.childID !== $("#global-child-id").val()) {
    return false;
  }

  var openChats = $("#customer-chat-open-chats").length;
  var li = ".online-users[session-id='" + data.sessionID + "']";

  //MOVE REQUEST USER TO TOP POSITION
  var duplicate = $(".online-users[session-id='" + data.sessionID + "']");
  $("#customer-chat-online-users li:eq(0)").after(duplicate);

  //ENTER USER NAME
  $(li + " span.chat-company-name").text(data.companyName);

  //ADD / SHOW CHAT OPTIONS
  $(li + " .chat-options").show();
}

//ACCEPT CHAT REQUEST
/////////////////////////////////////////////
$(document).on("click", ".accept-chat-request", function(q) {
  q.preventDefault;
  var sessionID = $(this)
    .parent()
    .parent()
    .attr("session-id");
  console.log(sessionID);
  acceptChatRequest(sessionID);
});

function acceptChatRequest(sessionID) {
  "use strict";

  //return false;
  $.post(
    "main-console-includes/jsval/template-globals.php",
    {
      action: "accept-chat-request",
      childID: $("#global-child-id").val(),
      userID: $("#global-user-id").val(),
      sessionID: sessionID
    },
    function(data) {
      //console.log(data);
      var theData = $.parseJSON(data);

      if (theData.success == "1") {
        //MOVE TO OPEN
        var duplicate = $(".online-users[session-id='" + sessionID + "']");
        $("#customer-chat-open-chats li:eq(0)").after(duplicate);
        $(
          ".online-users[session-id='" + sessionID + "'] .chat-options "
        ).hide();

        //OPEN CHAT
        openChatMessage(sessionID);

        //REMOVE ACTIVE
        $("li.online-users").removeClass("active");

        //ACTIVE
        $(".online-users[session-id='" + sessionID + "']")
          .addClass("active")
          .removeClass("customer-chat-unread-messages");

        //SEND MESSAGE
        var nodeSendArray = {};
        nodeSendArray.pushType = "customer-chat-message";
        nodeSendArray.childID = $("#global-child-id").val();
        nodeSendArray.senderID = $("#global-user-id").val();
        nodeSendArray.sessionID = sessionID;
        nodeSendArray.message = nl2br(theData.message);
        socket.emit("push-notification", nodeSendArray);

        //CLOSE OTHER CHAT REQUEST
        var nodeSendArray = {};
        nodeSendArray.pushType = "close-other-customer-chat-request";
        nodeSendArray.childID = $("#global-child-id").val();
        nodeSendArray.senderID = $("#global-user-id").val();
        nodeSendArray.sessionID = sessionID;
        socket.emit("push-notification", nodeSendArray);
      }
    }
  );
}

//CLOSE OTHER CHAT REQUEST
function closeOtherChatRequest(data) {
  "use strict";
  console.log(data);

  if (data.senderID !== $("#global-user-id").val()) {
    $(".chat-options").hide();
  }
}

//OPEN CHAT
/////////////////////////////////////////////
$(document).on("click", "#customer-chat-open-chats .online-users", function(q) {
  q.preventDefault;
  openChatMessage($(this).attr("session-id"));

  //REMOVE ACTIVE
  $("li.online-users").removeClass("active");

  //ACTIVE
  $(this)
    .addClass("active")
    .removeClass("customer-chat-unread-messages");
});

function openChatMessage(sessionID) {
  "use strict";
  //console.log(sessionID,'open chat');

  //CHECK
  if ($("#chat-message-holder-inside").attr("session-id") === sessionID) {
    return false;
  }

  $("#current-chat-bar-customer-info-name").text(
    $(
      ".online-users[session-id='" +
        sessionID +
        "'] .open-customer-chat-window .chat-company-name"
    ).text()
  );

  //CLEAR CURRENT MESSAGES
  $("#chat-message-holder-inside")
    .html("")
    .attr("session-id", sessionID);

  $.post(
    "main-console-includes/jsval/template-globals.php",
    {
      action: "open-chat-messages",
      childID: $("#global-child-id").val(),
      userID: $("#global-user-id").val(),
      sessionID: sessionID
    },
    function(data) {
      //console.log(data);
      var theData = $.parseJSON(data);

      $.each(theData.messages, function(key, value) {
        var template = $("#templateChatMessage").html();

        $("#chat-message-holder-inside").append(
          template
            .replace(
              "{{chatPosition}}",
              value.type == "c" ? "chat-right" : "chat-left"
            )
            .replace("{{chatMessage}}", nl2br(value.msg))
            .replace("{{chatTime}}", "chatTime")
        );
      });

      //SCROLL TO TOP
      customerChatMessageTopScroll();
    }
  );
}

function customerChatMessageTopScroll() {
  "use strict";
  $("#chat-message-holder-inside").scrollTop(9999999999999999999);
}

//CUSTOMER CHAT MESSAGE
/////////////////////////////////////////////
function parseCustomerChatMessage(data) {
  "use strict";

  console.log(data);

  //CHILD ID CHECK
  if ($("#global-child-id").val() !== data.childID) {
    return false;
  }

  if (chatPageCheck() === "0") {
    if (data.staffID == $("#global-user-id").val()) {
      console.log("grittier alert");

      if ($('.settings-check-box[name="notifications-sound"]').is(":checked")) {
        alertSoundNotification();
      }

      $.gritter.add({
        title: "Chat from: " + data.name,
        text: data.message,
        image: "https://placehold.e2printsoft.com/50",
        sticky: false,
        time: ""
      });
    }
  }

  //SET MESSAGE
  if (chatPageCheck() === "1") {
    console.log(951951);
    if (
      $("#chat-message-holder-inside").attr("session-id") === data.sessionID
    ) {
      var template = $("#templateChatMessage").html();

      $("#chat-message-holder-inside").append(
        template
          .replace("{{chatPosition}}", "chat-right")
          .replace("{{chatMessage}}", nl2br(data.message))
          .replace("{{chatTime}}", "chatTime")
      );
    } else {
      $(".online-users[session-id='" + data.sessionID + "']").addClass(
        "customer-chat-unread-messages"
      );
    }
  }
}

//SEND CUSTOMER CHAT MESSAGE
////////////////////////////////////////////
$(document).on("click", "#customer-chat-send-button", function(q) {
  q.preventDefault;
  sendCustomerChatMessage();
});

function sendCustomerChatMessage() {
  "use strict";

  var sessionID = $("#chat-message-holder-inside").attr("session-id");
  console.log("sessionID", sessionID);
  if (sessionID == "") {
    return false;
  }

  var str = $("#customer-chat-message").val();

  if (!str.replace(/\s/g, "").length) {
    $("#customer-chat-message").val("");
    return false;
  }

  var msg = $.trim($("#customer-chat-message").val());
  var template = $("#templateChatMessage").html();

  $("#chat-message-holder-inside").append(
    template
      .replace("{{chatPosition}}", "chat-left")
      .replace("{{chatMessage}}", nl2br(msg))
      .replace("{{chatTime}}", "chatTime")
  );

  //SCROLL TO TOP
  customerChatMessageTopScroll();

  //CLEAR CHAT BOX
  $("#customer-chat-message").val("");

  ////////////////////////////////////////

  var nodeSendArray = {};
  nodeSendArray.pushType = "customer-chat-message";
  nodeSendArray.childID = $("#global-child-id").val();
  nodeSendArray.senderID = $("#global-user-id").val();
  nodeSendArray.sessionID = sessionID;
  nodeSendArray.message = msg;
  socket.emit("push-notification", nodeSendArray);

  $.post(
    "main-console-includes/jsval/template-globals.php",
    {
      action: "save-customer-chat",
      childID: $("#global-child-id").val(),
      sessionID: sessionID,
      message: encodeURIComponent(msg)
    },
    function() {}
  );
}

//CLOSE CHAT
////////////////////////////////////////////
$(document).on("click", "#open-customer-chat-option-close", function(q) {
  q.preventDefault;
  closeCustomerChat();
  return false;

  var sessionID = $("#chat-message-holder-inside").attr("session-id");

  if (sessionID == "" || sessionID == undefined) {
    bootbox.alert("There is no chat selected...");
    return false;
  }

  bootbox.confirm({
    message: "Are you sure you want to close this chat",
    buttons: {
      confirm: {
        label: "Close Chat!",
        className: "btn-danger btn-sm"
      },
      cancel: {
        label: "Cancel",
        className: "btn-success btn-sm"
      }
    },
    callback: function(result) {
      if (result == true) {
        console.log(result);
        closeCustomerChat();
      }
    }
  });
});

function closeCustomerChat() {
  "use strict";

  $.post(
    "main-console-includes/jsval/template-globals.php",
    {
      action: "close-customer-chat",
      childID: $("#global-child-id").val(),
      sessionID: $("#chat-message-holder-inside").attr("session-id")
    },
    function(data) {
      console.log(data);
      //var theData = $.parseJSON(data);

      //MOVE TO ONLINE
      var sessionID = $("#chat-message-holder-inside").attr("session-id");
      var duplicate = $(".online-users[session-id='" + sessionID + "']");
      $("#customer-chat-online-users").append(duplicate);

      //REMOVE ID
      $("#chat-message-holder-inside").attr("session-id", "");
      $("#chat-message-holder-inside").html("");

      //UNSET CUSTOMER CHAT VALUES
      var nodeSendArray = {};
      nodeSendArray.pushType = "unset-customer-chat";
      nodeSendArray.childID = $("#global-child-id").val();
      nodeSendArray.senderID = $("#global-user-id").val();
      nodeSendArray.sessionID = sessionID;
      socket.emit("push-notification", nodeSendArray);
    }
  );
}
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//CUSTOMER CHAT///////////////////////////////////////////////////////////////////////// F:\Media\TV Shows\Law.and.Order.SVU.S01-S15.DVDRip.XviD-IPT\Season 01
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////
//PUSH NOTIFICATION LISTENER////////////////
////////////////////////////////////////////
socket.on("push-notification", function(data) {
  //console.log(data);
  //console.log(data.pushType);

  switch (data.pushType) {
    case "admin-support-status":
      updateAdminChatStatus(data);
      break;

    case "chat-message":
      newChatMessage(data);
      break;

    case "chat-status-check":
      checkChatStatus();
      break;

    case "chat-status-check-return":
      updateChatStatus(data);
      break;

    case "start-customer-chat-request":
      chatRequest(data);
      break;

    case "internal-messaging":
      internalMessagingParser(data);
      break;

    case "update-user-settings":
      updateUserSettings(data);
      break;

    case "onsite-alerts":
      gritterPop(data);
      rightMenuNotifications(data);
      break;

    case "online-user-check":
      onlineUsers(data);
      break;

    case "new-todo-item":
      pushNewTodoItem(data);
      break;

    case "check-todo-item":
      pushCheckTodoItem(data);
      break;

    case "delete-todo-item":
      pushDeleteTodoItem(data);
      break;

    case "order-override-alert":
      orderOverrideAlert(data);
      break;

    //CUSTOMER CHAT
    ////////////////////////////////////////////
    case "online-users-check-return":
      onlineUserCheckReturn(data);
      break;

    case "online-user-beacon":
      onlineUserBeacon(data);
      break;

    case "get-customer-chat-msg":
      parseCustomerChatMessage(data);
      break;

    case "close-other-customer-chat-request":
      closeOtherChatRequest(data);
      break;
  }
});
////////////////////////////////////////////
//PUSH NOTIFICATION LISTENER////////////////
////////////////////////////////////////////

////////////////////////////////////////////
//ORDER OVERRIDE ALERT//////////////////////
////////////////////////////////////////////
function orderOverrideAlert(data) {
  "use strict";
  //console.log(data);

  if ($("#global-user-id").val() === data.toStaffID) {
    $.gritter.add({
      title: data.notificationTitle,
      text: data.notificationText,
      image: "https://placehold.e2printsoft.com/50",
      sticky: true,
      time: ""
    });

    //bootbox.alert(data.notificationText);

    $("#over-ride-invoice-staff-name").text(data.fromStaffName);

    //alert( $("#over-ride-invoice-changes-warning-messaging").length );

    if ($("#over-ride-invoice-changes-warning-messaging").length === 0) {
      $("#over-ride-invoice-to-warning-messaging").show();
    }

    /*
		setTimeout(function(){
			location.replace("main-console.php?content=order-management&action=order-listing&list-type=view");
		}),25000;
		*/
  }
}
////////////////////////////////////////////
//ORDER OVERRIDE ALERT//////////////////////
////////////////////////////////////////////

////////////////////////////////////////////
//SETTINGS//////////////////////////////////
////////////////////////////////////////////
$(document).on("click", ".settings-check-box", function(q) {
  var settings = $(this);

  $.post(
    "main-console-includes/jsval/template-globals.php",
    {
      action: "staff-settings",
      userID: $("#global-user-id").val(),
      type: settings.attr("settings-type"),
      field: settings.attr("field"),
      value: settings.is(":checked") ? 1 : 0
    },
    function(data) {
      //console.log(data);

      var nodeSendArray = {};
      nodeSendArray["pushType"] = "update-user-settings";
      nodeSendArray["childID"] = $("#global-child-id").val();
      nodeSendArray["senderID"] = $("#global-user-id").val();
      (nodeSendArray["settingName"] = settings.attr("name")),
        (nodeSendArray["value"] = settings.is(":checked") ? 1 : 0);
      socket.emit("push-notification", nodeSendArray);

      if (settings.attr("field") == "chat_available") {
        checkChatStatus();
      }
    }
  );
});

function updateUserSettings(data) {
  if (
    data.childID == $("#global-child-id").val() &&
    data.senderID == $("#global-user-id").val()
  ) {
    var boolean = data.value == 1 ? true : false;
    $("input[name=" + data.settingName + "]").prop("checked", boolean);
  }
}
////////////////////////////////////////////
//SETTINGS//////////////////////////////////
////////////////////////////////////////////

////////////////////////////////////////////
//TO-DO LIST////////////////////////////////
////////////////////////////////////////////
//HIDE LIST ITEM
$(document).on("click", ".todo-close", function(e) {
  e.preventDefault();
  $(this)
    .parent()
    .hide();

  var tableID = $(this)
    .parent()
    .attr("myTarget");

  $.post(
    "main-console-includes/jsval/template-globals.php",
    {
      childID: $("#global-child-id").val(),
      staffID: $("#global-user-id").val(),
      action: "delete-todo-item",
      tableID: tableID
    },
    function(data) {
      //console.log(data);

      var nodeSendArray = {};
      nodeSendArray["pushType"] = "delete-todo-item";
      nodeSendArray["childID"] = $("#global-child-id").val();
      nodeSendArray["staffID"] = $("#global-user-id").val();
      (nodeSendArray["tableID"] = tableID),
        socket.emit("push-notification", nodeSendArray);
    }
  );
});

function pushDeleteTodoItem(data) {
  if (data.staffID == $("#global-user-id").val()) {
    $("#todo-list li[myTarget=" + data.tableID + "]").remove();
  }
}

//TOGGLE CHECKED
$(document).on("click", "#todo-list li", function(e) {
  e.preventDefault();
  $(this).toggleClass("checked");

  //MARK AS DONE
  var value = $(this).hasClass("checked") ? "1" : "0";
  var tableID = $(this).attr("myTarget");

  $.post(
    "main-console-includes/jsval/template-globals.php",
    {
      childID: $("#global-child-id").val(),
      staffID: $("#global-user-id").val(),
      action: "check-todo-item",
      tableID: tableID,
      value: $(this).hasClass("checked") ? "1" : "0"
    },
    function(data) {
      //console.log(data);

      var nodeSendArray = {};
      nodeSendArray["pushType"] = "check-todo-item";
      nodeSendArray["childID"] = $("#global-child-id").val();
      nodeSendArray["staffID"] = $("#global-user-id").val();
      (nodeSendArray["tableID"] = tableID), (nodeSendArray["value"] = value);
      socket.emit("push-notification", nodeSendArray);
    }
  );
});

function pushCheckTodoItem(data) {
  if (data.staffID == $("#global-user-id").val()) {
    if (data.value == "1") {
      $("#todo-list li[myTarget=" + data.tableID + "]").addClass("checked");
    } else {
      $("#todo-list li[myTarget=" + data.tableID + "]").removeClass("checked");
    }
  }
}

//NEW ITEM
function newToDoItem() {
  var inputValue = $("#todo-message-box").val();

  if (inputValue === "") {
    return false;
  }

  $("#todo-message-box").val("");

  $(".todo-list-scroll").scrollTop(9999999999999999999);

  $.post(
    "main-console-includes/jsval/template-globals.php",
    {
      childID: $("#global-child-id").val(),
      staffID: $("#global-user-id").val(),
      action: "new-todo-item",
      message: encodeURIComponent(inputValue)
    },
    function(data) {
      //console.log(data);
      var theData = $.parseJSON(data);
      var newLi =
        '<li mytarget="' +
        theData.tableID +
        '">' +
        nl2br(inputValue) +
        '<span class="todo-close"><i class="fa fa-trash"></i></span></li>';
      //$("#todo-list").append(newLi);

      var nodeSendArray = {};
      nodeSendArray["pushType"] = "new-todo-item";
      nodeSendArray["childID"] = $("#global-child-id").val();
      nodeSendArray["staffID"] = $("#global-user-id").val();
      nodeSendArray["message"] = newLi;
      socket.emit("push-notification", nodeSendArray);
    }
  );
}

$(document).on("keypress", "#todo-message-box", function(e) {
  if (e.keyCode == 13) {
    if (e.shiftKey === true) {
      //console.log('new line')
    } else {
      e.preventDefault();
      newToDoItem();
    }
    //return false;
  }
});

function pushNewTodoItem(data) {
  if (data.staffID == $("#global-user-id").val()) {
    $("#todo-list").append(data.message);
  }
}
////////////////////////////////////////////
//TO-DO LIST////////////////////////////////
////////////////////////////////////////////

////////////////////////////////////////////
//HELP//////////////////////////////////////
////////////////////////////////////////////
$(document).on("change", "#right-div-help-select", function(e) {
  var val = $(this).val();
  //console.log(val);
  var url =
    "template-assets/right-menu/right-div-help/right-div-help-" + val + ".php";
  $("#help-content").load(url);
  setCookie(
    $("#global-user-id").val() + "-right-menu-help-select-option",
    val,
    1
  );
});

$(document).on("click", ".right-div-help-item", function(e) {
  var val = $(this).attr("href");
  //console.log(val);
  setCookie($("#global-user-id").val() + "-right-div-help-item", val, 1);
});

function rightDivHelpStarter() {
  myTarget = getCookie(
    $("#global-user-id").val() + "-right-menu-help-select-option"
  );

  if (myTarget != "") {
    $("#right-div-help-select").val(myTarget);
    var url =
      "template-assets/right-menu/right-div-help/right-div-help-" +
      myTarget +
      ".php";
    $("#help-content").load(url);
    myTarget = getCookie($("#global-user-id").val() + "-right-div-help-item");
    setTimeout(function() {
      $(myTarget).addClass("  in fade ");
    }, 200);
  }
}
////////////////////////////////////////////
//HELP//////////////////////////////////////
////////////////////////////////////////////

////////////////////////////////////////////
//ONSITE NOTIFICATION///////////////////////
////////////////////////////////////////////
function alertSoundNotification() {
  var song = $("#alertAudioNotification").get(0);
  song.play();
}

$(document).on("click", ".notification-check", function(q) {
  q.preventDefault();
  var nodeSendArray = {};
  nodeSendArray["pushType"] = "onsite-alerts";
  nodeSendArray["childID"] = $("#global-child-id").val();
  nodeSendArray["notificationType"] = $("#notification-type").val();
  nodeSendArray["notificationTitle"] = "This is a regular notice!";
  nodeSendArray["notificationText"] =
    nodeSendArray["notificationType"] + ": This will fade out after.....";
  socket.emit("push-notification", nodeSendArray);
});

function gritterPop(data) {
  //console.log(data);

  if (
    data.childID == $("#global-child-id").val() &&
    $('.settings-check-box[name="notifications"]').is(":checked") &&
    $('.settings-check-box[name="' + data.notificationType + '"]').is(
      ":checked"
    )
  ) {
    if ($('.settings-check-box[name="notifications-sound"]').is(":checked")) {
      alertSoundNotification();
    }
    $.gritter.add({
      title: data.notificationTitle,
      text: data.notificationText,
      //image:"https://placehold.e2printsoft.com/50",
      sticky: false,
      time: "8000"
    });
  }
  return false;
}
////////////////////////////////////////////
//ONSITE NOTIFICATION///////////////////////
////////////////////////////////////////////

////////////////////////////////////////////
//INTERNAL MESSAGING PARSER/////////////////
////////////////////////////////////////////
function internalMessagingParser(data) {
  "use strict";

  //RECEIVER
  if (data.receiverID == $("#global-user-id").val()) {
    //ALERT
    gritterPop(data);

    //ADD TO MESSAGE LIST
    if (
      $("#internal-messaging-folder").length == 1 &&
      ($("#internal-messaging-folder").val() == "all" ||
        $("#internal-messaging-folder").val() == data.folder)
    ) {
      $("#internal-messaging-scroll ul").prepend(data.mailListInbox);
    }
  }

  //SENDER
  if (data.senderID == $("#global-user-id").val()) {
    //ADD TO MESSAGE LIST
    if (
      $("#internal-messaging-folder").length == 1 &&
      $("#internal-messaging-folder").val() == "sent"
    ) {
      $("#internal-messaging-scroll ul").prepend(data.mailListSent);
    }
  }
}
////////////////////////////////////////////
//INTERNAL MESSAGING PARSER/////////////////
////////////////////////////////////////////

////////////////////////////////////////////
//MENU RIGHT NOTIFICATIONS//////////////////
////////////////////////////////////////////
function rightMenuNotifications(data) {
  "use strict";
  //console.log(data);

  var icons = {
    "contact-request": " fa fa-envelope ",
    "customer-login": " fa fa-sign-in ",
    "design-order-approval": " fa fa-thumbs-up ",
    "design-order-note": " fa fa-commenting ",
    "estimate-payment": " fa fa-money ",
    "invoice-payment": " fa fa-money ",
    "new-order": " fa fa-tag ",
    "new-user": " fa fa-user ",
    "quote-request": " fa fa-money ",
    "shopping-cart": " fa fa-shopping-cart ",
    "staff-login": " fa fa-sign-in ",
    "user-login": " fa fa-sign-in "
  };

  if (data.childID === $("#global-child-id").val()) {
    var notificationText = data["notificationText"].replace("<br/>", " - ");
    notificationText = notificationText.replace("<br>", " - ");
    notificationText = notificationText.replace("<hr/>", " - ");
    notificationText = notificationText.replace("<hr>", " - ");

    var template = "";
    var date = new Date();
    var theDater = date.toISOString();

    template = template + '<li class="menu-right-notification-li">';
    template =
      template +
      '<div class="menu-right-notification-icon"><span class="' +
      icons[data.notificationType] +
      '"></span></div>';

    template = template + '<div class="menu-right-notification-info">';
    template =
      template +
      '<div class="menu-right-notification-title">' +
      data.notificationTitle +
      "</<div>";
    template =
      template +
      '<div class="menu-right-notification-desc">' +
      notificationText +
      "</div>";
    template = template + '<div class="menu-right-notification-date time">';
    template =
      template +
      '<time class="show-time" datetime="' +
      theDater +
      '">' +
      theDater +
      "</time> ";
    template = template + "</div>";
    template = template + "</div>";

    template = template + '<div class="clearfix"></div>';
    template = template + "</li>";

    $("#menu-right-notification-list").prepend(template);
    $("time.show-time").timeago();
  }
}

////////////////////////////////////////////
//MENU RIGHT NOTIFICATIONS//////////////////
////////////////////////////////////////////

////////////////////////////////////////////
//GO TO TOP/////////////////////////////////
////////////////////////////////////////////
$(document).on("click", ".footer-tools .go-top", function(q) {
  "use strict";
  q.preventDefault;
  console.log(45);

  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});
////////////////////////////////////////////
//GO TO TOP/////////////////////////////////
////////////////////////////////////////////

////////////////////////////////////////////
//COOKIES///////////////////////////////////
////////////////////////////////////////////
function setRightDivActive() {
  myTarget = getCookie($("#global-user-id").val() + "-right-div-active");
  //console.log('myTarget: '+myTarget);

  if (myTarget != "") {
    $("." + myTarget + "-li").addClass("active");
    $("#" + myTarget).addClass("in active");
  } else {
    $(".right-chat-div-li").addClass("active");
    $("#right-chat-div").addClass("in active");
  }
}

$(document).on("click", ".right-div-cookies", function(q) {
  setCookie(
    $("#global-user-id").val() + "-right-div-active",
    $(this).attr("myTarget"),
    1
  );
});

function clearChatCookie() {
  setCookie($("#global-user-id").val() + "chat-open", "", -1);
  setCookie($("#global-user-id").val() + "chat-open-user-id", "", -1);
  //console.log(document.cookie)
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}
////////////////////////////////////////////
//COOKIES///////////////////////////////////
////////////////////////////////////////////

//NUMBERS ONLY
$(document).on("keypress", ".numbersOnly", function(e) {
  if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    return false;
  }
});

$(document).on("keypress", ".numbers-only-digits", function(e) {
  if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    return false;
  }
});

//NUMBERS ONLY MONEY
$(document).on("input", ".numbers-only-decimal", function(evt) {
  var value = this.value;
  if (!/^(?:\d*\.\d{1,2}|\d+)$/.test(value)) {
    var t = value.replace(/[^\d*\.\d{1,2}]/g, "");

    var pieces = t.split(".");
    var check = 0;

    if (typeof pieces[1] !== "undefined" && pieces[1].length > 2) {
      check = 1;
    }

    if (t % 1 != 0 || check == 1) {
      t = pieces[0] + "." + pieces[1].substring(0, 2);
      t = parseFloat(t).toFixed(2);
    }
    $(this).val(t);
  }
});

//GLBOAL TOGGLE
$(document).on("click", ".globalToggle", function(q) {
  q.preventDefault();
  var target = $(this).attr("globalToggleTarget");
  //console.log(target)
  $(target).slideToggle();
});
