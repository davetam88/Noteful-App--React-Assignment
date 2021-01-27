import React from 'react'
import Note from '../Note/Note'
import NotefulContext from '../App/NotefulContext';
import { findNote } from '../notes-helpers'
import './NoteMainPage.css'


// export default function NoteMainPage(props) {
export default class NoteMainPage extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }


  // return(
  render() {

    const { notes = [] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }


    return (
      <section className='NoteMainPage' >
        <Note
          // id={props.note.id}
          // name={props.note.name}
          // modified={props.note.modified}

          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />

        <div className='NoteMainPage__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

// NoteMainPage.defaultProps = {
//   note: {
//     content: '',
//   }
// }
