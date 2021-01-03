import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active: note } = useSelector(state => state.notes);

    const [ values, handleInputChange, reset] = useForm(note);

    const { title, body, url} = values;

    //Hacemos que se mantenga la referencia a la nota que se está mostrando
    const activeId = useRef( note.id );

    //Se lanza el efecto que actualiza la nota mostrada si esta es seleccionada
    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }
        
    }, [reset, note])

    

    return (
        <div className="note__main-content">
            <NotesAppBar/>
            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    autoFocus={true}
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value= {body}
                    onChange={handleInputChange}
                >

                </textarea>

                {
                    note.url &&
                    <div className="notes__image">
                    <img
                        //src="https://iso.500px.com/wp-content/uploads/2014/07/big-one.jpg"
                        src={url}
                        alt="imagen"
                    />
                </div>
                }
            </div>
        </div>
    )
}
