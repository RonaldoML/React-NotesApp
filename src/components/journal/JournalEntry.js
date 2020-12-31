import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://estutoriales.com/wp-content/uploads/2019/11/como-hacer-una-imagen-hd-en-photoshop.jpg)'
                }}
            >

            </div>

            <div
                className="journal__entry-body"
            >
                <p className="journal__entry-title">Nuevo día</p>
                <p className="journal__entry-content">lorem ipsum kasdfjknasdfnajdnfajknd knasdkfjakjdfan a sfjasdfj</p>
            </div>
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>12</h4>
            </div>
        </div>
    )
}
