import React from 'react';
import moment from 'moment';
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';

export const JournalEntry = ({ id, title, body, date, url }) => {

    const dispatch = useDispatch()

    const noteDate = moment(date);

    const handleEntryClick = () => {
        dispatch(activeNote(id, { title, body, date, url }));
    }

    return (
        <div
            className="journal__entry pointer animate__animated animate__fadeInLeft"
            onClick={handleEntryClick}
        >
            {
                url &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                >
                </div>
            }



            <div
                className="journal__entry-body"
            >
                <p className="journal__entry-title"> {title}</p>
                <p className="journal__entry-content">{body}</p>
            </div>
            <div className="journal__entry-date-box">
                <span> {noteDate.format('dddd')} </span>
                <h4>{noteDate.format('D')}</h4>
            </div>
        </div>
    )
}
