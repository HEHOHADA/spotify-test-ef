import { createDomain } from 'effector'

import { isBrowser } from '../isBrowser'

export const root = createDomain('root')

if (process.env.NODE_ENV === 'development' && isBrowser()) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import('effector-logger/attach').then(({ attachLogger }) => {
    attachLogger(root, {
      reduxDevtools: 'enabled',
      inspector: 'enabled',
      console: 'disabled',
    })
  })
}
