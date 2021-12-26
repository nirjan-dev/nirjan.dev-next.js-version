import { Banner, Container } from "ui";
import { BlogList, BlogListItem } from "../components/BlogList";
import Layout from "../components/Layout";

const posts: BlogListItem[] = [
  {
    title: "How to build a React app with TypeScript",
    date: "2020-01-01",
    excerpt:
      "This is a blog post about how to build a React app with TypeScript.",
    slug: "/blog/how-to-build-a-react-app-with-typescript",
  },
  {
    title: "10 tips for building a React app with TypeScript",
    date: "2020-01-01",
    excerpt:
      "This is a blog post about 10 tips for building a React app with TypeScript.",
    slug: "/blog/10-tips-for-building-a-react-app-with-typescript",
  },
  {
    title: "The ultimate guide to building a React app with TypeScript",
    date: "2020-01-01",
    excerpt:
      "This is a blog post about the ultimate guide to building a React app with TypeScript.",
    slug: "/blog/the-ultimate-guide-to-building-a-react-app-with-typescript",
  },
];

export default function Blog() {
  return (
    <Layout>
      <Banner title="My Blog" />
      <Container>
        <BlogList posts={posts} />
      </Container>
    </Layout>
  );
}
