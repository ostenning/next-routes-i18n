import Head from 'next/head'
import Links from '../components/Links'
import styles from '../styles/Home.module.css'

export default function Main() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Main
        </h1>

        <Links />
      </main>
    </div>
  )
}
