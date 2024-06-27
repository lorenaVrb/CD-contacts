//Send email
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const status = document.getElementById("form-status");

    fetch("https://formspree.io/f/xeqywvqr", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          status.innerHTML = "Thank you for your message!";
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              status.innerHTML = data["errors"]
                .map((error) => error["message"])
                .join(", ");
            } else {
              status.innerHTML =
                "Oops! There was a problem submitting your form.";
            }
          });
        }
        setTimeout(() => {
          status.innerHTML = "";
        }, 5000);
      })
      .catch((error) => {
        status.innerHTML = "Oops! There was a problem submitting your form.";
      });
  });