import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { spanish } from './lenguagues/spanish';
import { english } from './lenguagues/english';
import ExamplePtOne  from '../../../pictures/ExamplePtOne.png';
import ExamplePtTwo  from '../../../pictures/ExamplePtTwo.png';
import ExamplePtThree  from '../../../pictures/ExamplePtThree.png';


export const DeleteAccount = () => {

  const { lenguague } = useSelector(state => state.lenguague);
  const [ lenguagueCurrent, setLenguagueCurrent] = useState(english);

  useEffect( ()=>{
    if(lenguague === 'english'){
      setLenguagueCurrent(english);
    }else if (lenguague === 'spanish'){
      setLenguagueCurrent(spanish);
    }
  },[lenguague, lenguagueCurrent]);

    return (
        <>
            <article>
                <h3>{ lenguagueCurrent.h3HowTo }</h3>

                <p>{ lenguagueCurrent.stepOneTitle }</p>
                <p>{ lenguagueCurrent.stepOneDescription }</p>
                <div className="img-container">
                  <img src={ ExamplePtOne } alt="ExampleOne"/>
                </div>
                <p>{ lenguagueCurrent.stepTwoTitle}</p>
                <p>{ lenguagueCurrent.stepTwoDescription} <b>{lenguagueCurrent.deleteAccountWord}</b></p>

                <div className="img-container">
                  <img src={ ExamplePtTwo } alt="ExampleTwo" />
                </div>
                <p>{ lenguagueCurrent.stepThreeTitle}</p>
                <p>{ lenguagueCurrent.stepTwoDescription} <b>{lenguagueCurrent.deleteAccountWord}</b></p>

                <div className="img-container">
                  <img src={ ExamplePtThree } alt="ExampleThree" />
                </div>
            </article>
        </>
    )
}
