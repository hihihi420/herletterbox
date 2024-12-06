const saveButton = document.getElementById("save-letter");
const letterInput = document.getElementById("letter-input");
const lettersList = document.getElementById("letters-list");

// Load letters from Local Storage on page load
window.onload = () => {
    const savedLetters = JSON.parse(localStorage.getItem("letters")) || [];
    savedLetters.forEach(addLetter);
};

// Function to add a letter to the list
function addLetter(letterContent) {
    const listItem = document.createElement("li");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    listItem.textContent = letterContent;
    listItem.appendChild(editButton);

    editButton.addEventListener("click", () => {
        letterInput.value = listItem.firstChild.textContent;
        listItem.remove();
        saveLettersToLocalStorage();
    });

    lettersList.appendChild(listItem);
}

// Save letters to Local Storage
function saveLettersToLocalStorage() {
    const letters = Array.from(lettersList.children).map(li => li.firstChild.textContent);
    localStorage.setItem("letters", JSON.stringify(letters));
}

// Save button event listener
saveButton.addEventListener("click", () => {
    const letterContent = letterInput.value.trim();

    if (letterContent) {
        addLetter(letterContent);
        saveLettersToLocalStorage();
        letterInput.value = "";
        playSound();
    } else {
        alert("Please write something before saving.");
    }
});

// Play coin sound
function playSound() {
    const audio = new Audio("https://example.com/coin-sound.mp3"); // Replace with actual sound URL
    audio.play();
}
