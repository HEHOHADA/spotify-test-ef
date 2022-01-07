import { allSettled, fork, serialize } from 'effector'
import { useGate } from 'effector-react'
import { GetServerSidePropsContext } from 'next'

import { spotifyApi, SpotifyGate } from 'api/spotifyApi'

import { Center, Player, Sidebar } from 'ui/components'

import { getPlaylistsFx } from 'models/playlists/model'
import { getSessionFx } from 'models/session/model'

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
  const token =
    data.status === 'done' ? data.value?.user?.accessToken || '' : ''

  if (token) {
    spotifyApi.setAccessToken(token)
    await allSettled(getPlaylistsFx, { scope })
  }

  return {
    props: {
      initialState: serialize(scope),
    },
  }
}
