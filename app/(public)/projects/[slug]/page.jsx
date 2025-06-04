import { notFound } from 'next/navigation'
import { projectsMain } from '@/constants/data'

export async function generateStaticParams() {
  return projectsMain.map((project) => ({ slug: project.slug }))
}

export default function ProjectPage({ params }) {
  const project = projectsMain.find((p) => p.slug === params.slug)

  if (!project) return notFound()

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <p>{project.description}</p>
      {/* Add the rest of your UI here */}
    </div>
  )
}
