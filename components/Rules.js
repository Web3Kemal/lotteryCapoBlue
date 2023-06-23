import React from 'react';
import style from '../styles/Rules.module.css';

const Rules = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText('0xb2F07B9d910BD9D8d59f865eb38367D5c2b2423f').then(function() {
      alert('Copied the text: 0xb2F07B9d910BD9D8d59f865eb38367D5c2b2423f');
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        How To Play
      </div>
      <div className={style.rule}>
        Enter the game with 100,000 BLUE, you can enter multiple times! The winner gets all the BLUE!
      </div>
      <div className={style.rule}>
        Maximum partecipants for each game is 20! After 20 entries, wait for the random winner pick!
      </div>
      <div className={style.rule}>
        The random winner pick could range from multiple times a day, depending on how many enter.
      </div>
      <div className={style.rule}>
        For the winner there is a 5% tax that will be burned, giving deflationary utility to blue!
      </div>
      <div className={style.rule}>
        CA: <button onClick={copyToClipboard}>0x212342a52B00c8C0EBFCd00534069B58Fa6fbF7C</button>
      </div>
      <div className={style.rule}>
        Made with 💙 by <a href="https://twitter.com/Web3Kemal" target="_blank" rel="noopener noreferrer">@Web3Kemal</a>
      </div>
    </div>
  );
}

export default Rules;
