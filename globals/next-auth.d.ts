import { ISODateString } from 'next-auth/core/types'

import { OwnJWT } from 'pages/api/auth/[...nextauth]'

declare module 'next-auth' {
  export interface Session extends Record<string, unknown> {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
    } & OwnJWT
    expires: ISODateString
  }
}
