import { InferGetServerSidePropsType } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
import { FC } from 'react'

const Login: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props,
) => {
  const { providers } = props

  return (
    <div
      className='flex flex-col items-center
     bg-black min-h-screen w-full justify-center'>
      <Image src='/9xl' alt='Spotify Large Icon' width={200} height={200} />
      <div className='mt-5'>
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.id}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className='bg-[#18D860] p-5 text-white rounded-full'>
                Login with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
