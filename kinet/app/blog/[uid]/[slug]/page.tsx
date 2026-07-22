import BlogPostClientPage from "./ClientPage";

export async function generateStaticParams() {
  return [];
}

export default function Page() {
  return <BlogPostClientPage />;
}

