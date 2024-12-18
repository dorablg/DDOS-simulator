export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the primary goal of a DDoS attack?",
    options: [
      "Steal sensitive data",
      "Make a system or network unavailable",
      "Gain administrative access",
      "Install malware"
    ],
    correctAnswer: 1,
    explanation: "A DDoS (Distributed Denial of Service) attack aims to make a system, network, or service unavailable by overwhelming it with traffic from multiple sources.",
    difficulty: "easy",
    points: 10
  }
  // Add other questions here
];
