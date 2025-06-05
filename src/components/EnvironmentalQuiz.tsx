
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Brain, Award } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  aiGenerated: boolean;
}

const EnvironmentalQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Mock quiz questions (in real app, these would come from KakushIN API)
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What percentage of ocean litter is made up of plastics?",
      options: ["50%", "80%", "95%", "100%"],
      correctAnswer: 1,
      explanation: "Over 80% of marine debris consists of plastic items like bottles and bags, which come from coastal activities and runoff.",
      difficulty: 'medium',
      aiGenerated: true
    },
    {
      id: 2,
      question: "How long does it take for a plastic bottle to decompose in the ocean?",
      options: ["10 years", "50 years", "100 years", "450+ years"],
      correctAnswer: 3,
      explanation: "Plastic bottles can take 450+ years to decompose in marine environments, releasing harmful microplastics throughout the process.",
      difficulty: 'easy',
      aiGenerated: true
    },
    {
      id: 3,
      question: "Which marine animals are most affected by plastic pollution?",
      options: ["Only fish", "Sea turtles and seabirds", "All marine life", "Coral reefs only"],
      correctAnswer: 2,
      explanation: "Plastic pollution affects all marine life, from microscopic plankton to large whales, disrupting the entire ocean food chain.",
      difficulty: 'hard',
      aiGenerated: true
    },
    {
      id: 4,
      question: "What is the most effective way to reduce ocean plastic pollution?",
      options: ["Ocean cleanups only", "Prevent plastic from entering oceans", "Use biodegradable plastics", "Filter ocean water"],
      correctAnswer: 1,
      explanation: "Prevention is key - stopping plastic waste from entering waterways through better waste management and reducing single-use plastics.",
      difficulty: 'medium',
      aiGenerated: true
    },
    {
      id: 5,
      question: "What are microplastics?",
      options: ["Very small plastic bags", "Plastic particles less than 5mm", "Plastic used in medicine", "Recycled plastic"],
      correctAnswer: 1,
      explanation: "Microplastics are plastic particles smaller than 5mm that result from the breakdown of larger plastic items and are now found throughout the ocean.",
      difficulty: 'easy',
      aiGenerated: true
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizComplete(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "🌟 Ocean Expert! You're making waves in environmental knowledge!";
    if (percentage >= 60) return "🐠 Marine Advocate! Keep up the great work!";
    if (percentage >= 40) return "🌊 Learning Navigator! You're on the right course!";
    return "🐚 Ocean Explorer! Every journey starts with a single step!";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (quizComplete) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center bg-gradient-to-r from-[#C5E4CF] to-[#F6EFD2]">
          <CardTitle className="text-[#014F86] flex items-center justify-center gap-2">
            <Award className="h-6 w-6" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <div className="mb-6">
            <div className="text-4xl font-bold text-[#FF6F61] mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-lg text-[#014F86] mb-4">{getScoreMessage()}</p>
            <div className="text-sm text-gray-600 mb-4">
              You earned <strong>{score * 10} points</strong> for your environmental knowledge!
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={resetQuiz}
              className="w-full bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white"
            >
              Take Quiz Again
            </Button>
            <p className="text-xs text-gray-500">
              <Brain className="h-4 w-4 inline mr-1" />
              Powered by KakushIN LLM - Adaptive learning technology
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-[#014F86]">Environmental Quiz</CardTitle>
          <Badge className={getDifficultyColor(currentQ.difficulty)}>
            {currentQ.difficulty}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}/{currentQuestion}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {!showResult ? (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#014F86]">
              {currentQ.question}
            </h3>
            
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`w-full text-left justify-start p-4 h-auto ${
                    selectedAnswer === index 
                      ? "bg-[#FF6F61] hover:bg-[#FF6F61]/90 text-white" 
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="font-medium mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              ))}
            </div>
            
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="w-full bg-[#014F86] hover:bg-[#014F86]/90 text-white"
            >
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
            
            {currentQ.aiGenerated && (
              <p className="text-xs text-gray-500 text-center">
                <Brain className="h-4 w-4 inline mr-1" />
                Powered by KakushIN LLM
              </p>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-lg">
              {selectedAnswer === currentQ.correctAnswer ? (
                <>
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-green-600 font-medium">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-red-600" />
                  <span className="text-red-600 font-medium">Incorrect</span>
                </>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">{currentQ.explanation}</p>
            </div>
            
            <div className="text-sm text-gray-600">
              Moving to next question...
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnvironmentalQuiz;
