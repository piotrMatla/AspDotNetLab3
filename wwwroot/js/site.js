document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        let valid = true;

        // Deleting previous error messages
        const errorMessages = form.querySelectorAll(".error-message");
        errorMessages.forEach(msg => msg.remove());

        const fieldsToValidate = [
            { name: "FirstName", required: true, minLength: 2 },
            { name: "LastName", required: true, minLength: 2 },
            { name: "Email", required: true },
            { name: "Password", required: true },
            { name: "PasswordConfirmation", required: true },
            { name: "MobileNumber", required: false },
            { name: "Age", required: true },
            { name: "City", required: true }
        ];

        fieldsToValidate.forEach(field => {
            const input = form.querySelector(`[name='${field.name}']`);
            if (field.required && !input.value.trim()) {
                valid = false;
                input.classList.add("is-invalid");
                showErrorMessage(input, "is required.");
            } else if (field.minLength && input.value.trim().length < field.minLength) {
                valid = false;
                input.classList.add("is-invalid");
                showErrorMessage(input, `must be at least ${field.minLength} characters long.`);
            } else {
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
            }
        });

        // Password verification
        const password = form.querySelector("[name='Password']").value;
        const passwordConfirmation = form.querySelector("[name='PasswordConfirmation']").value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(password)) {
            valid = false;
            const passwordField = form.querySelector("[name='Password']");
            passwordField.classList.add("is-invalid");
            showErrorMessage(passwordField, "must contain at least one uppercase letter, one lowercase letter, and one digit, and be at least 8 characters long.");
        } else {
            const passwordField = form.querySelector("[name='Password']");
            passwordField.classList.remove("is-invalid");
            passwordField.classList.add("is-valid");
        }

        // Checking the compatibility of passwords
        if (password !== passwordConfirmation) {
            valid = false;
            const confirmField = form.querySelector("[name='PasswordConfirmation']");
            confirmField.classList.add("is-invalid");
            showErrorMessage(confirmField, "do not match.");
        }

        // Phone number verification
        const mobileNumber = form.querySelector("[name='MobileNumber']").value;
        const phoneRegex = /^\d{9}$/;
        if (mobileNumber && !phoneRegex.test(mobileNumber)) {
            valid = false;
            const mobileField = form.querySelector("[name='MobileNumber']");
            mobileField.classList.add("is-invalid");
            showErrorMessage(mobileField, "must be a valid 9-digit number.");
        }

        // Age verification
        const age = form.querySelector("[name='Age']").value;
        if (age < 10 || age > 80) {
            valid = false;
            const ageField = form.querySelector("[name='Age']");
            ageField.classList.add("is-invalid");
            showErrorMessage(ageField, "must be between 10 and 80 years.");
        }

        // If any of the conditions are not met, block the form from being sent
        if (!valid) {
            event.preventDefault();
        }
    });

    function formatFieldName(fieldName) {
        const words = fieldName.split(/(?=[A-Z])/); // Divide the name into parts before each uppercase letter
        return words
            .map((word, index) => index === 0 ? word : word.charAt(0).toLowerCase() + word.slice(1)) // Make first letter of second word lowercase
            .join(' ') // Join the parts with spaces
            .trim();
    }

    function showErrorMessage(input, message) {
        const fieldName = formatFieldName(input.name);
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message", "text-danger", "mt-1");
        errorMessage.innerText = `${fieldName} ${message}`;
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }
});
