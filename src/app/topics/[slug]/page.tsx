import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/PostList";
import { fetchPostsBySlug } from "@/db/queries/post";

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicShowPage({ params }: TopicPageProps) {
  const { slug } = await params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-4">{slug}</h1>
        <PostList fetchData={() => fetchPostsBySlug(slug)} />
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
