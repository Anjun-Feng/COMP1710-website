/**
 * Author: Anjun Feng
 * Date-created: 6/4/2023
 * Last-edited: 21/4/2023
 * Description:
 * Implements a search function for the website in the nav bar.
 */

// Defines a list to store the name and url of pages
const pages = [
    // url links not functioning!!
    { name: "home", url: "../index.html" },
    { name: "assignment", url: "../assignment.html" },
    { name: "dart", url: "/pages/dart.html" },
    { name: "feedback", url: "../pages/feedback.html" },
    { name: "sitemap", url: "../pages/sitemap.html" },
    { name: "sourcelog", url: "../pages/sourcelog.html" },
    { name: "begin dart", url: "../pages/addition/dart_subpgs/gallery_begin_darting.html" },
    { name: "fisrt flutter app", url: "../pages/addition/dart_subpgs/gallery_first_flutter_app.html" },
    { name: "flutter basics", url: "../pages/addition/dart_subpgs/gallery_flutter_basics.html" },
    { name: "network programming I", url: "../pages/addition/dart_subpgs/gallery_flutter_network_programming_pt1.html" },
    { name: "network programming II", url: "../pages/addition/dart_subpgs/gallery_flutter_network_programming_pt2.html" },
    { name: "set up flutter", url: "../pages/addition/dart_subpgs/gallery_set_up_flutter.html" },
    { name: "visual flutter I", url: "../pages/addition/dart_subpgs/gallery_visual_flutter_pt1.html" },
    { name: "visual flutter II", url: "../pages/addition/dart_subpgs/gallery_visual_flutter_pt2.html" },
    { name: "dart", url: "../pages/addition/dart_subpgs/gallery_begin_darting.html" },
];

/**
 * Initializes the Twitter API import
 */
window.twttr = (function(d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };
    return t;
}(document, "script", "twitter-wjs"));

/**
 *  Displays search results
 */
function showResults() {
    const results = document.getElementById("results");
    results.style.display = "block";
}

/**
 *  Searches
 */
function searchPages() {
    const searchInput = document.getElementById("search_input"); // Get input
    const results = document.getElementById("results"); // Get input
    const query = searchInput.value.toLowerCase(); // Get the text from the input bar, and convert it into lower case

    // Initialize the result list
    results.innerHTML = "";

    // Handle the case if user has not entered anything
    if (query === "") {
        const emptyItem = document.createElement("div");
        emptyItem.textContent = "Enter something to search with...";
        emptyItem.style.padding = "8px 2px";
        emptyItem.style.color = "#777777";
        emptyItem.style.textAlign = "left";
        results.appendChild(emptyItem);
        return;
    }
    // Traverse pages to find what pages to display
    pages.forEach((page) => {
        if (page.name.toLowerCase().includes(query)) {
            // Add the result
            const resultItem = document.createElement("a");
            resultItem.textContent = page.name;
            resultItem.href = page.url;
            results.appendChild(resultItem);
        }
    });
    // Handle the case if there's no result,
    if (results.childElementCount === 0) {
        const emptyItem = document.createElement("div");
        emptyItem.textContent = "No results"; // Show "No result" in the result bar
        emptyItem.style.padding = "8px 16px";
        emptyItem.style.color = "#777777";
        results.appendChild(emptyItem);
    }
}

// Hides the result section while clicking on anywhere else
document.addEventListener("click", function (event) {
    const searchContainer = document.getElementById("search_container");
    if (!searchContainer.contains(event.target)) {
        document.getElementById("results").style.display = "none";
    }
});