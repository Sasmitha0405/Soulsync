const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function analyzeMood(text) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Analyze the emotional mood of the following text.
Return ONLY ONE WORD from this list:
happy, sad, angry, calm, energetic, neutral.

Text:
"${text}"
                  `,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    console.log("🧠 Gemini raw response:", data);

    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text
        ?.toLowerCase()
        ?.trim() || "neutral";

    // Normalize Gemini output
    if (output.includes("happy")) return "happy";
    if (output.includes("sad")) return "sad";
    if (output.includes("angry")) return "angry";
    if (output.includes("calm")) return "calm";
    if (output.includes("energetic")) return "energetic";

    return "neutral";
  } catch (err) {
    console.error("❌ Gemini API error:", err);
    return "neutral";
  }
}
