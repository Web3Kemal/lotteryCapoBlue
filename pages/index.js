import Header from '../components/Header'
import PotCard from '../components/PotCard'
import Rules from '../components/Rules'
import Table from '../components/Table'

import style from '../styles/Home.module.css'
export default function Home() {
  return (
    <div className={style.wrapper}>
      <Header />
      <PotCard />
      <Table />
      <Rules />
    </div>
  )
}
