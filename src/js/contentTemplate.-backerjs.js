import $ from "jquery";

$(document).on("click", "#test", function(e) {
  e.preventDefault();

  const rightMenuDiv = $(".right-menu-div").height();
  console.log("rightMenuDiv", rightMenuDiv);

  const rightNavTabsContent = $("#right-nav-tabs-content").height();
  console.log("rightNavTabsContent", rightNavTabsContent);

  const rightNavTabsContentDiv = $("#right-nav-tabs-content>div").height();
  console.log("rightNavTabsContentDiv", rightNavTabsContentDiv);

  const rightNavTabsContentDivCon = $(
    "#right-nav-tabs-content div .right-nav-pill-content"
  ).height();
  console.log("rightNavTabsContentDivCon", rightNavTabsContentDivCon);
});

function repsonsive() {
  const windowWidth = $(window).width();
  const wrapper = $("#wrapper");

  if (windowWidth <= 768) {
    wrapper.addClass("toggle-left-menu-hide toggle-right-menu-hide");
    $("li.parent").removeClass("open");
  } else if (windowWidth <= 1024) {
    wrapper.addClass("toggle-left-menu-hide toggle-right-menu-hide");
    $("li.parent").removeClass("open");
  } else if (windowWidth >= 1920) {
    wrapper.removeClass("toggle-left-menu-hide toggle-right-menu-hide");
  }
}

//Menu Starter
function menuStarter() {
  const wrapper = $("#wrapper");
  if (localStorage.getItem("left-menu-show") === "0") {
    wrapper.addClass("toggle-left-menu-hide");
    $("li.parent").removeClass("open");
  }

  if (
    localStorage.getItem("right-menu-show") === "1" &&
    $(window).width() > 768
  ) {
    wrapper.removeClass("toggle-right-menu-hide");
  }
}

//Left Menu
$(document).on("click", "#left-menu-toggle", function(e) {
  e.preventDefault();

  const wrapper = $("#wrapper");
  $(".sidebar-elements>li.parent").removeClass("open");

  wrapper.toggleClass("toggle-left-menu-hide");
  localStorage.setItem(
    "left-menu-show",
    wrapper.hasClass("toggle-left-menu-hide") ? "0" : "1"
  );
});

$(document).on("click", ".parent", function(e) {
  e.preventDefault();

  console.log(51);

  $(this)
    .parent("li")
    .toggleClass("open");

  const parentLi = $(this).parent("li");

  $(".sidebar-elements li")
    .not(parentLi)
    .removeClass("open");

  const ulOffset = $(".sidebar-elements").offset().top;
  const liOffset = $(this).offset().top;
  const offset = liOffset - ulOffset;

  if (parentLi.hasClass("open")) {
    $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .animate({ scrollTop: offset }, 1500);
  }
});

//Right Menu
$(document).on("click", ".right-menu-toggle", function(e) {
  e.preventDefault();

  const wrapper = $("#wrapper");
  wrapper.toggleClass("toggle-right-menu-hide");

  localStorage.setItem(
    "right-menu-show",
    wrapper.hasClass("toggle-right-menu-hide") ? "0" : "1"
  );
});

$(document).ready(function() {
  menuStarter();
});

$(window).resize(function() {
  repsonsive();
});
