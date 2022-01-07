import React, {  useLayoutEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../pictures/logo.png';
import todoImg from '../../../pictures/checklist_white_24dp.svg';
import notesImg from '../../../pictures/description_white_24dp.svg';
import recicleImg from '../../../pictures/recycling_white_24dp.svg';
import { gsap } from 'gsap';

export const BarNav = React.memo(({ sideBar, toggleSideBar, setSideBar }) => {

    const ref = useRef(null);

    useLayoutEffect(() => {

        if ( !ref.current ) return;

        if (sideBar) {
            gsap.from(ref.current, { x: -200, duration: .2, ease: 'ease' })
            gsap.to(ref.current, { x: 0, duration: .2, ease: 'ease' })
        } else {
            toggleSideBar();
        }
    }, [sideBar, toggleSideBar])

    return (
        <aside
            ref={ref}
        >
            <section>
                <article className="logo-barnav">
                    <img src={logo} alt='Journal-sLogo' title="Journal" />
                    <h1>Journal</h1>
                </article>
                <article>
                    <nav>
                        <ul>
                            {/* <li>
                                <img src={homeImg} alt="home" title="journal" />
                                <NavLink exact to="/journal" activeClassName="active" >Home</NavLink>
                            </li> */}
                            <li>
                                <img src={todoImg} alt="todo" />
                                <NavLink to="/journal/toDo" activeClassName="active" >Todo List</NavLink>
                            </li>
                            <li>
                                <img src={notesImg} alt="notes" />
                                <NavLink to="/journal/notes" activeClassName="active" >Notes</NavLink>
                            </li>
                            <li>
                                <img src={recicleImg} alt="recycle" />
                                <NavLink to="/journal/paperbin" activeClassName="active" >Recycle bin</NavLink>
                            </li>
                        </ul>
                    </nav>
                </article>
            </section>
        </aside>
    );
})
