import { createDomain } from 'effector'
import { isBrowser } from 'helpers'

export const root = createDomain('root')

if (isBrowser) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import('effector-logger/attach').then(({ attachLogger }) => {
    attachLogger(root)
  })
}
