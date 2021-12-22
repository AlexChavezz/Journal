
export const findNotes = (notes = [], wordToFind) => {
    return notes.filter( note => note.note.toLowerCase().includes(wordToFind.toLowerCase()));
}