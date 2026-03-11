import { useState } from "react";
import { useNavigate } from "react-router-dom";
import audio1 from "../assets/Audio/1.mp3"
import audio2 from "../assets/Audio/2.mp3"
import audio3 from "../assets/Audio/3.mp3"
import audio4 from "../assets/Audio/4.mp3"
function Form1() {

  const navigate = useNavigate();

  const questions = [
    { id: 1, audio: audio1, options: ["雨", "飴"] },
    { id: 2, audio: audio2, options: ["花", "鼻"] },
    { id: 3, audio: audio3, options: ["箸", "橋"] },
    { id: 4, audio: audio4, options: ["神", "紙"] }
  ];

  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<number,string>>({});

  const handleAnswer = (id:number, value:string) => {

    setAnswers((prev)=>({
      ...prev,
      [id]: value
    }));

  };

  const handleNext = () => {

    navigate("/form2",{
      state:{
        name,
        form1Answers:answers
      }
    });

  };

  return (

    <div className="min-h-screen bg-[#2e7d86] flex items-center justify-center">

      <div className="w-full max-w-4xl bg-[#a9c2c9] rounded-[60px] p-10">

        <h1 className="text-center text-5xl text-white mb-6">QUIZ</h1>

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="bg-gray-300 rounded-full px-6 py-2 mb-10"
        />

        <div className="space-y-10">
          
          {questions.map((q)=>(
            
            <div key={q.id} className="flex flex-col items-center gap-4">
              
              <audio controls>
                <source src={q.audio} type="audio/mpeg"/>
              </audio>

              <div className="flex gap-6">
                  <p>{q.id}</p>
                {q.options.map((word)=>(
                  
                  <button
                    key={word}
                    className={`bg-[#6aa0ab] w-32 h-12 rounded-full text-xl ${
                      answers[q.id]===word ? "ring-4 ring-yellow-400" : ""
                    }`}
                    onClick={()=>handleAnswer(q.id,word)}
                  >
                    {word}
                  </button>

                ))}

              </div>

            </div>

          ))}

        </div>

        <div className="flex justify-center mt-12">

          <button
            onClick={handleNext}
            className="bg-gray-300 px-12 py-3 rounded-full"
          >
            Next
          </button>

        </div>

      </div>

    </div>

  );
}

export default Form1;