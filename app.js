(function () {
  [...document.querySelectorAll(".control")].forEach(button => {
    button.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
    })
  });
  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  })

  const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

  for (let link of smoothScrollLinks) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const options = {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      }
      target.scrollIntoView(options);
    });
  }

  const birthdate = new Date('2004-09-16');

  // Calculate the age
  const age = Math.floor((Date.now() - birthdate) / (365.25 * 24 * 60 * 60 * 1000));

  // Update the HTML
  const ageElement = document.querySelector('.large-text');
  ageElement.textContent = age;
  //light circle effect for about-item
  document.getElementById("cards").onmousemove = e => {
    for (const card of document.getElementsByClassName("about-item")) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  }
})();
