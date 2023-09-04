(function () {
  const controls = document.querySelectorAll(".control");
  const sections = document.querySelectorAll("section");

  function setActiveButton() {
    const scrollPosition = window.scrollY;
    let activeSection = null;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 42;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        activeSection = section.getAttribute("id");
      }
    });

    controls.forEach((button) => {
      const buttonId = button.getAttribute("data-id");

      if (buttonId === activeSection) {
        button.classList.add("active-btn");
      } else {
        button.classList.remove("active-btn");
      }
    });
  }

  window.addEventListener("scroll", setActiveButton);
  setActiveButton();

  controls.forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
    });
  });

  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });

  const smoothScrollLinks = document.querySelectorAll(".smooth-scroll");

  for (let link of smoothScrollLinks) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      const options = {
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      };
      target.scrollIntoView(options);
    });
  }

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      // Check if any required fields are empty
      var emailInput = document.querySelector('input[name="email"]');
      var messageInput = document.querySelector('textarea[name="message"]');
      if (emailInput.value.trim() === "" || messageInput.value.trim() === "") {
        event.preventDefault(); // Prevent form submission
        showMessage("Please fill in all required fields.", "error");
        return;
      }

      event.preventDefault(); // Prevent default form submission

      var form = event.target;
      var formData = new FormData(form);

      // Send form data using AJAX
      var xhr = new XMLHttpRequest();
      xhr.open("POST", form.action, true);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            showMessage("Form submitted successfully.", "success");
            form.reset(); // Reset the form
          } else {
            showMessage("Failed to submit form. Please try again.", "error");
          }
        }
      };
      xhr.send(formData);
    });

  // Function to display messages
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
      var sendButton = document.querySelector('button[type="submit"]');
      sendButton.insertAdjacentElement("afterend", messageElement);

      // Remove message and icon after 3 seconds
      setTimeout(function () {
        messageElement.remove();
      }, 2000);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {

    // Calculate the age logic
    const birthdate = new Date("2004-09-16");
    const age = Math.floor(
      (Date.now() - birthdate) / (365.25 * 24 * 60 * 60 * 1000)
    );

    // Update the HTML
    const ageElement = document.querySelector(".large-text");
    ageElement.textContent = age;

    // Light circle effect for about-item
    document.getElementById("cards").onmousemove = (e) => {
      for (const card of document.getElementsByClassName("about-item")) {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };

    // Progress bars animation with Intersection Observer
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


    const observer = new IntersectionObserver(animateBars, {
      threshold: 0.3
    });

    observer.observe(skillsSection);
  });

})();
