import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import './NoteNavList.css'


import '../wiremain.css'

export default function NoteNavList(props) {

  return (
    <div className="sidebar-list">
      <ul className="ul-list-style">
        {props.folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteNavList__folder-link'
              to={`/folder/${folder.id}`}
            >
              {folder.name}
              <span className='NoteNavList__num-notes'>
                {countNotesForFolder(props.notes, folder.id)}
              </span>
            </NavLink>
          </li>
        )}
      </ul>


      < div className='NoteNavList__button-wrapper' >
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteNavList__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
        </CircleButton>
      </div >

    </div >
  )
}


NoteNavList.defaultProps = {
  folders: []
}

  // * the native sidebar.

  // < div className='sidebar-add-folder' >
  //       <button>Add Folder..</button>
  //       <link 
  //       <a href="../wire404.html#section2">ll</a>
  //     </div >




        // <li className="sidebar-item">folder 1</li>
        // <li className="sidebar-item">folder 2</li>



//   < div className = 'NoteNavList' >
//     <ul className='NoteNavList__list'>
//       {props.folders.map(folder =>
//
// 
//         <li key={folder.id}>
//           <NavLink
//             className='NoteNavList__folder-link'
//             to={`/folder/${folder.id}`}
//           >
//             <span className='NoteNavList__num-notes'>
//               {countNotesForFolder(props.notes, folder.id)}
//             </span>
//             {folder.name}
//           </NavLink>
//         </li>
//       )}
//     </ul>
// {/* nav button here */ }
//     </div >




