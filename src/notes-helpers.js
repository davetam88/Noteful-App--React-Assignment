export const findFolder = (folders = [], folderId) => {
    return (
        folders.find(folder => folder.id === folderId)
    )
}

export const findNote = (notes = [], noteId) => {
    return (
        notes.find(note => note.id === noteId)
    )
}


// 2 params notes and foolder id flag , return folder id i foolder id reutnr notes if not 
export const getNotesForFolder = (notes = [], folderId) => {
    return (
        (!folderId)
            // no folder return notes
            ? notes
            // has fodlerid, return the notes that machtes the folderid
            : notes.filter(note => note.folderId === folderId)
    )
}

export const countNotesForFolder = (notes = [], folderId) => {
    return (
        notes.filter(note => note.folderId === folderId).length
    )
}
