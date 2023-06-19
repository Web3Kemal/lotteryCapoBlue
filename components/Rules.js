import React from 'react';
import style from '../styles/Rules.module.css';

const Rules = () => {
    return (
      <div className={style.wrapper}>
        <div className={style.title}>
          How To Play
        </div>
        <div className={style.rule}>
          Enter the game with 0.1 BNB, you can enter multiple times!
        </div>
        <div className={style.rule}>
          Every day at 1 PM UTC there will be a random pick of the winner!
        </div>
        <div className={style.rule}>
          The winner gets all the BNB!
        </div>
        <div className={style.rule}>
          Example: if there are 100 entries, the winner gets 10 BNB!
        </div>
        {/* Add more rules as needed */}
      </div>
    );
  }

export default Rules;
