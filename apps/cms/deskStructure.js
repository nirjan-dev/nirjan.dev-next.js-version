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
      S.listItem()
        .title("Posts")
        .child(
          S.list()
            .title("Posts")
            .items([
              S.listItem()
                .title("All Posts")
                .schemaType("post")
                .child(S.documentTypeList("post").title("All Posts")),
              S.listItem()
                .title("Featured Posts")
                .schemaType("post")
                .child(
                  S.documentTypeList("post")
                    .title("Featured Posts")
                    .filter("_type == $type && featured == true")
                    .params({ type: "post" })
                ),
              S.listItem()
                .title("By Category")
                .child(
                  S.documentTypeList("category")
                    .title("Posts By Category")
                    .child((categoryId) =>
                      S.documentTypeList("post")
                        .title("Posts")
                        .filter(
                          '_type == "post" && $categoryId in categories[]._ref'
                        )
                        .params({ categoryId })
                    )
                ),

              S.listItem()
                .title("Drafts")
                .schemaType("post")
                .child(
                  S.documentTypeList("post")
                    .title("Drafts")
                    .filter("_type == $type && !defined(publishedAt)")
                    .params({ type: "post" })
                ),
            ])
        ),
      S.documentTypeListItem("category"),
    ]);
