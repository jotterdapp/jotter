import { useState } from 'react';

function Sidebar({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote, retrieveNote, connectWeb3 }) {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
    const [cid, setCid] = useState('');

    return <div className="app-sidebar">
        <div className="app-sidebar-header">
            <h1>JOTTER</h1>
            <div className="sidebar-buttons">
                <button onClick={onAddNote}>Add</button>
                <button onClick={() => retrieveNote(cid)}>Retrieve</button>
                <br></br>
                <button onClick={connectWeb3}>CONNECT WITH METAMASK</button>
            </div>
        </div>
        <div className='cid'>
                <input type='text' placeholder='Enter CID to Retrieve...' onChange={ (e) => setCid(e.target.value)}/>
        </div>
        <div className="app-sidebar-notes">
            {sortedNotes.map((note, i) => (
                <div className={`app-sidebar-note ${note.id === activeNote && "active"}`}
                onClick={() => setActiveNote(note.id)} key={i}
                >
                    <div className="sidebar-note-title">
                        <strong>{note.title}</strong>
                        <button onClick={() => onDeleteNote(note.id)}>Delete</button>
                    </div>
                    <p>{note.body && note.body.substr(0, 25) + "..."}</p>
                    <small className="note-meta">
                        Last modified {new Date(note.lastModified).toLocaleDateString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </small>
                </div>
            ))}
        </div>
    </div>
};

export default Sidebar;
