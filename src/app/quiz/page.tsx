'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the primary goal of a DDoS attack?",
    options: [
      "Make a system or network unavailable",
      "Steal sensitive data",
      "Gain administrative access",
      "Install malware"
    ],
    correctAnswer: 0,
    explanation: "A DDoS (Distributed Denial of Service) attack aims to make a system, network, or service unavailable by overwhelming it with traffic from multiple sources.",
    difficulty: "easy",
    points: 10
  },
  {
    id: 2,
    question: "Which of these is NOT a common type of DDoS attack?",
    options: [
      "UDP Flood",
      "SQL Injection",
      "SYN Flood",
      "Ping of Death"
    ],
    correctAnswer: 1,
    explanation: "SQL Injection is a different type of attack that exploits database vulnerabilities, not a DDoS attack.",
    difficulty: "easy",
    points: 10
  },
  {
    id: 3,
    question: "What is a botnet in the context of DDoS attacks?",
    options: [
      "A network monitoring system",
      "A type of firewall",
      "A group of compromised computers controlled by an attacker",
      "A network security tool"
    ],
    correctAnswer: 2,
    explanation: "A botnet is a network of compromised computers (zombies) controlled by an attacker to launch coordinated attacks.",
    difficulty: "medium",
    points: 15
  },
  {
    id: 4,
    question: "Which defense mechanism distributes traffic across multiple servers?",
    options: [
      "Antivirus",
      "Load Balancer",
      "Firewall",
      "Encryption"
    ],
    correctAnswer: 1,
    explanation: "Load balancers distribute incoming traffic across multiple servers to prevent overload.",
    difficulty: "medium",
    points: 15
  },
  {
    id: 5,
    question: "What is the purpose of rate limiting in DDoS defense?",
    options: [
      "To scan for viruses",
      "To compress data",
      "To restrict the number of requests from a single source",
      "To encrypt traffic"
    ],
    correctAnswer: 2,
    explanation: "Rate limiting helps prevent DDoS attacks by restricting the number of requests a single source can make.",
    difficulty: "medium",
    points: 15
  },
  {
    id: 6,
    question: "What is a SYN flood attack?",
    options: [
      "Sending incomplete TCP connection requests",
      "Flooding with complete connections",
      "Sending encrypted packets",
      "Overloading with HTTP requests"
    ],
    correctAnswer: 0,
    explanation: "A SYN flood attack involves sending many incomplete TCP connection requests to exhaust server resources.",
    difficulty: "hard",
    points: 20
  },
  {
    id: 7,
    question: "Which layer of the OSI model do volumetric DDoS attacks typically target?",
    options: [
      "Session Layer (5)",
      "Network Layer (3)",
      "Application Layer (7)",
      "Physical Layer (1)"
    ],
    correctAnswer: 1,
    explanation: "Volumetric DDoS attacks typically target the Network Layer by overwhelming network bandwidth.",
    difficulty: "hard",
    points: 20
  },
  {
    id: 8,
    question: "What is a reflection attack in DDoS?",
    options: [
      "Using mirrors to reflect traffic",
      "Encrypting attack traffic",
      "Using legitimate servers to amplify attack traffic",
      "Reflecting packets back to the source"
    ],
    correctAnswer: 2,
    explanation: "A reflection attack uses legitimate servers to amplify attack traffic by sending requests with spoofed source addresses.",
    difficulty: "hard",
    points: 20
  },
  {
    id: 9,
    question: "What is the main difference between DoS and DDoS attacks?",
    options: [
      "DDoS uses multiple source computers",
      "DoS is more powerful",
      "DDoS only targets websites",
      "DoS is always successful"
    ],
    correctAnswer: 0,
    explanation: "The main difference is that DDoS (Distributed Denial of Service) attacks use multiple computers, while DoS attacks come from a single source.",
    difficulty: "easy",
    points: 10
  },
  {
    id: 10,
    question: "Which is an effective mitigation strategy against DDoS attacks?",
    options: [
      "Turning off the server",
      "Using multiple firewalls only",
      "Implementing a comprehensive defense strategy",
      "Increasing server RAM"
    ],
    correctAnswer: 2,
    explanation: "An effective mitigation strategy combines multiple approaches including traffic filtering, rate limiting, load balancing, and traffic analysis.",
    difficulty: "medium",
    points: 15
  }
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<{text: string, index: number}[]>([]);

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
    shuffleOptionsForQuestion(shuffled[0]);
  }, []);

  // Shuffle options for a question
  const shuffleOptionsForQuestion = (question: Question) => {
    const options = question.options.map((text, originalIndex) => ({
      text,
      index: originalIndex
    }));
    setShuffledOptions(shuffleArray(options));
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (answeredQuestions.includes(currentQuestion)) return;
    
    const selectedOriginalIndex = shuffledOptions[optionIndex].index;
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    
    if (selectedOriginalIndex === shuffledQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + shuffledQuestions[currentQuestion].points);
    }
    
    setAnsweredQuestions(prev => [...prev, currentQuestion]);
  };

  const nextQuestion = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      shuffleOptionsForQuestion(shuffledQuestions[currentQuestion + 1]);
    } else {
      setQuizComplete(true);
    }
  };

  const getScoreColor = () => {
    const maxScore = shuffledQuestions.reduce((acc, q) => acc + q.points, 0);
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreMessage = () => {
    const maxScore = shuffledQuestions.reduce((acc, q) => acc + q.points, 0);
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'Excellent! You have a strong understanding of DDoS attacks!';
    if (percentage >= 60) return 'Good job! Keep learning about DDoS attacks!';
    return 'Keep studying! Understanding DDoS attacks is important for cybersecurity.';
  };

  if (quizComplete) {
    const maxScore = shuffledQuestions.reduce((acc, q) => acc + q.points, 0);
    const percentage = (score / maxScore) * 100;
    
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full bg-gray-800 rounded-xl p-8"
        >
          <h2 className="text-3xl font-bold mb-6">Quiz Complete!</h2>
          <div className="space-y-4">
            <p className="text-xl">
              Your Score: <span className={getScoreColor()}>{score}</span> out of {maxScore}
            </p>
            <p className="text-xl">
              Percentage: <span className={getScoreColor()}>{Math.round(percentage)}%</span>
            </p>
            <p className="text-gray-400 mt-4">{getScoreMessage()}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!shuffledQuestions.length || !shuffledOptions.length) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  }

  const question = shuffledQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4">
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <div>Question {currentQuestion + 1} of {shuffledQuestions.length}</div>
          <div>Score: {score}</div>
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-8"
      >
        <div className="space-y-6">
          {/* Difficulty Badge */}
          <div className="flex justify-between items-center mb-6">
            <span className={`px-3 py-1 rounded text-sm ${
              question.difficulty === 'easy' ? 'bg-green-500/20 text-green-500' :
              question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
              'bg-red-500/20 text-red-500'
            }`}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </span>
            <span className="text-sm text-gray-400">Points: {question.points}</span>
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold">{question.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {shuffledOptions.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
                disabled={answeredQuestions.includes(currentQuestion)}
                className={`w-full p-4 rounded-lg text-left transition-colors ${
                  selectedAnswer === null ? 'bg-gray-700 hover:bg-gray-600' :
                  option.index === question.correctAnswer ? 'bg-green-500/20 text-green-500' :
                  index === selectedAnswer ? 'bg-red-500/20 text-red-500' :
                  'bg-gray-700'
                } ${answeredQuestions.includes(currentQuestion) ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {option.text}
              </motion.button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gray-700 rounded-lg"
            >
              <p className="text-gray-300">{question.explanation}</p>
            </motion.div>
          )}

          {/* Next Question Button */}
          {showExplanation && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={nextQuestion}
              className="mt-6 w-full bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              {currentQuestion === shuffledQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizPage;
