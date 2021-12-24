import gsap from 'gsap/all';
import React, { useLayoutEffect, useRef } from 'react';

export const HomeScreen = () => {
    const ref = useRef();

    useLayoutEffect(() => {
        gsap.from(ref.current, { y: 20, duration: .4, ease: 'ease.out' })
    }, [])


    return (
        <section className="container_home">
            <article className="banner">
                <h3>Welcome to <b>JOURNAL</b></h3>
                <p ref={ref}>The Perfect place to save evrything </p>
            </article>
            <article className="description">
                <article>
                    <h3>What is this ?</h3>
                    <p>Journal is a single web application that you can use to save notes for manage your day or you also use todo list, you will not forget nothing.</p>
                </article>
                <article>
                    <h3>What is this ?</h3>
                    <p>Journal is a single web application that you can use to save notes for manage your day or you also use todo list, you will not forget nothing.</p>
                </article>
            </article>
            <footer>

            </footer>
            {/* <div className="container_home text">
                <h3>Hello  <b>{name}</b></h3>
                <p>This is the Perfect place to save whatever you want.</p>
                <hr />

                {
                    items.length !== 0 ?
(                    <section className="section">
                    <h3>Whats there to do ?</h3>
                    <div className="items-container">
                        {
                            items.map(item => <PendingTodos {...item} key={item.id} />)
                        }
                    </div>
                </section>
)                :(
                    <div className="alert_witout_pendings">
                        Congratulations! You have 0 Pendings
                    </div>
                )
                }
            </div>
            <div className="footer">
                <p>Developed by Alexis Chavez</p><br />
                <span>More about my work <a href="https://alexchavezz.github.io/PORTAFOLIO/" target="_black">Here!</a></span>
            </div> */}
        </section>
    );
}
