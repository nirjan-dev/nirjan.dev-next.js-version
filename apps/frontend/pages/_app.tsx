import "../styles/normalize.css";
import "../styles/global.css";
import { DefaultSeo } from "next-seo";
import Script from "next/script";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Analytics } from "@vercel/analytics/react";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://cdn.telemetrydeck.com/websdk/telemetrydeck.min.js"
        data-app-id="49448263-2041-46E2-9184-45A834E928C4"
      />

      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://nirjan.dev",
          site_name: "Nirjan.dev",
          images: [
            {
              url: "https://nirjan.dev/img/site-og.jpeg",
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
        additionalLinkTags={[
          {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon.png",
            sizes: "180x180",
          },
          {
            rel: "icon",
            href: "/favicon-32x32.png",
            type: "image/png",
            sizes: "32x32",
          },
          {
            rel: "icon",
            href: "/favicon-16x16.png",
            type: "image/png",
            sizes: "16x16",
          },

          {
            rel: "manifest",
            href: "/site.webmanifest",
          },

          {
            rel: "mask-icon",
            href: "/safari-pinned-tab.svg",
            color: "#845ec2",
          },
          {
            rel: "alternate",
            type: "application/rss+xml",
            href: "https://nirjan.dev/api/rss",
          },
        ]}
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
