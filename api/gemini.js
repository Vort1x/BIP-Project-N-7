const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/" +
  GEMINI_MODEL +
  ":generateContent";

function sendJson(response, statusCode, data) {
  response.status(statusCode).json(data);
}

function hasRequiredFields(body) {
  return (
    body &&
    body.question &&
    body.selectedAnswer &&
    body.misconception &&
    body.correctAnswer &&
    body.existingFeedback &&
    body.studentAgeRange
  );
}

function buildPrompt(body) {
  return [
    "You are helping a student aged " + body.studentAgeRange + " learn forces and motion.",
    "Write a short, kind explanation for this science misconception.",
    "Use simple language for students aged 11-16.",
    "Correct the specific misconception without changing the correct answer.",
    "Use the prewritten feedback as the source of truth.",
    "Do not replace the quiz logic. Do not say the answer was chosen by an AI.",
    "Keep the explanation under 80 words and include one short follow-up question.",
    "Return only valid JSON with these exact keys: explanation, followUpQuestion.",
    "",
    "Question: " + body.question,
    "Student selected: " + body.selectedAnswer,
    "Misconception: " + body.misconception,
    "Correct answer: " + body.correctAnswer,
    "Prewritten feedback: " + body.existingFeedback
  ].join("\n");
}

function parseGeminiText(data) {
  const parts =
    data &&
    data.candidates &&
    data.candidates[0] &&
    data.candidates[0].content &&
    data.candidates[0].content.parts;

  if (!Array.isArray(parts)) {
    return "";
  }

  return parts
    .map(function (part) {
      return part.text || "";
    })
    .join("")
    .trim();
}

function parseJsonFromText(text) {
  const cleanedText = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanedText);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Only POST requests are supported." });
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    sendJson(response, 503, { error: "Gemini API key is not configured." });
    return;
  }

  if (!hasRequiredFields(request.body)) {
    sendJson(response, 400, { error: "Missing required feedback fields." });
    return;
  }

  try {
    const geminiResponse = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: buildPrompt(request.body)
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 180,
          responseMimeType: "application/json"
        }
      })
    });

    if (!geminiResponse.ok) {
      sendJson(response, 502, { error: "Gemini API request failed." });
      return;
    }

    const geminiData = await geminiResponse.json();
    const geminiText = parseGeminiText(geminiData);
    const parsedFeedback = parseJsonFromText(geminiText);

    sendJson(response, 200, {
      explanation: String(parsedFeedback.explanation || "").slice(0, 500),
      followUpQuestion: String(parsedFeedback.followUpQuestion || "").slice(0, 200)
    });
  } catch (error) {
    sendJson(response, 500, { error: "Could not generate AI feedback." });
  }
}
