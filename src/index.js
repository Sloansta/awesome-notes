const addBtn = document.querySelector('.submit-note');
const noteForm = document.querySelector('.note-form');


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

//addBtn.addEventListener('submit', addNote);