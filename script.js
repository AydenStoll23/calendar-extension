const calendar = document.getElementById("calendar");
const noteModal = document.getElementById("note-modal");
const noteText = document.getElementById("note-text");
const saveNoteBtn = document.getElementById("save-note");
const closeModalBtn = document.getElementById("close-modal");
let selectedDate = "";

function renderCalendar() {
    calendar.innerHTML = "";

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // month name
    const monthNameDiv = document.createElement("div");
    monthNameDiv.className = "month-name";
    monthNameDiv.textContent = `${monthNames[month]} ${year}`;
    calendar.appendChild(monthNameDiv);

    // week day letters
    const weekDaysDiv = document.createElement("div");
    weekDaysDiv.className = "week-days";
    ["S", "M", "T", "W", "T", "F", "S"].forEach(letter => {
        const dayLetter = document.createElement("div");
        dayLetter.className = "day-letter";
        dayLetter.textContent = letter;
        weekDaysDiv.appendChild(dayLetter);
    });
    calendar.appendChild(weekDaysDiv);

    // days grid
    const daysGrid = document.createElement("div");
    daysGrid.className = "days-grid";

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        daysGrid.appendChild(empty);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement("div");
        day.className = "day";
        day.textContent = i;

        // YYYY-MM-DD
        const monthPadded = String(month + 1).padStart(2, "0");
        const dayPadded = String(i).padStart(2, "0");
        const dateKey = `${year}-${monthPadded}-${dayPadded}`;

        // days with notes
        if (localStorage.getItem(dateKey)) {
            day.classList.add("has-note");
        }

        day.addEventListener("click", () => {
            selectedDate = dateKey;
            noteText.value = localStorage.getItem(dateKey) || "";
            noteModal.classList.remove("hidden");
            noteText.focus();
        });

        daysGrid.appendChild(day);
    }

    calendar.appendChild(daysGrid);
}

// save note button
saveNoteBtn.addEventListener("click", () => {
    if (noteText.value.trim()) {
        localStorage.setItem(selectedDate, noteText.value.trim());
    } else {
        localStorage.removeItem(selectedDate);
    }
    noteModal.classList.add("hidden");
    renderCalendar();
});

// cancel button
closeModalBtn.addEventListener("click", () => {
    noteModal.classList.add("hidden");
});

renderCalendar();

const deleteNoteBtn = document.getElementById("delete-note");

deleteNoteBtn.addEventListener("click", () => {
    if (selectedDate) {
        localStorage.removeItem(selectedDate);
        noteModal.classList.add("hidden");
        renderCalendar();
    }
});