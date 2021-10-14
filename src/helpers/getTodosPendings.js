
export const getTodosPendings = (todos = []) => {
    return todos.filter (item => item.done === false && item.isEliminated === false);
    // return todos.filter( todo => todo.done === false);
}