import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, createFileRoute } from '@tanstack/react-router'

type BlogPost = {
  id: number
  slug: string
  title: string
  markdown?: string
}

export const Route = createFileRoute('/blog/')({
  loader: async (): Promise<{ blogs: BlogPost[] }> => ({ blogs: [] }),
  component: BlogIndexRoute,
})

function BlogIndexRoute() {
  const { blogs } = Route.useLoaderData()

  if (blogs.length === 0) {
    return <div className="p-4">No blog posts found.</div>
  }

  return (
    <section className="container mx-auto p-4 pt-20">
      <h1 className="text-4xl font-bold mb-6">All Blog Posts</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {blog.markdown?.slice(0, 100)}...
              </p>
              <Link
                to="/blog/$slug"
                params={{ slug: blog.slug }}
                className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
              >
                Read more
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
