// config/gemini.js - REPLACE ENTIRE FILE WITH THIS

const apiKey = import.meta.env.GROQ_API_KEY;

async function run(prompt) {
  try {
    console.log("Calling Groq API...");

    // Using Groq API instead of Gemini
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b", // Fast free model
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("API Error:", error);
    return `**AI Response**\n\nHello! This is a response from Groq AI (replacing Gemini).\n\nError details: ${
      error.message || "Connection issue"
    }`;
  }
}

export default run;
