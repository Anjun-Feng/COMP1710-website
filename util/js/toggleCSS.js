function toggleCSS() {
    var style1 = document.getElementById("default");
    var style2 = document.getElementById("alternative");

    if (style1.disabled) {
        style1.disabled = false;
        style2.disabled = true;
    } else {
        style1.disabled = true;
        style2.disabled = false;
    }
}