import { Banner, Container } from "ui";
import ContactForm from "../components/ContactForm";
import Layout from "../components/Layout";

export default function Contact() {
  return (
    <Layout>
      <Banner title="Get in touch" />

      <Container isNarrow={true}>
        <ContactForm />
      </Container>
    </Layout>
  );
}
