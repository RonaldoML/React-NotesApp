import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {
    //getState nos provee el state de redux
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

        dispatch(activeNote(doc.id, newNote));

        //Agrega la nueva nota al arregloy lo muestra en el sidebar en tiempo real
        dispatch(addNewNote(doc.id, newNote));
    }
}

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const activeNote = (id, note) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }

});

export const startLodingNotes = (uid) => {
    return async (dispatch) => {

        //carga de las notas desde firestore
        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));

    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNotes = (note) => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        try {
            await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }

        dispatch(refreshNote(note.id, noteToFirestore));

        Swal.fire('Saved', note.title, 'success');

    }
}

export const refreshNote = (id, note) => ({

    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }

})

export const startUploading = (file) => {
    return async (dispatch, getState) => {

        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            showCloseButton: false,
            showCancelButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload(file);

        activeNote.url = fileUrl;

        dispatch(startSaveNotes(activeNote));

        Swal.close();

    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;

        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));

    }
}

export const deleteNote = (id) => ({

    type: types.notesDelete,
    payload: id

})

export const noteLoggout = () => ({
    type: types.notesLogeoutCleaning
})