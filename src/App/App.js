import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import NoteNavList from '../NoteNavList/NoteNavList';
import NoteNavPage from '../NoteNavPage/NoteNavPage';
import NoteMainList from '../NoteMainList/NoteMainList';
import NoteMainPage from '../NoteMainPage/NoteMainPage';
import NotefulContext from './NotefulContext';
import config from './config';
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import './App.css';
import '../wiremain.css';

class App extends Component {
    state = {
        folders: [],
        notes: [],
    };

    addNote = note => {
        //     console.log(`before this.state.Notes :>> `, this.state.Notes); // dbg.
        this.setState({
            notes: [...this.state.notes, note],
        })
    }

    deleteNote = NoteId => {
        const newNotes = this.state.notes.filter(NoteObj =>
            NoteObj.id !== NoteId
        )
        this.setState({
            notes: newNotes
        })
    }

    componentDidMount() {

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                // 'Authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok)
                    throw new Error(res.status)
                return res.json()
            })
            .then(folders => {
                this.setState({ folders });
            })
            .catch(error => this.setState({ error }))


        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                // 'Authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if (!res.ok)
                    throw new Error(res.status)
                return res.json()
            })
            .then(notes => {
                this.setState({ notes });
            })
            .catch(error => this.setState({ error }))

    }


    // setup nav area routes
    renderNavRoutes() {
        const { notes, folders } = this.state;


        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    < Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteNavList
                                routeNum={"1 or 2"}
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))
                }

                {/* *** ROUTE 3 *** */}

                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const { noteId } = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NoteNavPage routeNum={3} {...routeProps} folder={folder} />;
                    }}
                />
                {/* *** ROUTE 4 *** */}

                <Route path="/add-folder" component={NoteNavPage} />

                {/* *** ROUTE 5 *** */}
                <Route path="/add-note" component={NoteNavPage} />
            </>
        );
    }


    // show <NoteMainList and <NoteMainPage depending on route
    // render this when clikc refresh and
    renderMainRoutes() {

        // const { notes, folders } = this.state;
        const { notes } = this.state;


        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const { folderId } = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteMainList
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}

                <Route path="/note/:noteId" component={NoteMainPage} />
                {/* <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const { noteId } = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NoteMainPage {...routeProps} note={note} />;
                    }}
                /> */}
            </>
        );
    }

    render() {


        const contextValue = {
            addNote: this.addNote,
            deleteNote: this.deleteNote,
        }
        return (
            <div className="App">
                <NotefulContext.Provider value={contextValue}>
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    {/* <header className="App__header"> */}
                    <header className="header-container">
                        <div className="App-title">
                            <Link to="/">Noteful</Link>
                        </div>
                        <div className="status">
                        </div>

                    </header>

                    <main className="App__main">{this.renderMainRoutes()}</main>
                </NotefulContext.Provider>
            </div>


        );
    }
}


export default App;


// old header
// <h1>
//     <FontAwesomeIcon icon="check-double" />
//     {' '}
//     <Link to="/">Noteful</Link>{' '}
//     <FontAwesomeIcon icon="check-double" />
// </h1>
