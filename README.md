# Quizly — AI Study Assistant

Quizly is a React-based AI study assistant that converts a topic or study notes into an interactive multiple-choice quiz.

The main focus of the project is **reliably handling structured AI output** and transforming it into a predictable, interactive UI.

## Demo


- **Demo Video:** <your-video-link>


https://github.com/user-attachments/assets/5390a836-76a2-42ce-bfc4-78c955f59c5e



- **Live link:** <your-deployed-project-link>

https://quizify-ai-app.vercel.app/




## Features

- Free-form topic or study notes input
- AI-generated multiple-choice quizzes
- Custom question count
- Interactive quiz navigation
- Answer selection and score calculation
- Loading, error, and empty states
- Retry on failed quiz generation
- Responsive UI
- AI response parsing and validation

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- OpenRouter API
- Vercel Serverless Functions


## AI Response Handling

LLM responses can be unpredictable, so the application processes and validates the AI-generated data before rendering it.

### AI Response Processing

It handles:

- Failed API requests
- Empty AI responses
- Invalid JSON
- Markdown-wrapped JSON responses
- Unexpected response shapes

### Frontend Validation

Before rendering the quiz, the frontend validates:

- Correct number of questions
- Valid question text
- Exactly four options per question
- Non-empty options
- Valid correct answer
- Correct answer matching one of the provided options


## Project Structure

```text
flashcards/
├── api/
│   └── generate-quiz.js
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── QuizSetup.jsx
│   │   ├── Footer.jsx
│   │   ├── QuizHeader.jsx
│   │   ├── QuizCard.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── LoadingState.jsx
│   │   ├── ErrorState.jsx
│   │   └── EmptyState.jsx
│   │
│   ├── hooks/
│   │   └── useQuiz.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Quiz.jsx
│   │   └── Score.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── utils/
│   │   └── validation.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── index.html
```

## Getting Started

### Installation

Clone the repository:

```bash
git clone <your-github-repository-url>
cd quizify
```

Install the dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
OPENROUTER_API_KEY=your_api_key_here
```

### Run Locally

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Usage

1. Enter a topic or paste your study notes.
2. Select the number of questions you want to generate.
3. Click **Generate Quiz**.
4. Wait for the AI to generate the quiz.
5. Select an answer for each question.
6. Use **Previous** and **Next** to navigate between questions.
7. Click **Submit** to calculate and view your score.
8. If quiz generation fails, use the **Retry** option.

## AI Usage

- Understanding LLM and API integration concepts
- Exploring implementation approaches
- Debugging and troubleshooting
- Reviewing edge cases
- Improving UI implementation

## Known Limitations

- Quiz quality depends on the provided input and AI model response.
- Only single-choice quizzes are currently supported.
- Quiz sessions are not persisted after leaving the application.
- AI responses are not streamed.
- Authentication is not implemented.

## Time Spent

Approximately **8 hours**.

The majority of the time was spent on AI integration, structured response handling, validation, error handling, and building the interactive quiz flow.
