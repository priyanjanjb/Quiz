import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "./QuizStore";
import audio1 from "../assets/Audio/1.mp3";
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
    { id: 1, audio: audio1, groups: { "1.1":["あ ⬈ め","あ ⬊ め"], "1.2":["あ ⬈ め","あ ⬊ め"] } },
    { id: 2, audio: audio2, groups: { "2.1":["は ⬈ し","は ⬊ し"], "2.2":["は ⬈ し","は ⬊ し"] } },
    { id: 3, audio: audio3, groups: { "3.1":["か ⬈ み","か ⬊ み"], "3.2":["か ⬈ み","か ⬊ み"] } },
    { id: 4, audio: audio4, groups: { "4.1":["さ ⬈ け","さ ⬊ け"], "4.2":["さ ⬈ け","さ ⬊ け"] } },
  ];

  const handleAnswer = (key:string, value:string)=>setAnswers(prev=>({...prev,[key]:value}));
  const handleAudioPlay = (id:string)=>setAudioCount(prev=>({...prev, [id]:(prev[id]||0)+1}));

  const handleNext = ()=>{
    const timeSpent = Date.now() - startTime;
    setQuiz((prev:any)=>({...prev, form2:answers, audioCount, timeSpent:{...prev.timeSpent, form2:timeSpent}}));
    navigate("/form3");
  };
  const handleBack = ()=>{
    const timeSpent = Date.now() - startTime;
    setQuiz((prev:any)=>({...prev, form2:answers, audioCount, timeSpent:{...prev.timeSpent, form2:timeSpent}}));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#2e7d86] flex items-center justify-center">
      <div className="w-full max-w-4xl bg-[#a9c2c9] rounded-[60px] p-10">
        <h1 className="text-center text-5xl text-white mb-6">Audio Test 01</h1>
        <div className="space-y-10">
          {questions.map(q=>(
            <div key={q.id} className="flex flex-col items-center gap-4">
              <audio controls onPlay={()=>handleAudioPlay(q.id.toString())}>
                <source src={q.audio} type="audio/mpeg"/>
              </audio>
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(q.groups).map(([key, opts])=>(
                  <div key={key} className="flex flex-col items-center gap-2">
                    <p className="font-bold">{key}</p>
                    <div className="flex gap-4">
                      {opts.map((opt : any) =>(
                        <button key={opt} className={`bg-[#6aa0ab] w-24 h-10 rounded-full ${answers[key]===opt?"ring-4 ring-yellow-400":""}`} onClick={()=>handleAnswer(key,opt)}>{opt}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-12">
          <button onClick={handleBack} className="bg-gray-300 px-12 py-3 rounded-full">Back</button>
          <button onClick={handleNext} className="bg-gray-300 px-12 py-3 rounded-full">Next</button>
        </div>
      </div>
    </div>
  );
}

export default Form2;