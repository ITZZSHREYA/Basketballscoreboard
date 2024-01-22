// Select DOM elements
const scoreElements = {
  home: document.querySelector(".team.home .score"),
  guest: document.querySelector(".team.guest .score"),
};
const pointButtons = document.querySelectorAll(".point-button");
const timerElement = document.querySelector(".timer .time");
const controlButtons = document.querySelectorAll(".control-button");
const darkModeButton = document.querySelector(".dark-mode-button");

// Initial timer value
let timerValue = 12 * 60; // assuming 12 minutes per quarter

// Timer functionality
let timerInterval = null;

// Function to play buzzer sound
function playBuzzer() {
  // You can replace 'buzzer.mp3' with the path to your buzzer sound file
  const buzzerAudio = new Audio('buzzer.wav');
  buzzerAudio.play();
}

// Function to update timer display
function updateTimerDisplay() {
  let minutes = Math.floor(timerValue / 60);
  let seconds = timerValue % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Function to start the timer
function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      if (timerValue === 0) {
        clearInterval(timerInterval);
        playBuzzer(); // Play the buzzer sound
        alert("Buzzer!"); // replace with custom message or remove if not needed
      } else {
        timerValue--;
        updateTimerDisplay();
      }
    }, 1000);
  }
}

// Event listeners for point buttons
pointButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const pointsToAdd = parseInt(button.dataset.value);
    const team = button.closest(".team").classList.contains("home") ? "home" : "guest";
    scoreElements[team].textContent = parseInt(scoreElements[team].textContent) + pointsToAdd;
  });
});

// Event listeners for timer controls
controlButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "start":
        startTimer();
        break;
      case "stop":
        clearInterval(timerInterval);
        timerInterval = null; // Reset the timer interval
        break;
      case "pause":
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null; // Reset the timer interval
        } else {
          startTimer();
        }
        break;
      case "reset":
        timerValue = 12 * 60;
        updateTimerDisplay();
        clearInterval(timerInterval);
        timerInterval = null; // Reset the timer interval
        break;
    }
  });
});

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Initial timer setup
updateTimerDisplay();

// Reset points function
function resetPoints(team) {
  scoreElements[team].textContent = 0;
}

// ... (your existing JavaScript code) ...

// Function to update team name
function updateTeamName(team) {
  const teamNameInput = document.getElementById(`${team}-team-input`);
  const teamNameElement = document.getElementById(`${team}-team-name`);

  const newTeamName = teamNameInput.value;
  teamNameElement.textContent = newTeamName;
  teamNameInput.value = ''; // Clear the input field
}

// ... (your existing JavaScript code) ...
