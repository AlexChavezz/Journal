import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Switch, NavLink, Route } from 'react-router-dom';
import { DeleteAccount } from './DeleteAccount';
import { PrivacityHome } from './PrivacityHome';
import { english } from './lenguagues/english';
import { spanish } from './lenguagues/spanish';
import { changeToSpanish } from '../../../actions/lenguagues';
import { changeToEnglish } from '../../../actions/lenguagues';


export const PrivacyPolicyScreen = () => {

  const { lenguague } = useSelector(state => state.lenguague);
  const dispatch = useDispatch();

  const handleInputChange  = () => {
    if( lenguague === 'spanish' ){
      dispatch(changeToEnglish('english'));
      // setLenguague({
      //   lenguague: 'english',
      //   });
    }else if(lenguague === 'english'){
      dispatch(changeToSpanish('spanish'));
      // setLenguague({
      //   lenguague: 'spanish',
      // });
    }
  }
    return (
        <>
            <header>
                <h2>{lenguague === 'english'? english.title : spanish.title }</h2>
                <div className="caja">
                    <select
                      onChange={ handleInputChange }
                    >
                      <option>
                      {
                        lenguague === 'spanish'? spanish.english : english.english
                      }
                      </option>
                        <option>
                        {
                          lenguague === 'spanish'? spanish.spanish : english.spanish
                        }
                        </option>
                    </select>
                </div>
            </header>
            <div className="container-privacity">
                <aside>
                    <nav>
                        <span>{ lenguague === 'spanish'? spanish.span : english.span}</span><br />
                        <NavLink exact to="/privacy-policy/" activeClassName="active">{ lenguague === 'spanish'? spanish.linkOne : english.linkOne }</NavLink> <br />
                        <NavLink to="/privacy-policy/delete-account" activeClassName="active">{lenguague === 'spanish'? spanish.linkTwo : english.linkTwo}</NavLink>
                    </nav>
                </aside>
                <section>
                    <Switch>
                        <Route exact path="/privacy-policy" component={PrivacityHome}/>
                        <Route exact path="/privacy-policy/delete-account" component={DeleteAccount} />
                    </Switch>
                </section>
            </div>

        </>
    )
}
