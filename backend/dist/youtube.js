"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const axios_1 = __importDefault(require("axios"));
async function handler(req, res) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    const query = req.query.query;
    if (!query)
        return res.status(400).json({ error: "Missing query parameter" });
    const apiKey = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${apiKey}`;
    try {
        const ytRes = await axios_1.default.get(url);
        const results = ytRes.data.items.map((item) => ({
            title: item.snippet.title,
            videoId: item.id.videoId,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails?.default?.url,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));
        res.status(200).json({ results });
    }
    catch (err) {
        console.error("YouTube API error:", err.response?.data || err.message);
        res.status(500).json({ error: "YouTube request failed" });
    }
}
