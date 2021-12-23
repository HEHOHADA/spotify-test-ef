import { atom } from 'recoil'

import SinglePlaylistResponse = SpotifyApi.SinglePlaylistResponse

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '0RrrIZP9lmVCaTaWV5d75c',
})

export const playlistAtom = atom<SinglePlaylistResponse | null>({
  key: 'playlistAtom',
  default: null,
})
