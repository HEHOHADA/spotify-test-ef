import { spotifyApi, SpotifyGate } from 'api/spotifyApi'
import { allSettled, fork, serialize } from 'effector'
import { useGate } from 'effector-react'
import { GetServerSidePropsContext } from 'next'

import { Sidebar } from 'ui/components/Sidebar'

import { getPlaylistsFx } from 'models/playlists/model'
import { getSessionFx } from 'models/session/model'

import { Center } from '../ui/components/Center'
import { Player } from '../ui/components/Player'

export default function Home() {
  useGate(SpotifyGate)

  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className='flex'>
        <Sidebar />
        <Center />
      </main>
      <div className='sticky bottom-0'>
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const scope = fork()

  const data = await allSettled(getSessionFx, { scope, params: context })

  spotifyApi.setAccessToken(
    data.status === 'done' ? data.value?.user?.accessToken || '' : '',
  )

  await allSettled(getPlaylistsFx, { scope })

  return {
    props: {
      initialState: serialize(scope),
    },
  }
}
