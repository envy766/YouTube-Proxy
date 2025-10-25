import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const YT_API_KEY = " AIzaSyDRA_lMU97iqDLaJBi7up6qBtCsuwbZCwY ";

app.get("/api/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "Query missing" });

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(q)}&key=${YT_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from YouTube API" });
  }
});

app.listen(PORT, () => {
  console.log(`yt-proxy running on port ${PORT}`);
});
