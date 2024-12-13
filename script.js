const saveButton = document.getElementById("save-letter");
const letterInput = document.getElementById("letter-input");
const lettersList = document.getElementById("letters-list");

// Predefined messages
const predefinedMessages = [
    "I am a bit slow to warm up, so it takes time for me to feel comfortable and chat more.",
    "The first half of next year will be busy for me, I don’t want to make promises too quickly because I take responsibility very seriously >.<",
    "I still want to spend more time with you though. If you are willing to wait and see how things go, I would be happy to continue getting to know you.",
    "If you decide to give up, that’s on me, so don’t worry ><><",
    "You won’t lose me, I’d be the one losing you"
];

// Load letters from Local Storage on page load
window.onload = () => {
    const savedLetters = JSON.parse(localStorage.getItem("letters")) || [];
    const allLetters = [...predefinedMessages, ...savedLetters];  // Combine predefined and saved letters
    allLetters.forEach(addLetter);
};

// Function to add a letter to the list
function addLetter(letterContent, isPredefined = false) {
    const listItem = document.createElement("li");
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    listItem.textContent = letterContent;
    if (isPredefined) {
        listItem.classList.add("predefined");  // Add a specific class for predefined messages
    }
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
    const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-game-coin-win-1935.mp3");
    audio.play().catch(error => {
        console.error("Sound playback failed:", error);
    });
}
