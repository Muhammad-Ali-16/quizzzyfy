import { useState } from "react"

function App() {

  const [isStarted, setIsStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState('')
  const [error, setError] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [isPassed, setIsPassed] = useState(false)


  const QuizData = [
    {
      question: 'Which planet is known as the Red Planet?',
      answers: [
        { option: 'a', answerData: 'Mars' },
        { option: 'b', answerData: 'Venus' },
        { option: 'c', answerData: 'Jupiter' },
        { option: 'd', answerData: 'Mercury' }
      ],
      correctOption: 'a'
    },
    {
      question: 'What is the largest ocean on Earth?',
      answers: [
        { option: 'a', answerData: 'Atlantic Ocean' },
        { option: 'b', answerData: 'Indian Ocean' },
        { option: 'c', answerData: 'Pacific Ocean' },
        { option: 'd', answerData: 'Arctic Ocean' }
      ],
      correctOption: 'c'
    },
    {
      question: 'What is the chemical symbol for gold?',
      answers: [
        { option: 'a', answerData: 'Ag' },
        { option: 'b', answerData: 'Au' },
        { option: 'c', answerData: 'Gd' },
        { option: 'd', answerData: 'Go' }
      ],
      correctOption: 'b'
    },
    {
      question: 'which one is the capital of germany?',
      answers: [
        { option: 'a', answerData: 'Berlin' },
        { option: 'b', answerData: 'Hamburg' },
        { option: 'c', answerData: 'Munich' },
        { option: 'd', answerData: 'Bermen' }
      ],
      correctOption: 'a'
    },
    {
      question: 'Which country has the highest life expectancy?',
      answers: [
        { option: 'a', answerData: 'Germany' },
        { option: 'b', answerData: 'Japan' },
        { option: 'c', answerData: 'Finland' },
        { option: 'd', answerData: 'USA' }
      ],
      correctOption: 'b'
    },
  ]


  const HandleSubmit = (selected) => {
    const correct = currentQuestion.correctOption;
    setSelectedOption('')

    if (selected === correct) {
      setScore(prev => prev + 1)
    }

    if (selectedOption === '') {
      setError(true)
      return;
    }
    setError(false)

    if (currentIndex < QuizData.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    else {
      setIsFinished(true);

      if ((score / QuizData.length) *100 >= 50) {
        setIsPassed(true);
      }
      else {
        setIsPassed(false);
      }
    }

  }

  const HandleRestart = () => {
    setIsStarted(false)
    setCurrentIndex(0)
    setSelectedOption('')
    setScore(0)
    setError(false)
    setIsFinished(false)
  }

  const currentQuestion = QuizData[currentIndex];

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-green-50 p-4 select-none">
      {isStarted ? (
        !isFinished ? (
          <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg border border-gray-200">
            <h1 className="text-lg font-semibold mb-4 text-blue-700">
              Question {currentIndex + 1}/{QuizData.length}
            </h1>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-700">
                {currentQuestion.question}
              </h2>
            </div>
            <div className="space-y-3 mb-4">
              {currentQuestion.answers.map((answer) => (
                <div
                  key={answer.option}
                  onClick={() => setSelectedOption(answer.option)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${answer.option === selectedOption
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-100 hover:bg-blue-100 border-gray-300"
                    }`}
                >
                  {answer.answerData}
                </div>
              ))}
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-3">
                Please select an option before continuing.
              </div>
            )}
            <button
              type="button"
              onClick={() => HandleSubmit(selectedOption)}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg font-semibold"
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg text-center border border-gray-200">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Quiz Finished</h1>
            {isPassed ? (
              <div className="text-green-600 text-lg font-semibold mb-4">
                Congratulations! You passed the quiz.
              </div>
            ) : (
              <div className="text-red-500 text-lg font-semibold mb-4">
                Better luck next time. You didn’t pass.
              </div>
            )}
            <h2 className="text-lg text-gray-600 mb-6">
              Your Score: <span className="font-semibold text-green-600">{score}</span> / {QuizData.length}
            </h2>
            <button
              type="button"
              onClick={HandleRestart}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl text-lg font-semibold"
            >
              Restart Quiz
            </button>
          </div>
        )
      ) : (
        <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg border border-gray-200">
          <h1 className="text-xl font-bold text-blue-700 mb-4">
            Basic Instructions for the Quiz
          </h1>
          <ul className="text-gray-600 list-disc list-inside mb-6 space-y-2">
            <li>Read each question carefully before answering.</li>
            <li>Click <strong>Submit Answer</strong> to move to the next question.</li>
            <li>You cannot go back to previous questions.</li>
            <li>Each correct answer increases your score.</li>
            <li>No negative marking for wrong answers.</li>
            <li>A minimum score of 50% is required to pass.</li>
            <li>Do not refresh or close the window during the quiz.</li>
          </ul>
          <button
            type="button"
            onClick={() => setIsStarted(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold"
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );

}

export default App
