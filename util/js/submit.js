/**
 * Author: Anjun Feng
 * Date-created: 6/4/2023
 * Last-edited: 20/4/2023
 * Description:
 * Implements a submit function for the feedback form.
 */

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("emailForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form being submitted by default
    showConf();
  });
});


/**
 * Sends an email to the recipient by getting info from the form in `feedback.html`
 */
function showConf() {
  if (confirm("Are you sure you want to submit this form?")) {
    // Get values from the form
    var recipient = "u7277205@anu.edu.au";
    var userName = document.getElementById("user_name").value;
    // var subject = encodeURIComponent(document.getElementById("subject").value);
    var body = document.getElementById("user_suggestion").value;

    // Construct the mailto link; wakes up the mail client
    window.location.href = "mailto:" + recipient +
        "?subject=" + encodeURIComponent("COMP1710 Feedback From " + userName) +
        "&body=" + encodeURIComponent("Hi Anjun,\n\n" + "This is " + userName + ".\n" + body) +
        "&charset=utf-8";
  }
}

/**
 *  A wrap-up function for clearing the text area
 */
function clearTextBoxes() {
  document.getElementById("textarea").value = "";
}