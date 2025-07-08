import { redirect } from "next/navigation";
import PostLst from "@/components/posts/PostList";
import { fetchPostBySearchTerm } from "@/db/queries/post";
import PostList from "@/components/posts/PostList";

interface SearchPageProps {
  searchParams: Promise<{
    term?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const term = params.term || "";

  if (!term) {
    redirect("/");
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        <p className="mb-4">
          You searched for: <strong>{term}</strong>
        </p>
      </div>
      <PostList fetchData={() => fetchPostBySearchTerm(term)} />
    </div>
  );
}
