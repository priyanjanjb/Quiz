import { useState } from "react";
import { useLocation } from "react-router-dom";
import audio5 from "../assets/Audio/5.mp3";

function Form3() {
  const location = useLocation();
  const { name, form1Answers } = location.state;

  const questions = [
    {
      id: 5,
      audio: audio5,
      groups: {
        "5.1": ["か ⬈ き", "か ⬊ き"],
        "5.2": ["か ⬈ き", "か ⬊ き"]
      }
    },
    
  ];

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

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answerType, setAnswerType] = useState("");

  const handleAnswer = (groupKey: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [groupKey]: value
    }));
  };

  const handleSubmit = async () => {

    const allAnswers = {
      ...form1Answers,
      ...answers
    };

    // ✅ Calculate score
    let score = 0;

    Object.keys(correctAnswers).forEach((key) => {
      if (allAnswers[key] === correctAnswers[key]) {
        score++;
      }
    });

    const payload = {
      name,
      responses: allAnswers,
      answerType,
      score
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      alert(`Score: ${score}/12\n${data.message}`);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-teal-700 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-[#a9c2c9] rounded-[60px] p-10">

        <div className="space-y-10">

          {questions.map((q) => (
            <div key={q.id} className="flex flex-col items-center gap-4">

              <audio controls>
                <source src={q.audio} type="audio/mpeg" />
              </audio>

              <div className="grid grid-cols-2 gap-6">

                {Object.entries(q.groups).map(([groupKey, options]) => (
                  <div key={groupKey} className="flex flex-col items-center gap-2">

                    <p className="font-bold">{groupKey}</p>

                    <div className="flex gap-4">
                      {options.map((word: string) => (
                        <button
                          key={word}
                          onClick={() => handleAnswer(groupKey, word)}
                          className={`bg-[#6aa0ab] w-24 h-10 rounded-full ${
                            answers[groupKey] === word
                              ? "ring-4 ring-yellow-400"
                              : ""
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

        </div>

        {/* Answer Type */}
        <div className="text-center mt-10">
          <h2 className="mb-4">How did you answer?</h2>

          <div className="flex flex-col items-center gap-2">
            {["consciously", "unconsciously", "randomly", "unintentionally"].map((type) => (
              <label key={type}>
                <input
                  type="radio"
                  value={type}
                  name="type"
                  onChange={(e) => setAnswerType(e.target.value)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={handleSubmit}
            className="bg-gray-300 px-12 py-4 rounded-full"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}

export default Form3;