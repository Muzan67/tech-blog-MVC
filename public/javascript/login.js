//use in conjunction with views/login.handlebars

//async/await acts as "syntactic sugar", helps make promises more readable.
async function signupFormHandler(event) {
  event.preventDefault();

  //login information that we receive and placed in server
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    //await can assign the result of promise to a variable.  this way, dont need to use catch() or then() to tell the code what to do after the Promise completes
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    //.then((response) => { this is not needed anymore bescuase we using async/await
    //if response is successful, otherwise we will be alerted with the error
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

//login used conjunction with login.handlebars
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      //automatically redirect user to the dashboard after they successfully log in
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

//listen for the submit event from the form
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
