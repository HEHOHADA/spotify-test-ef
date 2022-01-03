import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Spotify from 'next-auth/providers/spotify'

import { spotifyApi } from 'api/spotifyApi'

import { loginUrl } from 'lib/spotify'

export type OwnJWT = JWT & {
  accessToken: string
  refreshToken: string
  username?: string
  accessTokenExpires?: number
  error?: string
}

const refreshAccessToken = async (token: OwnJWT) => {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (e) {
    console.error(e)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  providers: [
    Spotify({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: loginUrl,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      const ownJWT = token as OwnJWT

      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: (account.expires_at ?? 0) * 1000,
        }
      }

      if (ownJWT.accessTokenExpires && Date.now() < ownJWT.accessTokenExpires) {
        return token
      }

      return refreshAccessToken(ownJWT)
    },
    async session({ session, token }) {
      const newToken = token as OwnJWT

      if (session.user) {
        session.user.accessToken = newToken.accessToken
        session.user.refreshToken = newToken.refreshToken
        session.user.username = newToken.username
      }

      return session
    },
  },
})
