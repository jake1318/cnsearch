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
    const serpApiKey = process.env.SERPAPI_KEY;
    const url = `https://serpapi.com/search.json?engine=google_light&q=${encodeURIComponent(query)}&hl=en&gl=us&device=desktop&api_key=${serpApiKey}`;
    try {
        const response = await axios_1.default.get(url);
        const data = response.data;
        const results = [];
        if (data.AbstractText && data.AbstractURL) {
            results.push({
                title: data.Heading || query,
                url: data.AbstractURL,
                snippet: data.AbstractText,
            });
        }
        if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
            data.RelatedTopics.slice(0, 5).forEach((topic) => {
                if (topic.FirstURL && topic.Text) {
                    results.push({
                        title: topic.Text.split(" - ")[0] || topic.Text,
                        url: topic.FirstURL,
                        snippet: topic.Text,
                    });
                }
            });
        }
        res.status(200).json({ results });
    }
    catch (err) {
        console.error("SerpAPI error:", err.response?.data || err.message);
        res.status(500).json({ error: "Web search request failed" });
    }
}
