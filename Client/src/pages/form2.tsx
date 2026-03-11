import { useState } from "react";
import { useLocation } from "react-router-dom";
import audio5 from "../assets/Audio/5.mp3"
import audio6 from "../assets/Audio/6.mp3"
function Form2() {

  const location = useLocation();
  const { name, form1Answers } = location.state;

  const questions = [
    { id: 5, audio: audio5, options: ["酒", "鮭"] },
    { id: 6, audio: audio6, options: ["牡蠣", "柿"] }
  ];

  const [answers,setAnswers] = useState<Record<number,string>>({});
  const [answerType,setAnswerType] = useState("");

  const handleAnswer = (id:number,value:string)=>{

    setAnswers(prev=>({
      ...prev,
      [id]:value
    }));

  };

  const handleSubmit = async()=>{

    const payload = {

      name,

      responses:{
        ...form1Answers,
        ...answers
      },

      answerType

    };

    try{

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

        body:JSON.stringify(payload)

      });

      const data = await res.json();

      alert(data.message);

    }catch(err){

      console.error(err);

    }

  };

  return (

    <div className="min-h-screen bg-teal-700 flex items-center justify-center">

      <div className="w-full max-w-4xl bg-[#a9c2c9] rounded-[60px] p-10">

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

        <div className="text-center mt-10">

          <h2 className="mb-4">How did you answer?</h2>

          <div className="flex flex-col items-center gap-2">

            {["consciously","unconsciously","randomly","unintentionally"].map((type)=>(
              
              <label key={type}>
                <input
                  type="radio"
                  value={type}
                  name="type"
                  onChange={(e)=>setAnswerType(e.target.value)}
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

export default Form2;