document.addEventListener("DOMContentLoaded", function () {
  // Dark Mode Toggle
  const toggleButton = document.getElementById("dark-mode-toggle");
  toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const icon = this.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });

  // Modal Functionality
  var modal = document.getElementById("contact-modal");
  var btn = document.getElementById("contact-btn");
  var span = document.getElementsByClassName("close")[0];
  var form = document.getElementById("contact-form");

  // Open the modal
  btn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  // Close the modal when clicking the close button
  span.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close the modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // Form submission with validation
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (form.checkValidity()) {
      alert("Form submitted successfully!");
      modal.style.display = "none";
      form.reset();
    } else {
      alert("Please fill out all fields correctly.");
    }
  });
});
