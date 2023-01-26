const withTM = require("next-transpile-modules")(["ui"]);

const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source:
          "/first-remote-job-leading-a-team-learning-seo-or-2021-review-from-a-web-developer",
        destination:
          "/blog/first-remote-job-leading-a-team-learning-seo-or-2021-review-from-a-web-developer",
        permanent: true,
      },
      {
        source: "/how-to-build-accessible-hidden-navigation-menus-on-the-web",
        destination:
          "/blog/how-to-build-accessible-hidden-navigation-menus-on-the-web",
        permanent: true,
      },
      {
        source:
          "/step-by-step-guide-to-truncating-text-in-css-shorten-text-like-a-pro",
        destination:
          "/blog/step-by-step-guide-to-truncating-text-in-css-shorten-text-like-a-pro",
        permanent: true,
      },
      {
        source: "/tips-for-beginners-learning-to-code",
        destination: "/blog/tips-for-beginners-learning-to-code",
        permanent: true,
      },
      {
        source: "/understanding-this-in-javascript",
        destination: "/blog/understanding-this-in-javascript",
        permanent: true,
      },
      {
        source: "/understanding-lexical-scope-and-closures-in-3-minutes",
        destination:
          "/blog/understanding-lexical-scope-and-closures-in-3-minutes",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = withTM(config);
