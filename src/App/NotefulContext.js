import React from 'react'

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  // addBookmark: () => { },
  deleteNote: () => { },
})

export default NotefulContext

