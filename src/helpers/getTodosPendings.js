
export const getTodosPendings = (todos = []) => {
    return todos.filter(todo => todo.done !== true )
}