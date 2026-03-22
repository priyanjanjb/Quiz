import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "./QuizStore";
import audio5 from "../assets/Audio/5.mp3";

function Form3() {
  const navigate = useNavigate();
  const { quiz, setQuiz } = useQuiz();

  const questions = [
    { id: 5, audio: audio5, groups: { "5.1": ["か ⬈ き", "か ⬊ き"], "5.2": ["か ⬈ き", "か ⬊ き"] } },
  ];

  const [answers, setAnswers] = useState<Record<string, string>>(quiz.form3 || {});
  const [answerType, setAnswerType] = useState(quiz.answerType || "");

  const handleAnswer = (groupKey: string, value: string) => {
    setAnswers(prev => ({ ...prev, [groupKey]: value }));
  };

  const handleNext = () => {
    setQuiz((prev: any) => ({ ...prev, form3: answers, answerType }));
    navigate("/form4");
  };

  const handleBack = () => {
    setQuiz((prev: any) => ({ ...prev, form3: answers, answerType }));
    navigate("/form2");
  };

  return (
    <div className="min-h-screen bg-teal-700 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-[#a9c2c9] rounded-[60px] p-10">
        <h1 className="text-center text-5xl text-white mb-6">Audio Test 02</h1>

        {questions.map(q => (
          <div key={q.id} className="flex flex-col items-center gap-4">
            <audio controls>
              <source src={q.audio} type="audio/mpeg" />
            </audio>

            <div className="grid grid-cols-2 gap-6">
              {Object.entries(q.groups).map(([groupKey, options]) => (
                <div key={groupKey} className="flex flex-col items-center gap-2">
                  <p className="font-bold">{groupKey}</p>
                  <div className="flex gap-4">
                    {options.map(word => (
                      <button
                        key={word}
                        onClick={() => handleAnswer(groupKey, word)}
                        className={`bg-[#6aa0ab] w-24 h-10 rounded-full ${
                          answers[groupKey] === word ? "ring-4 ring-yellow-400" : ""
                        }`}
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-10">
          <h2 className="mb-4">How did you answer?</h2>
          <div className="flex flex-col items-center gap-2">
            {["consciously","unconsciously","randomly","unintentionally"].map(type => (
              <label key={type}>
                <input type="radio" name="type" value={type} checked={answerType===type} onChange={e => setAnswerType(e.target.value)} />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-12">
          <button onClick={handleBack} className="bg-gray-300 px-12 py-3 rounded-full">Back</button>
          <button onClick={handleNext} className="bg-gray-300 px-12 py-3 rounded-full">Next</button>
        </div>
      </div>
    </div>
  );
}

export default Form3;