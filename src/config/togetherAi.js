const TOGETHER_AI_KEY = import.meta.env.VITE_TOGETHER_AI_KEY; // Store API key in .env

export default async function askTogetherAI(prompt) {
  try {
    const response = await fetch(
      "https://api.together.xyz/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOGETHER_AI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    const data = await response.json();
    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(`API error: ${data?.error?.message || "Unknown error"}`);
    }

    return data.choices?.[0]?.message?.content || "No response received.";

  } catch (error) {
    console.error("Error:", error);
    return "Error fetching response.";
  }
}
