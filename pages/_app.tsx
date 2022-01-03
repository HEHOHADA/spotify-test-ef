import { hydrate } from 'effector'
import { Provider } from 'effector-react/ssr'
import type { AppProps } from 'next/app'
import 'styles/globals.css'

import { root, useScope } from 'lib/effector'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const values = useScope(root, pageProps.initialState)

  if (pageProps.initialState) {
    hydrate(values, { values: pageProps.initialState })
  }

  return (
    <Provider value={values}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
