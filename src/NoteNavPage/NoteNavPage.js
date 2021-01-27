import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NoteNavPage.css'
import '../wirenotepage.css'

export default function NoteNavPage(props) {

  // debugger
  return (

    < div className='NoteNavPage' >
      <CircleButton
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NoteNavPage__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>

      {/* routeNum={3} {...routeProps} folder={folder} />; */}

      {
        props.folder && (
          <h3 className='NoteNavPage__folder-name'>
            {props.folder.name}

          </h3>
        )
      }

    </div >

  )
}

NoteNavPage.defaultProps = {
  history: {
    goBack: () => { }
  }
}



//   < div class="sidebar-list" >
//     <ul class="ul-list-style">
//       <li class="sidebar-item">folder 1</li>
//       <li class="sidebar-item">folder 2</li>
//       <div class='sidebar-add-folder-`n'>
//         <a href="./wire404.html#section2">ll</a>
//         <button>Add Folder..</button>
//       </div>
//     </ul>
// </div >
