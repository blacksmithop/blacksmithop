document.addEventListener("DOMContentLoaded", function () {
  // Dark Mode Toggle
  const toggleButton = document.getElementById("dark-mode-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  
  // Check for saved theme preference or use the system preference
  const currentTheme = localStorage.getItem("theme");
  
  if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-mode");
    updateDarkModeIcon(true);
  }
  
  toggleButton.addEventListener("click", function () {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    updateDarkModeIcon(isDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
  
  function updateDarkModeIcon(isDarkMode) {
    const icon = toggleButton.querySelector("i");
    
    if (isDarkMode) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }

  // Modal Functionality
  const modal = document.getElementById("contact-modal");
  const contactBtn = document.getElementById("contact-btn");
  const closeBtn = document.querySelector(".close");
  const form = document.getElementById("contact-form");
  
  // Open the modal with animation
  contactBtn.addEventListener("click", function () {
    modal.style.display = "block";
    
    // Prevent body scrolling when modal is open
    document.body.classList.add("no-scroll");
    
    // Trigger reflow to ensure transitions work
    void modal.offsetWidth;
    
    // Add show class for animation
    modal.classList.add("show");
  });
  
  // Close modal function
  function closeModal() {
    modal.classList.remove("show");
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      modal.style.display = "none";
      document.body.classList.remove("no-scroll");
    }, 300);
  }
  
  // Close the modal when clicking the close button
  closeBtn.addEventListener("click", closeModal);
  
  // Close the modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });
  
  // Form submission with validation
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    if (form.checkValidity()) {
      // Show success message
      const submitBtn = form.querySelector(".submit-btn");
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.backgroundColor = "#4CAF50";
      
      setTimeout(() => {
        closeModal();
        form.reset();
        
        // Reset button after modal closes
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = "";
        }, 300);
      }, 1500);
    } else {
      // Browser will handle showing validation messages
    }
  });
  
  // Add input focus effects
  const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
  
  formInputs.forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });
});