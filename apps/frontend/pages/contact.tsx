import { NextSeo, WebPageJsonLd } from "next-seo";
import { Banner, Container } from "ui";
import ContactForm from "../components/ContactForm";
import Layout from "../components/Layout";

export default function Contact() {
  const title = `Get in touch with Nirjan Khadka`;
  const description = `If you want to work with me then get in touch, I'm available for freelance work and have experience building frontend experiences consisting of a clean UI and a friendly UX with modern web technologies like JavaScript, CSS, HTML, Vue and React`;
  const url = "https://nirjan.dev/contact";
  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
        }}
      />
      <WebPageJsonLd
        description={description}
        id="https://nirjan.dev/#webpage"
        reviewedBy={{
          type: "Person",
          name: "Nirjan Khadka",
        }}
      />

      <Banner title="Get in touch" />

      <Container isNarrow={true}>
        <ContactForm />
      </Container>
    </Layout>
  );
}
