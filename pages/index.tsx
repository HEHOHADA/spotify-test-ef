import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

import { Center } from 'ui/components/Center'
import { Player } from 'ui/components/Player'
import { Sidebar } from 'ui/components/Sidebar'

export default function Home() {
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
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
