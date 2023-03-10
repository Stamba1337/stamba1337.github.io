(function () {
  [...document.querySelectorAll(".control")].forEach(button => {
    button.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
      document.querySelector(".active").classList.remove("active");
      document.getElementById(button.dataset.id).classList.add("active");
    })
  });
  document.querySelector(".theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  })

  const birthdate = new Date('2004-09-16');

  // Calculate the age
  const age = Math.floor((Date.now() - birthdate) / (365.25 * 24 * 60 * 60 * 1000));

  // Update the HTML
  const ageElement = document.querySelector('.large-text');
  ageElement.textContent = age;
})();
