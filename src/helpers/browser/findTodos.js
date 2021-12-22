
export const findTodos = (todos, wordToFind) => {
    return todos.filter( todo => todo.title.toLowerCase().includes(wordToFind.toLowerCase())
    || 
    todo.description.toLowerCase().includes(wordToFind.toLowerCase()));
}