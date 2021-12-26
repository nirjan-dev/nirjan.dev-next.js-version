import { useRouter } from "next/router";
import { Banner, Container } from "ui";
import Layout from "../../components/Layout";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Layout>
      <Banner title="My Blog" />

      <Container>
        <h1>{slug}</h1>
      </Container>
    </Layout>
  );
}
