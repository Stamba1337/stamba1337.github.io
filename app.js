(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
      button.addEventListener("click", function() {
        document.querySelector(".active-btn").classList.remove("active-btn");
        this.classList.add("active-btn");
        document.querySelector(".active").classList.remove("active");
        document.getElementById(button.dataset.id).classList.add("active");
      })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
    })
  
    function sendEmail() {
      var name = document.getElementById("name-input").value;
      var email = document.getElementById("email-input").value;
      var subject = document.getElementById("subject-input").value;
      var message = document.getElementById("message-input").value;
      var mailtoLink = "mailto:stamba1337@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
      window.location.href = mailtoLink;
    }
    
    document.querySelector(".main-btn").addEventListener("click", function() {
      sendEmail();
    });
  })();
  