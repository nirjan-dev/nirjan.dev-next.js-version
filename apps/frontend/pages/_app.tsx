import "../styles/normalize.css";
import "../styles/global.css";
import { DefaultSeo } from "next-seo";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://nirjan.dev",
          site_name: "Nirjan.dev",
          images: [
            {
              url: "https://cdn.sanity.io/images/rl6xlgdh/production/f8310e61d05c1ed6438acae66d6606570896d737-1918x985.png?w=1200&h=630",
              width: 1200,
              height: 630,
            },
          ],
        }}
        twitter={{
          handle: "@nirjan_dev",
          site: "@nirjan_dev",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
