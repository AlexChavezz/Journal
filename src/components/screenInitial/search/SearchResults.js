import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { findNotes } from '../../../helpers/browser/findNotes';
import { findTodos } from '../../../helpers/browser/findTodos';
import { Rendertodo } from '../recycleScreen/todosRecycle/Rendertodo';
import emptyData from '../../../pictures/undraw_no_data_re_kwbl.svg';

export const SearchResults = ({ keyWord }) => {

    const { state: todos } = useSelector(state => state.todos);
    const [todosFinded, setTodosFinded] = useState([]);
    const { state: notes } = useSelector(state => state.notes)
    const [notesFinded, setNotesFinded] = useState([]);

    useEffect(() => {
        const todosFinded = findTodos(todos, keyWord);
        setTodosFinded(todosFinded);
        const notesFinded = findNotes(notes, keyWord)
        setNotesFinded(notesFinded);
    }, [keyWord, todos, notes]);

    return (
        <section className="results">
            <article className="search-results">
                {
                    todosFinded.length > 0 || notesFinded.length > 0 ?
                        <>
                            <article className="todos-results">
                                <h3>Todos</h3>
                                {
                                    todosFinded.map(todo => <Rendertodo {...todo} key={todo.id} />)
                                }
                            </article>
                            <article className="notes-results">
                                <h3>Notes</h3>
                                {
                                    notesFinded.map(note => <Rendertodo {...note} key={note.id} />)
                                }
                            </article>
                        </>
                        :
                        <article className="results-empty">
                            <img src={emptyData} alt="dataEmpty" />
                            <p>Not Found Results</p>
                        </article>
                }
            </article>
        </section>
    )
}
