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

  const calculateScore = () => {
    const correctAnswers: Record<string, string> = {
      "1.1": "あ ⬈ め",
      "1.2": "あ ⬊ め",
      "2.1": "は ⬊ し",
      "2.2": "は ⬈ し",
      "3.1": "か ⬊ み",
      "3.2": "か ⬈ み",
      "4.1": "さ ⬈ け",
      "4.2": "さ ⬊ け",
      "5.1": "か ⬊ き",
      "5.2": "か ⬈ き",
    };

    const allAnswers = {
      ...quiz.form1,
      ...quiz.form2,
      ...quiz.form3,
      ...answers,
    };

    let score = 0;
    Object.keys(correctAnswers).forEach(key => {
      if (allAnswers[key] === correctAnswers[key]) score++;
    });
    return score;
  };

  const handleSubmit = async () => {
    setQuiz((prev: any) => ({ ...prev, form3: answers, answerType }));

    const allResponses = {
      ...quiz.form1,
      ...quiz.form2,
      ...quiz.form3,
      ...answers
    };

    const score = calculateScore();

    const payload = {
      name: quiz.form1.name,
      responses: allResponses,
      answerType,
      score
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      alert(`Score: ${score}\n${data.message}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    setQuiz((prev: any) => ({ ...prev, form3: answers, answerType }));
    navigate("/form2");
  };

  return (
    <div className="min-h-screen bg-teal-700 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-[#a9c2c9] rounded-[60px] p-10">
        

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
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={answerType===type}
                  onChange={e => setAnswerType(e.target.value)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-12">
          <button onClick={handleBack} className="bg-gray-300 px-12 py-3 rounded-full">Back</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-12 py-3 rounded-full">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Form3;