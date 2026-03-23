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

  const questions=[
    {id:5,audio:audio5,groups:{
      "5.1":["か ⬈き","か ⬊き"],
      "5.2":["か ⬈き","か ⬊き"]
    }}
  ];

  const handleAnswer=(key:string,value:string)=>
    setAnswers(prev=>({...prev,[key]:value}));

  const handleAudioPlay=(id:string)=>
    setAudioCount(prev=>({...prev,[id]:(prev[id]||0)+1}));

  const handleBack=()=>{
    const timeSpent=Date.now()-startTime;
    setQuiz((prev:any)=>({
      ...prev,
      form3:answers,
      answerType,
      audioCount,
      timeSpent:{...prev.timeSpent,form3:timeSpent}
    }));
    navigate("/form2");
  };

  const handleSubmit=async()=>{
    const timeSpent=Date.now()-startTime;

    setQuiz((prev:any)=>({
      ...prev,
      form3:answers,
      answerType,
      audioCount,
      timeSpent:{...prev.timeSpent,form3:timeSpent}
    }));

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
    <div className="
      min-h-screen bg-teal-700
      flex items-center justify-center
      px-3 sm:px-6 lg:px-10 py-6
    ">

      {/* MAIN CARD */}
      <div className="
        w-full max-w-4xl
        bg-[#a9c2c9]
        rounded-3xl sm:rounded-[50px] lg:rounded-[60px]
        p-4 sm:p-8 lg:p-10
      ">

        {/* TITLE */}
        <h1 className="
          text-center text-white mb-8
          font-bold
          text-2xl sm:text-4xl lg:text-5xl
        ">
          Audio Test 02
        </h1>

        {/* QUESTIONS */}
        {questions.map(q=>(
          <div key={q.id} className="flex flex-col items-center gap-6">

            {/* AUDIO */}
            <audio
              controls
              className="w-full max-w-md"
              onPlay={()=>handleAudioPlay(q.id.toString())}
            >
              <source src={q.audio} type="audio/mpeg"/>
            </audio>

            {/* ANSWERS */}
            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-6 sm:gap-8
              w-full
              justify-items-center
            ">
              {Object.entries(q.groups).map(([key,opts])=>(
                <div key={key} className="flex flex-col items-center gap-3">

                  <p className="font-bold text-lg">{key}</p>

                  <div className="
                    flex flex-wrap
                    justify-center
                    gap-3 sm:gap-4
                  ">
                    {opts.map(opt=>(
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

        {/* ANSWER TYPE */}
        <div className="text-center mt-12">
          <h2 className="mb-5 text-lg sm:text-xl font-semibold">
            How did you answer?
          </h2>

          <div className="
            flex flex-col sm:flex-row
            flex-wrap
            justify-center
            gap-3 sm:gap-6
          ">
            {["consciously","unconsciously","randomly","unintentionally"].map(type=>(
              <label key={type} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={answerType===type}
                  onChange={e=>setAnswerType(e.target.value)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
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
            onClick={handleSubmit}
            className="
              w-full sm:w-auto
              bg-green-500 text-white
              px-8 sm:px-12
              py-3
              rounded-full
              hover:bg-green-600
              transition
            "
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}

export default Form3;