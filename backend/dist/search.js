"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: "Missing query in request body" });
    }
    try {
        // Use the built-in fetch if available, otherwise import node-fetch
        const [aiRes, ytRes, webRes] = await Promise.all([
            fetch(`${req.headers.origin}/api/openai`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: query }),
            }).then((r) => r.json()),
            fetch(`${req.headers.origin}/api/youtube?query=${encodeURIComponent(query)}`).then((r) => r.json()),
            fetch(`${req.headers.origin}/api/web?query=${encodeURIComponent(query)}`).then((r) => r.json()),
        ]);
        res.status(200).json({
            ai: aiRes.reply,
            videos: ytRes.results,
            web: webRes.results,
        });
    }
    catch (error) {
        console.error("Aggregate search error:", error);
        res.status(500).json({ error: "Search failed" });
    }
}
