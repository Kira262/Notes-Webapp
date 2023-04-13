// Live Date Thing

function updateDate() {
  var d = new Date();
  var options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  var formattedDate = d.toLocaleString("en-US", options);
  document.querySelector("#date").textContent = formattedDate;
}

updateDate();

setInterval(updateDate, 500);

// Notes Functioning thing

window.onload = function () {
  createNotesApp();
};

function createNotesApp() {
  const noteInput = document.getElementById("note-input");
  const addNoteButton = document.getElementById("add-note");
  const notesList = document.getElementById("notes-list");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  function addNote() {
    const note = noteInput.value.trim();
    if (note) {
      notes.push(note);
      updateNotesList();
      noteInput.value = "";
      saveNotesToLocalStorage();
    }
  }

  function updateNotesList() {
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
      const li = document.createElement("li");
      li.innerHTML = `Note-${
        index + 1
      }:<br> <span class="note-text">${note}</span><br><br>`;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("btn", "btn-outline-danger", "btn-sm", "ms-2");
      deleteButton.addEventListener("click", () => {
        deleteNoteAtIndex(index);
      });
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("btn", "btn-outline-warning", "btn-sm", "ms-2");
      editButton.addEventListener("click", () => {
        editNoteAtIndex(index);
      });
      li.appendChild(deleteButton);
      li.appendChild(editButton);
      notesList.appendChild(li);
      notesList.appendChild(document.createElement("br"));
    });
  }

  function deleteNoteAtIndex(index) {
    notes.splice(index, 1);
    updateNotesList();
    saveNotesToLocalStorage();
  }

  function editNoteAtIndex(index) {
    const noteText = notesList.querySelectorAll(".note-text")[index];
    const noteInput = document.createElement("input");
    noteInput.type = "text";
    noteInput.value = noteText.textContent;
    noteInput.classList.add("note-input");
    noteText.replaceWith(noteInput);
    noteInput.focus();
    noteInput.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        const newNote = noteInput.value.trim();
        notes[index] = newNote;
        updateNotesList();
        saveNotesToLocalStorage();
      }
    });
  }

  function saveNotesToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  addNoteButton.addEventListener("click", function () {
    console.log("Add Note button clicked!");
    addNote();
  });

  noteInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      addNote();
    }
  });

  updateNotesList();
}

// Preloader Thingy
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});

// Weather App Thingy

require("dotenv").config();

const form = document.querySelector("form");
const input = document.querySelector("input");
const weatherDiv = document.getElementById("weather");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = input.value.trim();

  // Make API call
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Update the HTML with the weather information
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      weatherDiv.innerHTML = `Temperature: ${temperature}&deg;C<br> Description: ${description}`;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      weatherDiv.innerHTML = "Unable to get weather information.";
    });
});
