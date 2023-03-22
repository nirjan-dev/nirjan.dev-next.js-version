import generateRssFeed from "utils/generateRSSFeed";

export default async function generateRss(req, res) {
  try {
    const xml = await generateRssFeed();
    console.log("Successfully generated RSS feed");
    res.setHeader("Content-Type", "application/xml");

    res.write(xml);

    res.end();
    return {};
  } catch (error) {
    console.log("Generating RSS feed failed");
    return res
      .status(500)
      .json({ message: "Generating RSS feed failed", error });
  }
}
