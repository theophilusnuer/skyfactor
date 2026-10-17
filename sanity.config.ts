'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {createStudioStructure} from './src/sanity/structure'
import { colorInput } from '@sanity/color-input'
import { SendNewsletterAction } from './src/sanity/actions/send-newsletter'
import { StudioLogo } from './src/sanity/components/studio-logo'

export default defineConfig({
  basePath: '/studio',
  title: 'SkyFactor Studio',
  projectId,
  dataset,
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  document: {
    actions: (prev, { schemaType }) =>
      schemaType === 'newsletter' ? [...prev, SendNewsletterAction] : prev,
  },
  plugins: [
    structureTool({
      structure: createStudioStructure,
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    colorInput(),
  ],
  
})
