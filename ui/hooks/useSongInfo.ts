import { currentTrackIdState } from 'atoms/songAtom'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { useSpotify } from './useSpotify'

import SingleTrackResponse = SpotifyApi.SingleTrackResponse

export const useSongInfo = () => {
  const spotifyApi = useSpotify()
  const currentTrackId = useRecoilValue(currentTrackIdState)
  const [songInfo, setSongInfo] = useState<SingleTrackResponse | undefined>()

  useEffect(() => {
    if (currentTrackId) {
      spotifyApi.getTrack(currentTrackId).then((res) => setSongInfo(res.body))
    }
  }, [currentTrackId, spotifyApi])

  return songInfo
}
