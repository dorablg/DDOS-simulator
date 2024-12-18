import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);

  // Shuffle array function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize quiz with shuffled questions
  useEffect(() => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled);
    shuffleOptions(shuffled[0]);
  }, [questions]);

  // Shuffle options for current question
  const shuffleOptions = (question: QuizQuestion) => {
    const shuffled = shuffleArray(question.options);
    setShuffledOptions(shuffled);
    setCorrectAnswerIndex(shuffled.indexOf(question.options[question.correct]));
  };

  const handleAnswerClick = (selectedIndex: number) => {
    if (selectedIndex === correctAnswerIndex) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuestions.length) {
      setCurrentQuestion(nextQuestion);
      shuffleOptions(shuffledQuestions[nextQuestion]);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled);
    shuffleOptions(shuffled[0]);
  };

  if (!shuffledQuestions.length) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 rounded-lg p-6 mt-8"
    >
      <h2 className="text-2xl font-bold mb-6">Test Your Knowledge</h2>
      
      {showScore ? (
        <div className="text-center">
          <h3 className="text-xl mb-4">Quiz Complete!</h3>
          <p className="text-2xl font-bold mb-4">
            Your score: {score} out of {shuffledQuestions.length}
          </p>
          <button
            onClick={restartQuiz}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p className="text-lg mb-2">Question {currentQuestion + 1} of {shuffledQuestions.length}</p>
            <h3 className="text-xl font-semibold">{shuffledQuestions[currentQuestion].question}</h3>
          </div>
          <div className="space-y-3">
            {shuffledOptions.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerClick(index)}
                className="w-full text-left p-3 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Quiz;
