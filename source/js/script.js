"use strict";

let navMain = document.querySelector(".main-nav");
let navToggle = document.querySelector(".main-nav__toggle");
let pageHeader = document.querySelector(".page-header");
let pageIntro = document.querySelector(".intro");

pageHeader.classList.remove("page-header--full");
pageIntro.classList.remove("intro--short");

navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");

    if (pageHeader.classList.contains("page-header--full")) {
      pageHeader.classList.remove("page-header--full");
    } else {
      pageHeader.classList.add("page-header--full");
    };

    if (pageIntro.classList.contains("intro--short")) {
      pageIntro.classList.remove("intro--short");
    } else {
      pageIntro.classList.add("intro--short");
    };

  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
    pageHeader.classList.remove("page-header--full");
    pageIntro.classList.remove("intro--short");
  }
});