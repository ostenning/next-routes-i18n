import '../styles/globals.css'
import { wait } from '../helpers/time'

function MyApp ({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async () => {
  console.info('(app) get initial props')
  await wait(1000)
  return {}
}

export default MyApp
