export default async function preview(req, res) {
  try {
    await fetch(
      "https://www.google.com/ping?sitemap=https://nirjan.dev/sitemap-0.xml"
    );

    console.log("Successfully pinged sitemap");
    return res.status(200).json({ message: "Successfully pinged sitemap" });
  } catch (error) {
    console.log("Pinging sitemap failed");
    return res.status(500).json({ message: "pinging sitemap failed", error });
  }
}
