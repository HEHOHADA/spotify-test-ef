import { NextApiRequest, NextApiResponse } from 'next'

import { loginUrl } from 'lib/spotify'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await fetch(loginUrl)
  const item = await data.json()

  console.log({ item })
  res.status(200).json({ name: 'John Doe' })
}
