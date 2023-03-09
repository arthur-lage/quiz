import { useEffect, useState } from "react";
import data from "./data.json";

interface IAnswer {
  answer: string;
  answerId: number;
}

interface IQuizQuestion {
  id: number;
  question: string;
  answers: IAnswer[];
  correct: number;
}

export function App() {
  const [quizQuestions, setQuizQuestions] = useState<IQuizQuestion[]>(data);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  function chooseRandomQuestion() {
    let currentQuestionIndex = Math.round(
      Math.random() * (quizQuestions.length - 1 - 0) + 0
    );

    setCurrentQuestion(currentQuestionIndex);
  }

  useEffect(() => {
    chooseRandomQuestion();
  }, []);

  function handleConfirmButton() {
    if (quizQuestions[currentQuestion].correct === Number(currentAnswer)) {
      chooseRandomQuestion();
      setScore((prev) => prev + 1);
    }
  }

  return (
    <div className="flex flex-col">
      <h1>quiz</h1>

      <div key={quizQuestions[currentQuestion].id}>
        <span>{quizQuestions[currentQuestion].question}</span>

        <div className="flex flex-col">
          {quizQuestions[currentQuestion].answers.map(
            ({ answer, answerId }) => (
              <div key={answerId}>
                <input
                  onChange={(e) => setCurrentAnswer(String(e.target.value))}
                  value={String(answerId)}
                  type="radio"
                  name="answer"
                  id={String(answerId)}
                />
                <label htmlFor={String(answerId)}>{answer}</label>
              </div>
            )
          )}
        </div>

        <button onClick={handleConfirmButton}>Confirm</button>
      </div>
    </div>
  );
}
