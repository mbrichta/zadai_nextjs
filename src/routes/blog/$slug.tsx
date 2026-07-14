import { createFileRoute } from '@tanstack/react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type BlogPost = {
  id: number
  slug: string
  title: string
  markdown?: string
}

export const Route = createFileRoute('/blog/$slug')({
  loader: async () => ({
    blog: null as BlogPost | null,
    error: 'Post not found',
  }),
  component: BlogPostRoute,
})

function BlogPostRoute() {
  const { blog, error } = Route.useLoaderData()

  if (!blog) {
    return (
      <section className="p-4 pt-20">
        <h1>Post not found</h1>
        <p>{error}</p>
      </section>
    )
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-14 pt-20">
      <article className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.markdown ?? 'No content provided.'}
        </ReactMarkdown>
      </article>
    </section>
  )
}
