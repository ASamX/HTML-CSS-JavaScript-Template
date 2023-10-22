/* ---------------Toggle Menu--------------- */

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    toggleBtn.classList.remove("menu-active");
    tLinks.classList.remove("open");
  }
});
tLinks.onclick = function (e) {
  e.stopPropagation();
};

/* ---------------Toggle Settings--------------- */

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

/* ---------------Handle Active State--------------- */

function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  event.target.classList.add("active");
}

/* ---------------Switch Color--------------- */

const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

/* ---------------Local Storage Color--------------- */

let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

/* ---------------Switch BackGround Image--------------- */

let backgroundOption = true;
let backgroundInterval;
const BackgroundSpan = document.querySelectorAll(".random-backgrounds span");
BackgroundSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImages();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

/* ---------------Local Storage BackGround--------------- */

let mainBackgrounds = localStorage.getItem("background_option");
if (mainBackgrounds !== null) {
  if (mainBackgrounds === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (mainBackgrounds === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

/* ---------------Change BackGround Image--------------- */

let landingPage = document.querySelector(".landing-page");
let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
function randomizeImages() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imagesArray.length);
      landingPage.style.backgroundImage =
        'url("Images/' + imagesArray[randomNumber] + '")';
    }, 7000);
  }
}
randomizeImages();

/* ---------------Show Bullets--------------- */

let bulletSpan = document.querySelectorAll(".bullets-option span");
let bulletsCont = document.querySelector(".nav-bullets");
bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsCont.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsCont.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

/* ---------------Show Bullets Local Storage--------------- */

let bulletStorage = localStorage.getItem("bullets_option");
if (bulletStorage !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletStorage === "block") {
    bulletsCont.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsCont.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

/* ---------------Change Mode and Save To Local Storage--------------- */

let settingsBox = document.querySelector(".settings-box");
let skillsBox = document.querySelector(".skills");
let waver = document.querySelector(".waver");
let curved = document.querySelector(".curved");
let timeline = document.querySelector(".timeline");
let contactBG = document.querySelector(".contact");
let contactTA = document.querySelectorAll(
  '.contact form input:not([type="submit"]), .contact form textarea'
);

function modeStyle() {
  document.body.style.backgroundColor = "black";
  settingsBox.style.backgroundColor = "black";
  settingsBox.style.borderRight = "1px solid var(--main-color)";
  skillsBox.style.backgroundColor = "black";
  skillsBox.style.borderTop = "5px solid var(--main-color)";
  skillsBox.style.borderBottom = "5px solid var(--main-color)";
  curved.style.borderTop = "5px solid var(--main-color)";
  curved.style.backgroundColor = "black";
  waver.style.display = "none";
  timeline.style.backgroundColor = "black";
  timeline.style.borderBottom = "5px solid var(--main-color)";
  contactBG.style.backgroundImage = `url('../Images/contact2.jpg')`;
  contactTA.forEach(function (element) {
    element.style.backgroundColor = "white";
  });
}
window.onload = function () {
  const savedState = localStorage.getItem("checkbox-state");
  if (savedState === "true") {
    modeStyle();

    document.getElementById("colorCheckbox").checked = true;
  }
};
const checkbox = document.getElementById("colorCheckbox");
checkbox.addEventListener("change", function () {
  localStorage.setItem("checkbox-state", this.checked);
  if (this.checked) {
    modeStyle();
  } else {
    document.body.style.backgroundColor = "";
    settingsBox.style.backgroundColor = "";
    settingsBox.style.borderRight = "";
    skillsBox.style.backgroundColor = "";
    skillsBox.style.borderTop = "";
    skillsBox.style.borderBottom = "";
    waver.style.display = "";
    curved.style.borderTop = "";
    curved.style.backgroundColor = "";
    timeline.style.backgroundColor = "";
    timeline.style.borderBottom = "";
    contactBG.style.backgroundImage = "";
    contactTA.forEach(function (element) {
      element.style.backgroundColor = "";
    });
  }
});

/* ---------------Skills Animation--------------- */

// let ourSkills = document.querySelector(".skills");
// allSkills = document.querySelectorAll(".skill-box .skill-progress span");
// window.onscroll = function () {
//   let skillsOffsetTop = ourSkills.offsetTop;
//   let skillsOuterHeight = ourSkills.offsetHeight;
//   let windowHeight = this.innerHeight;
//   let calcScroll = skillsOffsetTop + skillsOuterHeight - windowHeight;
//   if ((this.scrollY = calcScroll)) {
//     allSkills.forEach((skill) => {
//       skill.style.width = skill.dataset.progress;
//     });
//   }
// };

let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        allSkills.forEach((skill) => {
          skill.style.width = skill.dataset.progress;
        });
        observer.disconnect();
      }
    });
  },
  { threshold: 1.0 }
);

allSkills.forEach((skill) => {
  observer.observe(skill);
});

/* ---------------Gallery Popup--------------- */

let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let captionText = document.createTextNode(img.alt);
      imgHeading.appendChild(captionText);
      popupBox.appendChild(imgHeading);
    }
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);
    let closeBtn = document.createElement("span");
    let closeBtnText = document.createTextNode("X");
    closeBtn.appendChild(closeBtnText);
    closeBtn.classList.add("close-btn");
    popupBox.appendChild(closeBtn);
    closeBtn.onclick = function () {
      document.body.removeChild(this.parentElement);
      document.body.removeChild(
        document.getElementsByClassName("popup-overlay")[0]
      );
    };
  });
});

/* ---------------Nav Bullets--------------- */

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToLink(allBullets);

/* ---------------Scroll To Links--------------- */

const allLinks = document.querySelectorAll(".links a");
function scrollToLink(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}
scrollToLink(allLinks);

/* ---------------Scroll To Top--------------- */

let span = document.querySelector(".up");
window.onscroll = function () {
  let scrolled = window.scrollY;
  // console.log(this.scrollY);
  // if (this.scrollY >= 1000) {
  //   span.classList.add("show");
  // } else {
  //   span.classList.remove("show");
  // }
  scrolled >= 1778 ? span.classList.add("show") : span.classList.remove("show");
};
span.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/* ---------------Reset Options--------------- */

document.querySelector(".reset-options").addEventListener("click", () => {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("checkbox-state");
  location.reload();
});

// document.querySelector(".reset-options").onclick = function () {
//   localStorage.clear();
//   // localStorage.removeItem("color_option");
//   // localStorage.removeItem("background_option");
//   // localStorage.removeItem("bullets_option");
//   // localStorage.removeItem("checkbox-state");
//   window.location.reload();
// };
