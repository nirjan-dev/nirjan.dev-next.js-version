import generateRssFeed from "utils/generateRSSFeed";

export default async function generateRss(req, res) {
  try {
    await generateRssFeed();
    console.log("Successfully generated RSS feed");
    return res.status(200).json({ message: "Successfully generated RSS feed" });
  } catch (error) {
    console.log("Generating RSS feed failed");
    return res
      .status(500)
      .json({ message: "Generating RSS feed failed", error });
  }
}
