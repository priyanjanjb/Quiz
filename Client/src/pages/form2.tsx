import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "./QuizStore";
import audio1 from "../assets/Audio/1 .mp3";
import audio2 from "../assets/Audio/2.mp3";
import audio3 from "../assets/Audio/3.mp3";
import audio4 from "../assets/Audio/4.mp3";

function Form2() {
  const navigate = useNavigate();
  const { quiz, setQuiz } = useQuiz();

  const [startTime, setStartTime] = useState(Date.now());
  const [answers, setAnswers] = useState<Record<string,string>>(quiz.form2 || {});
  const [audioCount, setAudioCount] = useState<Record<string,number>>(quiz.audioCount || {});

  useEffect(()=>setStartTime(Date.now()), []);

  const questions = [
    { id: 1, audio: audio1, groups: { "1.1":["あ ⬈め","あ ⬊め"], "1.2":["あ ⬈め","あ ⬊め"] } },
    { id: 2, audio: audio2, groups: { "2.1":["は ⬈し","は ⬊し"], "2.2":["は ⬈し","は ⬊し"] } },
    { id: 3, audio: audio3, groups: { "3.1":["か ⬈み","か ⬊め"], "3.2":["か ⬈み","か ⬊め"] } },
    { id: 4, audio: audio4, groups: { "4.1":["さ ⬈け","さ ⬊け"], "4.2":["さ ⬈け","さ ⬊け"] } },
  ];

  const handleAnswer = (key:string, value:string)=>
    setAnswers(prev=>({...prev,[key]:value}));

  const handleAudioPlay = (id:string)=>
    setAudioCount(prev=>({...prev, [id]:(prev[id]||0)+1}));

  const handleNext = ()=>{
    const timeSpent = Date.now() - startTime;
    setQuiz((prev:any)=>({
      ...prev,
      form2:answers,
      audioCount,
      timeSpent:{...prev.timeSpent, form2:timeSpent}
    }));
    navigate("/form3");
  };

  const handleBack = ()=>{
    const timeSpent = Date.now() - startTime;
    setQuiz((prev:any)=>({
      ...prev,
      form2:answers,
      audioCount,
      timeSpent:{...prev.timeSpent, form2:timeSpent}
    }));
    navigate("/");
  };

  return (
    <div className="
      min-h-screen bg-[#2e7d86]
      flex items-center justify-center
      px-3 sm:px-6 lg:px-10 py-6
    ">

      {/* MAIN CARD */}
      <div className="
        w-full
        max-w-4xl
        bg-[#a9c2c9]
        rounded-3xl sm:rounded-[50px] lg:rounded-[60px]
        p-4 sm:p-8 lg:p-10
      ">

        {/* TITLE */}
        <h1 className="
          text-center text-white mb-8
          text-2xl sm:text-4xl lg:text-5xl
          font-bold
        ">
          Audio Test 01
        </h1>

        {/* QUESTIONS */}
        <div className="space-y-12">

          {questions.map(q=>(
            <div key={q.id} className="flex flex-col items-center gap-5">

              {/* AUDIO PLAYER */}
              <audio
                controls
                className="w-full max-w-md"
                onPlay={()=>handleAudioPlay(q.id.toString())}
              >
                <source src={q.audio} type="audio/mpeg"/>
              </audio>

              {/* GROUPS */}
              <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-6 sm:gap-8
                w-full
                justify-items-center
              ">

                {Object.entries(q.groups).map(([key, opts])=>(
                  <div key={key} className="flex flex-col items-center gap-3">

                    <p className="font-bold text-lg">{key}</p>

                    <div className="
                      flex
                      flex-wrap
                      justify-center
                      gap-3 sm:gap-4
                    ">
                      {opts.map((opt:any)=>(
                        <button
                          key={opt}
                          onClick={()=>handleAnswer(key,opt)}
                          className={`
                            bg-[#6aa0ab]
                            rounded-full
                            transition
                            text-sm sm:text-base
                            px-4 py-2
                            sm:w-28 sm:h-11
                            hover:scale-105
                            ${answers[key]===opt
                              ?"ring-4 ring-yellow-400"
                              :""
                            }
                          `}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                  </div>
                ))}

              </div>
            </div>
          ))}

        </div>

        {/* NAV BUTTONS */}
        <div className="
          flex flex-col sm:flex-row
          justify-between
          gap-4
          mt-12
        ">
          <button
            onClick={handleBack}
            className="
              w-full sm:w-auto
              bg-gray-300
              px-8 sm:px-12
              py-3
              rounded-full
              hover:bg-gray-400
              transition
            "
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="
              w-full sm:w-auto
              bg-gray-300
              px-8 sm:px-12
              py-3
              rounded-full
              hover:bg-gray-400
              transition
            "
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

export default Form2;