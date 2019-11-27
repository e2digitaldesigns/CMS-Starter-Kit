// import $ from "jquery";

const breaks = { small: 768, medium: 1024, large: 1600 };
let wrapper;

//const wrapper = document.getElementById("wrapper");

document.addEventListener("DOMContentLoaded", fn => {
  wrapper = document.querySelector("#wrapper");
  console.log(wrapper);
  // repsonsive();
});

window.addEventListener("resize", () => {
  // repsonsive();
});

function repsonsive() {
  const windowWidth = document.documentElement.clientWidth;
  const openMenuElement = ".sidebar-elements-li.open";

  if (windowWidth <= breaks.small) {
    removeClasses(openMenuElement, "open");
    wrapper.classList.add("toggle-left-menu-hide", "toggle-right-menu-hide");
  } else if (windowWidth <= breaks.medium) {
    removeClasses(openMenuElement, "open");
    wrapper.classList.add("toggle-left-menu-hide", "toggle-right-menu-hide");
  } else if (windowWidth >= breaks.large) {
    wrapper.classList.remove("toggle-left-menu-hide", "toggle-right-menu-hide");
  }
}

function removeClasses(element, classer) {
  const elements = document.querySelectorAll(element);
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove(classer);
  }
}

function isDocReady(fn) {
  if (document.readyState !== "complete") {
    console.log("ready");
  } else {
    setTimeout(fn, 2);
  }
}

isDocReady();
