// app/blog/[slug]/page.tsx

import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  markdown?: string;
};

type PageProps = {
  params: {
    slug: string;
  };
};

// 1. Generate static params for each blog post's slug
export async function generateStaticParams() {
  const { data: blogs, error } = await supabase.from("blogs").select("slug");

  if (error || !blogs) {
    console.error("Error fetching posts:", error?.message || "No data");
    return [];
  }

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// 2. The page component that’s statically generated at build time
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params;

  // Fetch data for a single post, matching the dynamic slug
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single<BlogPost>();

  if (error || !blog) {
    return (
      <section className="p-4">
        <h1>Post not found</h1>
        <p>{error?.message || "No data returned for this slug."}</p>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-14">
      {/* 3. Use Tailwind typography classes to style markdown */}
      <article className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.markdown ?? "No content provided."}
        </ReactMarkdown>
      </article>
    </section>
  );
}
