import { useList } from 'effector-react'
import { FC } from 'react'

import { $playlistTracks } from 'models/playlist'

import { Song } from '../Song'

export type SongsProps = {}

export const Songs: FC<SongsProps> = (props) => {
  const {} = props
  const tracks = useList($playlistTracks, (item) => <Song track={item.track} />)

  return <div className='text-white'>{tracks}</div>
}
