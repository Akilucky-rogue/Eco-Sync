
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle, XCircle, Award, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface EnvironmentalQuizProps {
  topic?: string;
  onComplete?: (score: number, totalQuestions: number) => void;
}

const EnvironmentalQuiz = ({ topic = "Marine Conservation", onComplete }: EnvironmentalQuizProps) => {
  const { toast } = useToast();
  
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What percentage of the Earth's surface is covered by oceans?",
      options: ["50%", "61%", "71%", "81%"],
      correctAnswer: 2,
      explanation: "Oceans cover approximately 71% of the Earth's surface, making them crucial for global climate regulation.",
      difficulty: 'easy'
    },
    {
      id: 2,
      question: "Which of these marine animals is most affected by plastic pollution?",
      options: ["Dolphins", "Sea Turtles", "Whales", "All of the above"],
      correctAnswer: 3,
      explanation: "All marine animals are significantly affected by plastic pollution, which can cause entanglement, ingestion, and habitat destruction.",
      difficulty: 'medium'
    },
    {
      id: 3,
      question: "How long does it take for a plastic bottle to decompose in the ocean?",
      options: ["50 years", "100 years", "450 years", "1000 years"],
      correctAnswer: 2,
      explanation: "A plastic bottle can take up to 450 years to decompose in marine environments, causing long-term pollution.",
      difficulty: 'hard'
    },
    {
      id: 4,
      question: "What is the main cause of coral bleaching?",
      options: ["Overfishing", "Ocean acidification", "Rising water temperatures", "Plastic pollution"],
      correctAnswer: 2,
      explanation: "Rising water temperatures due to climate change is the primary cause of coral bleaching events worldwide.",
      difficulty: 'medium'
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswers(prev => [...prev, selectedAnswer]);
    setShowExplanation(true);

    toast({
      title: isCorrect ? "Correct!" : "Not quite right",
      description: isCorrect ? "Well done! +10 points" : "Better luck next time!",
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
      onComplete?.(score, questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
    setAnswers([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-[#014F86]">
            <Award className="h-6 w-6" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-4">
            <div className="text-6xl">🎉</div>
            <div>
              <div className={`text-4xl font-bold ${getScoreColor(percentage)}`}>
                {score}/{questions.length}
              </div>
              <div className="text-gray-600">({percentage}% correct)</div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
              <p className="text-[#014F86] font-medium">
                {percentage >= 80 ? "Excellent! You're a marine conservation expert!" :
                 percentage >= 60 ? "Good job! Keep learning about marine conservation." :
                 "Nice try! Every quiz helps you learn more about our oceans."}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleRestart}
              variant="outline"
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center gap-2 text-[#014F86]">
            <Brain className="h-6 w-6" />
            {topic} Quiz
          </CardTitle>
          <Badge className={getDifficultyColor(question.difficulty)}>
            {question.difficulty}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#014F86] mb-4">
            {question.question}
          </h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 border-2 rounded-lg transition-all duration-200 ";
              
              if (showExplanation) {
                if (index === question.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer && index !== question.correctAnswer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
                }
              } else {
                buttonClass += selectedAnswer === index
                  ? "border-[#FF6F61] bg-[#FF6F61]/10"
                  : "border-gray-200 hover:border-[#014F86] hover:bg-blue-50";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                    {showExplanation && index === question.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                    )}
                    {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-[#014F86] mb-2">Explanation:</h4>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <div className="text-sm text-gray-500">
            {showExplanation ? "Great! Let's continue." : "Select an answer to continue"}
          </div>
          
          {!showExplanation ? (
            <Button 
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="bg-[#FF6F61] hover:bg-[#FF6F61]/90"
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion}
              className="bg-[#014F86] hover:bg-[#014F86]/90"
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalQuiz;
