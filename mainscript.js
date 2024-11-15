// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    // Validation for number inputs
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener("input", () => {
            if (input.value < 0) {
                alert("Please enter a positive number.");
                input.value = ""; // Reset invalid input
            }
        });
    });

    // Dynamic feedback for BP input
    const bpInput = document.getElementById("bp");
    bpInput.addEventListener("blur", () => {
        const value = bpInput.value;
        if (!/^\d{2,3}\/\d{2,3}$/.test(value)) {
            alert("Please enter Blood Pressure in the format: 120/80.");
            bpInput.value = ""; // Reset invalid input
        }
    });

    // Real-time character counter for text areas
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach(textarea => {
        const counter = document.createElement("div");
        counter.className = "char-counter";
        counter.style.textAlign = "right";
        counter.style.fontSize = "12px";
        textarea.parentNode.appendChild(counter);

        textarea.addEventListener("input", () => {
            const maxLength = 300; // Example limit
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `Characters left: ${remaining}`;
            if (remaining < 0) {
                counter.style.color = "red";
            } else {
                counter.style.color = "black";
            }
        });
    });

    // Add confirmation before submission
    form.addEventListener("submit", event => {
        const confirmation = confirm("Are you sure you want to submit the form?");
        if (!confirmation) {
            event.preventDefault();
        }
    });

    // Dynamic region suggestion
    const regionInput = document.getElementById("region");
    const regionSuggestions = ["North", "South", "East", "West"];
    const suggestionBox = document.createElement("div");
    suggestionBox.className = "suggestion-box";
    suggestionBox.style.position = "absolute";
    suggestionBox.style.background = "#fff";
    suggestionBox.style.border = "1px solid #ddd";
    suggestionBox.style.display = "none";
    suggestionBox.style.zIndex = "10";
    regionInput.parentNode.appendChild(suggestionBox);

    regionInput.addEventListener("input", () => {
        const value = regionInput.value.toLowerCase();
        const matches = regionSuggestions.filter(region =>
            region.toLowerCase().startsWith(value)
        );
        suggestionBox.innerHTML = matches
            .map(match => `<div class="suggestion">${match}</div>`)
            .join("");
        suggestionBox.style.display = matches.length ? "block" : "none";

        document.querySelectorAll(".suggestion").forEach(item => {
            item.addEventListener("click", () => {
                regionInput.value = item.textContent;
                suggestionBox.style.display = "none";
            });
        });
    });

    // Hide suggestion box on click outside
    document.addEventListener("click", event => {
        if (!regionInput.contains(event.target)) {
            suggestionBox.style.display = "none";
        }
    });
});
