const addBtn = document.querySelector('.submit-note');
const noteForm = document.querySelector('.note-form');
const displayArea = $('.side-bar');

function displayNote(note) {
    note.forEach(element => {
        displayArea.append(`
            <div class="card">
                <h4>${element.noteTitle}</h4>
                <p>${element.noteBody}</p>
            </div>
        `);
    });
}

function getNote() {
    $.get('http://localhost:3001/notes', data => {
        displayNote(data);
    });
}

function addNote() {
    const noteTitle = noteForm.querySelector('[name="note-title"]').value;
    const noteBody = noteForm.querySelector('[name="note-body"]').value;
    const noteObject = {noteTitle, noteBody};

    fetch('/add-note', {
        method: 'POST',
        body: JSON.stringify(noteObject),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => {
        console.log(res.json());
        return res.json();
    }).then(data => {
        console.log(data);
    });
}

getNote();

//addBtn.addEventListener('submit', addNote);