const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        const urlPattern = /(https?:\/\/[^\s]+)/i; // Regex to match a URL

        // Check if the input contains a URL
        if (urlPattern.test(inputBox.value)) {
            const parts = inputBox.value.split(urlPattern); // Split input by the URL
            parts.forEach(part => {
                if (urlPattern.test(part)) {
                    let link = document.createElement("a");
                    link.href = part;
                    link.target = "_blank"; // Open in a new tab
                    
                    // Use a custom text for the link like "Click here..."
                    const url = new URL(part); // Create a URL object to get domain
                    const linkText = `${url.hostname}${url.pathname}...`; // Truncate the URL to the domain with an ellipsis
                    link.textContent = linkText;

                    li.appendChild(link);
                } else {
                    li.appendChild(document.createTextNode(part)); // Add plain text
                }
            });
        } else {
            li.textContent = inputBox.value; // Plain text if no URL found
        }

        listContainer.appendChild(li);

        // Add close button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); // Toggle checked only if the `LI` is clicked
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // Remove task
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
