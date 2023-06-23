import style from '../styles/TableRow.module.css'
import truncateEthAddress from 'truncate-eth-address'
import { useState, useEffect } from 'react'

const TableRow = ({ player }) => {
  const [isTruncated, setTruncated] = useState(window.innerWidth <= 600)

  useEffect(() => {
    const handleResize = () => {
      setTruncated(window.innerWidth <= 600)
    }

    window.addEventListener('resize', handleResize)
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array means this effect runs once on mount and clean up on unmount

  return (
    <div className={style.wrapper}>
      <div className={style.address} onClick={() => setTruncated(!isTruncated)}>
        {isTruncated ? truncateEthAddress(player) : player}
      </div>
      <div className={style.ethAmmount}>
        <span className={style.goldAccent}>+100,000 BLUE</span>
      </div>
    </div>
  )
}

export default TableRow
