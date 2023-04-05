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