import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'ax2jxmh5', // your project ID
  dataset: 'production',
  useCdn: true, // false if you want latest data
  apiVersion: '2025-08-19',
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source) => builder.image(source)
