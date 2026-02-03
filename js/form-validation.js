document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const reservationForm = document.getElementById("reservationForm");

  // Form validation function
  function validateForm(form, fields) {
    let isValid = true;

    fields.forEach((field) => {
      const element = form.querySelector(field.selector);
      const errorElement = form.querySelector(field.errorSelector);

      if (!element) return;

      let errorMessage = "";

      // Check if required field is empty
      if (field.required && !element.value.trim()) {
        errorMessage = field.requiredMessage || "This field is required";
      }
      // Email validation
      else if (field.type === "email" && element.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(element.value.trim())) {
          errorMessage = "Please enter a valid email address";
        }
      }
      // Phone validation
      else if (field.type === "tel" && element.value.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(element.value.replace(/[\s\-\(\)]/g, ""))) {
          errorMessage = "Please enter a valid phone number";
        }
      }

      // Show/hide error message
      if (errorMessage) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = "block";
        element.style.borderColor = "#dc3545";
        isValid = false;
      } else {
        errorElement.style.display = "none";
        element.style.borderColor = "#ddd";
      }
    });

    return isValid;
  }

  // Contact form validation
  if (contactForm) {
    const contactFields = [
      {
        selector: "#name",
        errorSelector: "#nameError",
        required: true,
        requiredMessage: "Please enter your name",
      },
      {
        selector: "#email",
        errorSelector: "#emailError",
        type: "email",
        required: true,
        requiredMessage: "Please enter your email",
      },
      {
        selector: "#phone",
        errorSelector: "#phoneError",
        type: "tel",
      },
      {
        selector: "#message",
        errorSelector: "#messageError",
        required: true,
        requiredMessage: "Please enter your message",
      },
    ];

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateForm(contactForm, contactFields)) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
          // Create success message
          const successMessage = document.createElement("div");
          successMessage.className = "success-message";
          successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        Thank you! Your message has been sent successfully. We'll get back to you soon.
                    `;

          // Insert after form
          contactForm.parentNode.insertBefore(
            successMessage,
            contactForm.nextSibling,
          );

          // Reset form
          contactForm.reset();

          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;

          // Show success message
          successMessage.style.display = "block";

          // Scroll to success message
          successMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });

          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.style.display = "none";
          }, 5000);
        }, 1500);
      }
    });
  }

  // Reservation form validation
  if (reservationForm) {
    const reservationFields = [
      {
        selector: "#res-date",
        errorSelector: "#dateError",
        required: true,
        requiredMessage: "Please select a date",
      },
      {
        selector: "#res-time",
        errorSelector: "#timeError",
        required: true,
        requiredMessage: "Please select a time",
      },
      {
        selector: "#guests",
        errorSelector: "#guestsError",
        required: true,
        requiredMessage: "Please select number of guests",
      },
    ];

    reservationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateForm(reservationForm, reservationFields)) {
        // Show loading state
        const submitBtn = reservationForm.querySelector(
          'button[type="submit"]',
        );
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Booking...';
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(reservationForm);
        const reservationData = {
          date: formData.get("date"),
          time: formData.get("time"),
          guests: formData.get("guests"),
        };

        // Simulate booking process
        setTimeout(() => {
          // Create success message
          const successMessage = document.createElement("div");
          successMessage.className = "success-message";
          successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        Table booked successfully! Confirmation has been sent to your email.
                        <br><small>Date: ${reservationData.date} | Time: ${reservationData.time} | Guests: ${reservationData.guests}</small>
                    `;

          // Insert after form
          reservationForm.parentNode.insertBefore(
            successMessage,
            reservationForm.nextSibling,
          );

          // Reset form
          reservationForm.reset();

          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;

          // Show success message
          successMessage.style.display = "block";

          // Scroll to success message
          successMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });

          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.style.display = "none";
          }, 5000);
        }, 1500);
      }
    });
  }

  // Real-time validation
  document.querySelectorAll("input, textarea, select").forEach((element) => {
    element.addEventListener("blur", function () {
      const form = this.closest("form");
      if (!form) return;

      if (form.id === "contactForm") {
        validateForm(form, contactFields || []);
      } else if (form.id === "reservationForm") {
        validateForm(form, reservationFields || []);
      }
    });
  });
});
