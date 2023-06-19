import React from 'react';
import style from '../styles/Rules.module.css';

const Rules = () => {
    return (
      <div className={style.wrapper}>
        <div className={style.title}>
          How To Play
        </div>
        <div className={style.rule}>
          Enter the game with 0.1 BNB, you can enter multiple times! The winner gets all the BNB!
        </div>
        <div className={style.rule}>
          The more you bet, the more chances to win! <i>Example: CZ bets 10 times himself with the same wallet and Cardano team - 10 different people - bets 10 times 1 time each player. In this case, CZ has higher chances to win, exactly at 50%.</i>
        </div>
        <div className={style.rule}>
        Every day at 1 PM UTC there will be a random pick of the winner!
        </div>
        <div className={style.rule}>
          Example: if there are 100 entries, the winner gets 9.5 BNB! 5% will go to BLUE & CAPO marketing wallet.
        </div>
        <div className={style.rule}>
          CA: 0x....
        </div>
        {/* Add more rules as needed */}
      </div>
    );
  }

export default Rules;
