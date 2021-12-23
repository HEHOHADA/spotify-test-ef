import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export const useSpotify = () => {
  const { data } = useSession()

  useEffect(() => {
    if (data) {
      if (data.error === 'RefreshAccessTokenError') {
        signIn()
      }
      if (data.user?.accessToken) {
        spotifyApi.setAccessToken(data.user.accessToken)
      }
    }
  }, [data])

  return spotifyApi
}
