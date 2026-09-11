export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { notes, questionCount } = req.body;

    if (!notes?.trim()) {
      return res.status(400).json({
        error: "Notes are required",
      });
    }

    const count = questionCount || 5;

    const prompt = `
You are a study assistant.

Create exactly ${count} multiple-choice quiz questions based on the following topic or notes:

${notes}

Return ONLY valid JSON in exactly this format:

{
  "questions": [
    {
      "question": "Question text",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "correctAnswer": "The exact correct option",
      "explanation": "Brief explanation"
    }
  ]
}

Rules:
- Every question must be directly related to the provided topic or notes.
- Do not introduce unrelated general-knowledge questions.
- If the input is very short, vague, or does not contain enough information, still keep questions focused on the exact topic rather than changing subjects.
- Never use unrelated examples just to fill the requested number of questions.
- Generate exactly ${count} questions.
- Each question must have exactly 4 options.
- Only one option can be correct.
- correctAnswer must exactly match one of the four options.
- explanation must briefly explain why the correct answer is correct.
- Return JSON only.
- Do not use Markdown.
- Do not add any text before or after the JSON.
`;

    console.log("API key loaded:", !!process.env.OPENROUTER_API_KEY);
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API error:", data);

      throw new Error(`OpenRouter API failed: ${response.status}`);
    }

    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("OpenRouter returned an empty response");
    }

    console.log("Raw AI response:", text);

    // Remove Markdown code fences if the model adds them
    const cleanedText = text
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    console.log("Cleaned AI response:", cleanedText);

    let parsedData;

    try {
      parsedData = JSON.parse(cleanedText);
    } catch (error) {
      console.error("JSON parsing failed:", error);
      console.error("AI response was:", cleanedText);

      throw new Error("AI returned invalid JSON");
    }

    // If AI returns an array instead of { questions: [...] }
    if (Array.isArray(parsedData)) {
      parsedData = {
        questions: parsedData,
      };
    }

    // Convert correctOptionIndex to correctAnswer if needed
    if (Array.isArray(parsedData.questions)) {
      parsedData.questions = parsedData.questions.map((question) => {
        if (
          question.correctAnswer === undefined &&
          typeof question.correctOptionIndex === "number" &&
          Array.isArray(question.options)
        ) {
          return {
            ...question,
            correctAnswer: question.options[question.correctOptionIndex],
          };
        }

        return question;
      });
    }

    return res.status(200).json({
      success: true,
      data: JSON.stringify(parsedData),
    });
  } catch (error) {
    console.error("Quiz generation error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to generate quiz",
    });
  }
}
