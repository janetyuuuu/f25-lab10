import { useRef, useState } from 'react';
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
// Hint: Take advantage of the QuizQuestion interface
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  // TODO: Task1 - Seprate the logic of quiz from the UI.
  // Hint: Take advantage of QuizCore to manage quiz state separately from the UI.
  const coreRef = useRef<QuizCore | null>(null);
  if (!coreRef.current) {
    coreRef.current = new QuizCore();
  }

  const core = coreRef.current;
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    if (selectedAnswer === null) return;
      core.answerQuestion(selectedAnswer);
    core.nextQuestion();
    setSelectedAnswer(null);
  };

  const currentQuestion = core.getCurrentQuestion();
  const score = core.getScore();
  const totalQuestions = core.getTotalQuestions();
  const isLastQuestion = !core.hasNextQuestion();

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {totalQuestions}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>
        {isLastQuestion ? 'Submit' : 'Next Question'}
      </button>
    </div>
  );
};

export default Quiz;