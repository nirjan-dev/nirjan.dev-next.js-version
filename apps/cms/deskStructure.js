// ./studio/deskStructure.js

import S from "@sanity/desk-tool/structure-builder";
import Iframe from "sanity-plugin-iframe-pane";
import SeoPane from "sanity-plugin-seo-pane";
import resolveProductionUrl from "./resolveProductionUrl";

export const getDefaultDocumentNode = () => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: (doc) => resolveProductionUrl(doc),
        reload: {
          button: true, // default `undefined`
          revision: true, // default `undefined`
        },
        defaultSize: `mobile`,
      })
      .title("Preview"),
    S.view
      .component(SeoPane)
      .options({
        // Retrieve the keywords and synonyms at the given dot-notated strings
        keywords: (doc) => {
          console.log({ doc });
          return doc.seoKeywords;
        },
        synonyms: (doc) => doc.seoSynonyms,
        url: (doc) => resolveProductionUrl(doc),

        // Alternatively, specify functions (may be async) to extract values
        // keywords: doc => doc.seo?.keywords,
        // synonyms: async(doc) => client.fetch('some query to get synonyms', {id: doc._id}),
        // url: async(doc) => client.fetch('some query to construct a url with refs', {id: doc._id})
      })
      .title("SEO"),
  ]);
};

export default () =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("post"),
      S.documentTypeListItem("category"),
    ]);
