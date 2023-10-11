(function () {

  // Utility Functions
  function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
      const context = this, args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  // --------------------- SCROLL & CLICK BUTTON ACTIVATION ---------------------
  const controls = document.querySelectorAll(".control");
  const sections = document.querySelectorAll("section");

  function setActiveButton() {
    const scrollPosition = window.scrollY;
    let activeSection = null;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 42; // Consider using a descriptive constant for numbers
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeSection = section.getAttribute("id");
      }
    });

    controls.forEach((button) => {
      button.classList.toggle("active-btn", button.getAttribute("data-id") === activeSection);
    });
  }

  // --------------------- THEME TOGGLE ---------------------
  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });

  // --------------------- SMOOTH SCROLL ---------------------
  function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll(".smooth-scroll");
    for (let link of smoothScrollLinks) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      });
    }
  }

  // --------------------- WEBSITE LOADER ANIMATION ---------------------
  function initLoaderAnimation() {
    window.addEventListener('load', function () {
      gsap.to("#cartridge", {
        duration: 1.00,
        y: "+=57",
        onComplete: () => {
          gsap.to("#loader", {
            duration: 0.25,
            opacity: 0,
            onComplete: () => {
              document.getElementById("loader").style.display = "none";
            }
          });
        }
      });
    });
  }

  // --------------------- AJAX CONTACT FORM SUBMISSION ---------------------
  function initContactFormAjaxSubmission() {
    document.getElementById("contact-form").addEventListener("submit", function (event) {
      var emailInput = document.querySelector('input[name="email"]');
      var messageInput = document.querySelector('textarea[name="message"]');
      if (!emailInput.value.trim() || !messageInput.value.trim()) {
        event.preventDefault(); // Prevent form submission
        showMessage("Please fill in all required fields.", "error");
        return;
      }

      event.preventDefault(); // Prevent default form submission

      var formData = new FormData(this);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", this.action, true);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            showMessage("Form submitted successfully.", "success");
            event.target.reset();
          } else {
            showMessage("Failed to submit form. Please try again.", "error");
          }
        }
      };
      xhr.send(formData);
    });

    function showMessage(message, type) {
      var messageContainer = document.getElementById("message-container");
      messageContainer.innerHTML = ""; // Clear previous messages

      var messageElement = document.createElement("div");
      messageElement.classList.add("message-" + type);

      if (type === "success") {
        var successIcon = document.createElement("i");
        successIcon.classList.add("fas", "fa-check", "success-icon");
        messageElement.appendChild(successIcon);
      }

      messageElement.appendChild(document.createTextNode(message));
      messageContainer.appendChild(messageElement);

      if (type === "success") {
        setTimeout(() => messageElement.remove(), 2000);
      }
    }
  }

  // --------------------- OTHER EFFECTS & LOGIC ---------------------
  function initOtherEffects() {
    // Calculate Age Logic
    const ageElement = document.querySelector(".large-text");
    const birthdate = new Date("2004-09-16");
    const age = Math.floor((Date.now() - birthdate) / (365.25 * 24 * 60 * 60 * 1000));
    ageElement.textContent = age;

    // Light circle effect for about-item
    document.getElementById("cards").onmousemove = (e) => {
      for (const card of document.getElementsByClassName("about-item")) {
        const { left, top } = card.getBoundingClientRect(),
          x = e.clientX - left,
          y = e.clientY - top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
  }

  // --------------------- PROGRESS BARS ANIMATION ---------------------
  function initProgressBarAnimation() {
    const skillsSection = document.querySelector('.about-stats');
    let animated = false;

    const animateBars = (entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;

        const progressTexts = document.querySelectorAll('.prog-text');
        const progressBars = document.querySelectorAll('.progress span');

        progressTexts.forEach((progText, index) => {
          const finalPercent = parseInt(progText.textContent);
          let currentPercent = 0;
          let currentBarWidth = 0;

          const barElement = progressBars[index];

          const duration = 1500;
          const textIncrement = 1;
          const barIncrement = 0.5;
          const textDelay = duration / finalPercent;
          const barDelay = (duration / finalPercent) * barIncrement;

          const updatePercentText = () => {
            if (currentPercent <= finalPercent) {
              progText.textContent = currentPercent + '%';
              currentPercent += textIncrement;
              setTimeout(updatePercentText, textDelay);
            }
          };

          const updateBarWidth = () => {
            if (currentBarWidth <= finalPercent) {
              barElement.style.width = currentBarWidth + '%';
              currentBarWidth += barIncrement;
              setTimeout(updateBarWidth, barDelay);
            } else if (currentBarWidth > finalPercent) {
              barElement.style.width = finalPercent + '%';
            }
          };

          updatePercentText();
          updateBarWidth();
        });
      }
    };

    // Set up the Intersection Observer
    const observerOptions = {
      root: null,
      threshold: 0.1  // At least 10% of the target is visible
    };

    const observer = new IntersectionObserver(animateBars, observerOptions);
    observer.observe(skillsSection);
  }

  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the animation class to the target element
        entry.target.classList.add('animated');

        // Unobserve the element after animating (optional, but prevents unnecessary checks)
        observer.unobserve(entry.target);
      }
    });
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver(handleIntersection, options);
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));


  // Get the elements
  var elements = document.querySelectorAll('.content');
  console.log("elements --- ", elements);
  // Function to check for fade effect on scroll and resize
  function checkForFade() {
    let windowHeight = window.innerHeight;
  
    elements.forEach(function(element) {
      let elementHeight = element.offsetHeight;
      let elementOffset = element.getBoundingClientRect().top;
      let elementBottom = elementOffset + elementHeight;
  
      if (elementBottom > windowHeight && elementOffset < windowHeight - 650) {
        element.classList.add('non-focus');
      } else {
        element.classList.remove('non-focus');
      }
    });
  }
  

  // Add event listeners for scroll and resize and call the checkForFade function
  window.addEventListener('scroll', checkForFade);
  window.addEventListener('resize', checkForFade);

  // Trigger the scroll event on initial load
  window.dispatchEvent(new Event('scroll'));
  window.addEventListener("scroll", debounce(setActiveButton));
  controls.forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    checkForFade();
    initSmoothScroll();
    // initLoaderAnimation();
    initContactFormAjaxSubmission();
    initOtherEffects();
    initProgressBarAnimation();
  });
})();