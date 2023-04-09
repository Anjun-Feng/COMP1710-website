const userName = document.getElementById("user_name");
const userEmail = document.getElementById("user_email");
const userSuggestion = document.getElementById("user_suggestion");

const nodemailer = require("nodemailer");

/* Pops up confirmation to the user */
function showConf() {
  if (confirm("Are you sure you want to submit this form?")) {
    return true;
  } else {
    return false;
  }
}

/* Clears the text area */
function clearTextBoxes() {
  // document.getElementById("name").value = "";
  // document.getElementById("email").value = "";
  document.getElementById("textarea").value = "";
}