import styles from './Landing.module.css'
import Feed from '../../components/Feed/Feed'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <Feed />
    </main>
  )
}

export default Landing
