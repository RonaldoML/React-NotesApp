import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);

    const [values, handleInputChange, reset] = useForm(note);

    const { title, body, id } = values;

    //Hacemos que se mantenga la referencia a la nota que se está mostrando
    const activeId = useRef(note.id);

    //Se lanza el efecto que actualiza la nota mostrada si esta es seleccionada
    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }

    }, [reset, note])

    //Actualiza la nota activa
    useEffect(() => {

        dispatch(activeNote(values.id, { ...values }));

    }, [values, dispatch]);


    const handleDelete = () => {

        dispatch(startDeleting(id));
    }

    return (
        <div className="note__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    autoFocus={true}
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                >

                </textarea>

                {
                    note.url &&
                    <div className="notes__image">
                        <img
                            src={note.url}
                            alt="imagen"
                        />
                    </div>
                }
            </div>

            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
                </button>

        </div>
    )
}
