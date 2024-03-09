let notes = [];

function saveToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadFromLocalStorage() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
    }
}

function renderNotes() {
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${note}</span>
            <button onclick="editNote(${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        li.style.gap = "2%";
        noteList.appendChild(li);
    });

    saveToLocalStorage();
}

function addNote() {
    const noteInput = document.getElementById("noteInput");
    const newNote = noteInput.value.trim();

    if (newNote !== "") {
        notes.push(newNote);
        noteInput.value = "";
        renderNotes();
    }
}

function editNote(index) {
    const updatedNote = prompt("Edit the note:", notes[index]);
    if (updatedNote !== null) {
        notes[index] = updatedNote.trim();
        renderNotes();
    }
}

function deleteNote(index) {
    if (confirm("Are you sure you want to delete this note?")) {
        notes.splice(index, 1);
        renderNotes();
    }
}

loadFromLocalStorage();
renderNotes();
