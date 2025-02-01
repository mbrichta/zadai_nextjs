import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// If you want to ensure this page is always fetched on each request (no caching):
export const revalidate = 0;
// or use "export const dynamic = 'force-dynamic';"
// depending on your preference

export default async function BlogOverviewPage() {
  // Fetch data from your Supabase 'blogs' table
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("id, summary, title, markdown, slug")
    .order("id", { ascending: true });

  if (error) {
    // Handle errors (this will render on the server)
    return <div className="p-4">Error: {error.message}</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div className="p-4">No blog posts found.</div>;
  }

  return (
    <section className="container mx-auto p-4">
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
                href={`/blog/${blog.slug}`}
                className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
              >
                Read more
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
