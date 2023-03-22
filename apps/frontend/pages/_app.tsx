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
        id="cronitor-js"
        src="https://rum.cronitor.io/script.js"
        async={true}
      />
      <Script
        id="cronitor-init"
        dangerouslySetInnerHTML={{
          __html: `
          window.cronitor = window.cronitor || function() { (window.cronitor.q = window.cronitor.q || []).push(arguments); };
          cronitor('config', {
              clientKey: 'b3c0c9620639d250614cadadd5b5bc64',
              debug: false,
          });
  `,
        }}
      />

      <Script
        id="panelbear-init"
        dangerouslySetInnerHTML={{
          __html: `
          window.panelbear =
          window.panelbear ||
          function () {
            (window.panelbear.q = window.panelbear.q || []).push(arguments);
          };
        panelbear('config', { site: 'ByU4h80Ugbv' });
  `,
        }}
      />
      <GoogleAnalytics trackPageViews />
      <Script
        id="clarity-script"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "g3oj3ab384");
        `,
        }}
      />
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
