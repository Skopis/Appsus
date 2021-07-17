import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const noteService = {
    query,
    addNote,
    remove,
    update,
    save,
    getEmptyNoteTxt,
    getEmptyNoteTodo,
    getEmptyNoteVideo,
    getEmptyNoteImg,
}

const NOTES_KEY = 'notes'
const notesDB = _createNotes();


function save(answer, cmpType) {
    var note = null;
    if (cmpType === 'note-video') {
        note = getEmptyNoteVideo();
        note.info.src = answer
    }
    else if (cmpType === 'note-img') {
        note = getEmptyNoteImg();
        note.info.src = answer
    }
    else if (cmpType === 'note-txt') {
        note = getEmptyNoteTxt();
        note.info.txt = answer
    }
    else {
        note = getEmptyNoteTodo();
        note.info.todos = answer //get array of txtObjs
    }
    notesDB.push(note)
    utilService.saveToStorage(NOTES_KEY, notesDB)
}

function addNote(noteToAdd) { // save, returns Promise
    return storageService.post(NOTES_KEY, noteToAdd)
}

function query() { //get all notes, returns Promise
    return storageService.query(NOTES_KEY)
}

function remove(noteId) { //delete note, returns Promise
    return storageService.remove(NOTES_KEY, noteId)
}

function update(updatedNote) {
    return storageService.put(NOTES_KEY, updatedNote)
}



// Empty notes:

function getEmptyNoteTxt() {
    return {
        id: utilService.makeId(),
        type: "note-txt",
        info: {
            txt: ''
        },
        style: {
            backgroundColor: "#99a2ff"
        },
        isPinned: true
    }
}

function getEmptyNoteTodo() {
    return {
        id: utilService.makeId(),
        type: "note-todo",
        info: {
            todos: [
                // { txt: "", doneAt: null, isChecked: false },
            ]
        },
        style: {
            backgroundColor: "#b99f7b"
        },
        isPinned: true
    }
}

function getEmptyNoteVideo() {
    return {
        id: utilService.makeId(),
        type: "note-video",
        info: {
            src: "",
            title: "my video"
        },
        style: {
            backgroundColor: "#b9ffb7"
        },
        isPinned: true
    }
}

function getEmptyNoteImg() {
    return {
        type: "note-img",
        info: {
            src: "",
            title: "my image"
        },
        style: {
            backgroundColor: "#c0c0c0"
        },
        isPinned: true
    }
}


function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: utilService.makeId(),
                type: "note-txt",
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "#b07eb4"
                },
                isPinned: false,
            },
            {
                id: utilService.makeId(),
                type: "note-todo",
                info: {
                    todos: [
                        { txt: "Do that", doneAt: null, isChecked: false },
                        { txt: "Do this", doneAt: null, isChecked: true }
                    ]
                },
                style: {
                    backgroundColor: "#6497b1"
                },
                isPinned: false
            },
            {
                id: utilService.makeId(),
                type: "note-img",
                info: {
                    src: "https://variety.com/wp-content/uploads/2019/06/spongebob-battle-remaster.png?w=681&h=383&crop=1",
                    title: "my image"
                },
                style: {
                    backgroundColor: "#ffd700"
                },
                isPinned: true
            },
            {
                id: utilService.makeId(),
                type: "note-video",
                info: {
                    src: "https://www.youtube.com/embed/watch?v=M-mRdZjfSHI",
                    title: "my video"
                },
                style: {
                    backgroundColor: "#f7347a"
                },
                isPinned: true
            },
            {
                id: utilService.makeId(),
                type: "note-img",
                info: {
                    src: "https://wpjoblist.com/wp-content/uploads/2019/07/Full-Stack-Developer.jpg",
                    title: "my image"
                },
                style: {
                    backgroundColor: "#6ae800"
                },
                isPinned: true
            },
            {
                id: utilService.makeId(),
                type: "note-video",
                info: {
                    src: "https://www.youtube.com/watch?v=YrxBCBibVo0&ab_channel=TheNetNinja",
                    title: "my video"
                },
                style: {
                    backgroundColor: "#fff47a"
                },
                isPinned: true
            },
            {
                id: utilService.makeId(),
                type: "note-txt",
                info: {
                    txt: "This is a wonderful note!"
                },
                style: {
                    backgroundColor: "#4e7be4"
                },
                isPinned: false,
            },
            {
                id: utilService.makeId(),
                type: "note-todo",
                info: {
                    todos: [
                        { txt: "Get a job", doneAt: null, isChecked: true },
                        { txt: "Buy a car", doneAt: null, isChecked: true },
                        { txt: "Drive to Canada", doneAt: null, isChecked: false }
                    ]
                },
                style: {
                    backgroundColor: "#98e5b1"
                },
                isPinned: false
            }
        ]
        utilService.saveToStorage(NOTES_KEY, notes)
    }
    return notes;
}