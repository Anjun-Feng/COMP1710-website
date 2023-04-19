// Define a list to store the name and url of pages
const pages = [
    { name: "page1", url: "page1.html" },
    { name: "page2", url: "page2.html" },
    { name: "page3", url: "page3.html" },
    { name: "page4", url: "page4.html" },
    { name: "page5", url: "page5.html" }
];

/**
 *  Shows results
 */
function showResults() {
    const results = document.getElementById("results");
    results.style.display = "block";
}

/**
 *  Searches and displays pages
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

// Hide the result bar while clicking on anywhere else
document.addEventListener("click", function (event) {
    const searchContainer = document.getElementById("search_container");
    if (!searchContainer.contains(event.target)) {
        document.getElementById("results").style.display = "none";
    }
});