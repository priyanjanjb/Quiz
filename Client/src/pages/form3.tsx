import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "./QuizStore";
import audio5 from "../assets/Audio/5.mp3";

function Form3() {
  const navigate = useNavigate();
  const { quiz, setQuiz } = useQuiz();
  const [startTime,setStartTime]=useState(Date.now());
  const [answers,setAnswers]=useState<Record<string,string>>(quiz.form3||{});
  const [answerType,setAnswerType]=useState(quiz.answerType||"");
  const [audioCount,setAudioCount]=useState<Record<string,number>>(quiz.audioCount||{});

  useEffect(()=>setStartTime(Date.now()),[]);

  const questions=[{id:5,audio:audio5,groups:{"5.1":["か ⬈ き","か ⬊ き"],"5.2":["か ⬈ き","か ⬊ き"]}}];

  const handleAnswer=(key:string,value:string)=>setAnswers(prev=>({...prev,[key]:value}));
  const handleAudioPlay=(id:string)=>setAudioCount(prev=>({...prev,[id]:(prev[id]||0)+1}));

  const handleBack=()=>{
    const timeSpent=Date.now()-startTime;
    setQuiz((prev:any)=>({...prev,form3:answers,answerType,audioCount,timeSpent:{...prev.timeSpent,form3:timeSpent}}));
    navigate("/form2");
  };

  const handleSubmit=async()=>{
    const timeSpent=Date.now()-startTime;
    setQuiz((prev:any)=>({...prev,form3:answers,answerType,audioCount,timeSpent:{...prev.timeSpent,form3:timeSpent}}));

    const payload={
      name:quiz.form1.name,
      responses:{...quiz.form1,...quiz.form2,...quiz.form3,...answers},
      answerType,
      audioCount,
      timeSpent:{...quiz.timeSpent,form3:timeSpent}
    };

    try{
      const res=await fetch(`${import.meta.env.VITE_API_URL}/api/submit`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
      });
      const data=await res.json();
      alert(`Responses saved!\n${data.message}`);
    }catch(err){console.error(err);}
  };

  return (
    <div className="min-h-screen bg-teal-700 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-[#a9c2c9] rounded-[60px] p-10">
        <h1 className="text-center text-5xl text-white mb-6">Audio Test 02</h1>
        {questions.map(q=>(
          <div key={q.id} className="flex flex-col items-center gap-4">
            <audio controls onPlay={()=>handleAudioPlay(q.id.toString())}>
              <source src={q.audio} type="audio/mpeg"/>
            </audio>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(q.groups).map(([key,opts])=>(
                <div key={key} className="flex flex-col items-center gap-2">
                  <p className="font-bold">{key}</p>
                  <div className="flex gap-4">
                    {opts.map(opt=>(
                      <button key={opt} className={`bg-[#6aa0ab] w-24 h-10 rounded-full ${answers[key]===opt?"ring-4 ring-yellow-400":""}`} onClick={()=>handleAnswer(key,opt)}>{opt}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="text-center mt-10">
          <h2 className="mb-4">How did you answer?</h2>
          {["consciously","unconsciously","randomly","unintentionally"].map(type=>(
            <label key={type}>
              <input type="radio" name="type" value={type} checked={answerType===type} onChange={e=>setAnswerType(e.target.value)}/> {type}
            </label>
          ))}
        </div>
        <div className="flex justify-between mt-12">
          <button onClick={handleBack} className="bg-gray-300 px-12 py-3 rounded-full">Back</button>
          <button onClick={handleSubmit} className="bg-green-500 text-white px-12 py-3 rounded-full">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Form3;