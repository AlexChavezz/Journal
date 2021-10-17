import React from 'react';
import { Switch, NavLink, Route } from 'react-router-dom';
import { DeleteAccount } from './DeleteAccount';
import { PrivacityHome } from './PrivacityHome';

export const PrivacyPolicyScreen = () => {
    return (
        <>
            <header>
                <h2> Journal Politicas de Privacidad</h2>
                <div className="caja">
                    <select>
                        <option>
                            Español
                        </option>
                        <option>
                            Ingles
                        </option>
                    </select>
                </div>
            </header>
            <div className="container-privacity">
                <aside>
                    <nav>
                        <span>on this page</span><br />
                        <NavLink exact to="/privacy-policy/" activeClassName="active">politicas de privacidad</NavLink> <br />
                        <NavLink to="/privacy-policy/delete-account" activeClassName="active">Eliminacion de Cuenta</NavLink>
                    </nav>
                </aside>
                <section>
                    <Switch>
                        <Route exact path="/privacy-policy" component={PrivacityHome} />
                        <Route exact path="/privacy-policy/delete-account" component={DeleteAccount} />
                    </Switch>
                </section>
            </div>

        </>
    )
}
