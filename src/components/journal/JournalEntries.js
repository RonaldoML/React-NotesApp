import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';
import { NothingSelected } from './NothingSelected';

export const JournalEntries = () => {

    let { notes } = useSelector(state => state.notes);

    return (


        (notes.length !== 0)
            ? (
                <div className="journal__entries">
                    {
                        notes.map(note => (
                            <JournalEntry
                                key={note.id}
                                {...note}
                            />
                        ))
                    }
                </div>
            )
            : (
                <NothingSelected />
            )




    )
}
