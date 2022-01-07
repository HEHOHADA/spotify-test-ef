import { Provider } from 'effector-react/ssr'
import type { AppProps } from 'next/app'
import 'styles/globals.css'

import { useScope } from 'lib/effector'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const values = useScope(pageProps.initialState)

  return (
    <Provider value={values}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
