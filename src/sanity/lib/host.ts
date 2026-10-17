import { client } from '@/sanity/lib/client'
import type { Host } from '@/types/sanity'

export const DEFAULT_HOST: Host = {
  _id: 'local-default',
  _createdAt: '',
  _updatedAt: '',
  _rev: '',
  _type: 'host',
  name: 'Richard Sky',
  headline: 'A Ghanaian editorial voice. An open invitation to the world.',
  profile: [
    {
      _type: 'block',
      _key: 'default-1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'default-1-1',
          text: 'Journalist. Lawyer. Speaker. Richard brings more than two decades of frontline journalism and legal understanding to conversations about the people and forces shaping our lives.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'default-2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 'default-2-1',
          text: 'SkyFactor is built on the conviction that the right conversation can open minds, challenge assumptions and illuminate what matters.',
        },
      ],
    },
  ],
  profileImage: undefined,
  pressPhotography: [],
  achievements: [],
}

const HOST_QUERY = `*[_type == "host"][0]{
  _id,
  _createdAt,
  _updatedAt,
  _rev,
  _type,
  name,
  headline,
  profile,
  aboutSkyFactor,
  fullBio,
  profileImage,
  pressPhotography,
  achievements
}`

export async function getHost(): Promise<Host> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return DEFAULT_HOST
  }

  try {
    const data = await client.fetch<Host | null>(
      HOST_QUERY,
      {},
      { useCdn: false, next: { revalidate: 10 } },
    )

    return data ?? DEFAULT_HOST
  } catch (error) {
    console.warn('[sanity] Failed to fetch host, using default:', error)
    return DEFAULT_HOST
  }
}