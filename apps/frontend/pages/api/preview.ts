export default async function preview(req, res) {
  if (!req?.query?.secret) {
    return res.status(401).json({ message: "No secret token" });
  }

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid secret token" });
  }

  if (!req.query.slug) {
    return res.status(401).json({ message: "No slug" });
  }
  const corsOrigin =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3333`
      : `https://nirjan.sanity.studio`;

  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Fetch the preview-page's HTML and return in an object
  if (req?.query?.fetch === "true") {
    const proto =
      process.env.NODE_ENV === "development" ? `http://` : `https://`;
    const host = req.headers.host;
    const pathname = req?.query?.slug ?? `/`;
    const absoluteUrl = new URL(`${proto}${host}/${pathname}`).toString();

    const previewHtml = await fetch(absoluteUrl, {
      credentials: `include`,
      headers: { Cookie: req.headers.cookie },
    })
      .then((previewRes) => previewRes.text())
      .catch((err) => console.error(err));

    return res.send(previewHtml);
  }

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${req?.query?.slug}` ?? `/` });

  return res.end();
}
