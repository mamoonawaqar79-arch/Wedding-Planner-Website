document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const eventDateInput = document.getElementById("eventDate");

    if (!contactForm || !formMessage || !eventDateInput) {
        console.error("Contact form elements not found!");
        return;
    }

    // Prevent past event dates
    const today = new Date().toISOString().split("T")[0];
    eventDateInput.setAttribute("min", today);

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const eventType = document.getElementById("eventType").value;
        const eventDate = eventDateInput.value;
        const message = document.getElementById("message").value.trim();

        // Name validation
        if (name.length < 3) {
            formMessage.style.color = "red";
            formMessage.textContent = "Name must contain at least 3 characters.";
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            formMessage.style.color = "red";
            formMessage.textContent = "Please enter a valid email address.";
            return;
        }

        // Phone validation
        const phoneDigits = phone.replace(/\D/g, "");

        if (phoneDigits.length < 10) {
            formMessage.style.color = "red";
            formMessage.textContent = "Please enter a valid phone number.";
            return;
        }

        // Event date validation
        if (!eventDate || eventDate < today) {
            formMessage.style.color = "red";
            formMessage.textContent = "Please select a valid future event date.";
            return;
        }

        // Message validation
        if (message.length < 10) {
            formMessage.style.color = "red";
            formMessage.textContent = "Message must contain at least 10 characters.";
            return;
        }

        // Success message
        formMessage.style.color = "green";

        formMessage.textContent =
            "Thank you " + name +
            "! Your " + eventType +
            " inquiry has been received.";

        // Clear form
        contactForm.reset();

    });

});