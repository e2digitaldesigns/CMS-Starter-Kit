const breaks = { small: 768, medium: 1024, large: 1600 };

document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    initApplication();
  }
};

const initApplication = () => {
  repsonsive();

  window.addEventListener("resize", () => {
    //  repsonsive();
  });
};

function repsonsive() {
  const windowWidth = document.documentElement.clientWidth;
  const openMenuElement = ".sidebar-elements-li.open";

  if (windowWidth <= breaks.small) {
    removeClass(openMenuElement, "open");

    removeClasses("add", ".wrapper", [
      "toggle-left-menu-hide",
      "toggle-right-menu-hide"
    ]);
  } else if (windowWidth >= breaks.large) {
    removeClasses("remove", ".wrapper", [
      "toggle-left-menu-hide",
      "toggle-right-menu-hide"
    ]);
  }
}

function removeClass(element, classer) {
  const elements = document.querySelectorAll(element);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove(classer);
  }
}

function removeClasses(operator, element, classes = []) {
  const elements = document.querySelector(element);
  if (!elements) return;

  for (let i = 0; i < classes.length; i++) {
    if (operator === "add") {
      elements.classList.add(classes[i]);
    } else if (operator === "remove") {
      elements.classList.remove(classes[i]);
    }
  }
}
