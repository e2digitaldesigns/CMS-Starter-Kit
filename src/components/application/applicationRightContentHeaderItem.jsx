import React from "react";

const tabLinks = section => {
  const tab = document.querySelector(`.tab-header-` + section);
  if (tab.classList.contains("active")) return;

  const tabs = document.querySelectorAll("ul.right-content-section-menu li");
  const currentContent = document.querySelector(".tab-content.active");
  const newContent = document.querySelector(`.tab-content-` + section);

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  tab.classList.add("active");
  currentContent.classList.remove("active");
  currentContent.classList.remove("tab-content-in");
  currentContent.classList.add("tab-content-out");

  newContent.classList.add("active");
  newContent.classList.add("tab-content-in");
  newContent.classList.remove("tab-content-out");
};

const applicationRightContentHeaderItem = ({ section, status = false }) => {
  let name,
    fa,
    itemStatus = true;

  switch (section) {
    case "calculator":
      name = "calculator";
      fa = "calculator";
      break;

    case "chat":
      name = "chat";
      fa = "comments";
      break;

    case "todo":
      name = "to-do";
      fa = "list-alt";
      break;

    case "settings":
      name = "settings";
      fa = "cogs";
      break;

    case "notifications":
      name = "notifications";
      fa = "bell";
      break;

    default:
      itemStatus = false;
  }

  if (itemStatus) {
    return (
      <li
        className={`tab-header tab-header-${name} ${status}`}
        onClick={() => tabLinks(name)}
      >
        <i className={`fa fa-${fa}`}></i>
      </li>
    );
  } else {
    return "";
  }
};

export default applicationRightContentHeaderItem;
