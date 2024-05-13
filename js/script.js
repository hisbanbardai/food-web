//Set current year in footer
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

//Make mobile navigation work
const navBtnEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
navBtnEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

//Smooth scrolling animation
const linkEl = document.querySelectorAll("a:link");
linkEl.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const attrVal = link.getAttribute("href");

    //scroll to top
    if (attrVal === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    //scroll to specific section
    if (attrVal.startsWith("#") && attrVal.length > 1) {
      const sectionEl = document.querySelector(attrVal);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    //close mobile navigation when we click on any navigational link in nav
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

//Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    // entries is an array of values that we get based on the options object we provided below
    const ent = entries[0];
    console.log(ent);
    if (!ent.isIntersecting) {
      /* we will add the sticky class to the body so that we can use it as a parent class and only apply css styles of sticky navigation to header when the sticky class is present just like we did for mobile navigation .nav-open  */
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // root: null means we want to observe the element inside the viewport and not some specific container element.
    // threshold: 0 means an event will fire as soon as the hero section is out of the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
    //the 80px is the fixed height that we gave to the sticky class
  }
);
//we are going to use 'obs' to observe an html element which in our cases is hero section
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
