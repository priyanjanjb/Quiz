import { useState, type ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "./QuizStore";

function Form1() {
  const navigate = useNavigate();
  const { quiz, setQuiz } = useQuiz();

  const [startTime, setStartTime] = useState(Date.now());

  const [formData, setFormData] = useState({
    name: quiz.form1?.name || "",
    year: quiz.form1?.year || "",
    jlpt: quiz.form1?.jlpt || "",
    studyJapanese: quiz.form1?.studyJapanese || "",
    sake: quiz.form1?.sake || "",
    kumo: quiz.form1?.kumo || "",
    kami: quiz.form1?.kami || "",
    hashi: quiz.form1?.hashi || "",
    similarWords: quiz.form1?.similarWords || "",
    pitchKnowledge: quiz.form1?.pitchKnowledge || "",
    pitchDifficulty: quiz.form1?.pitchDifficulty || "",
    reasons: quiz.form1?.reasons || [] as string[],
    otherReason: quiz.form1?.otherReason || "",
    trainingInterest: quiz.form1?.trainingInterest || ""
  });

  useEffect(() => setStartTime(Date.now()), []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (value: string) => {
    setFormData(prev => {
      const exists = prev.reasons.includes(value);
      return {
        ...prev,
        reasons: exists
          ? prev.reasons.filter((r: string) => r !== value)
          : [...prev.reasons, value]
      };
    });
  };

  const handleNext = () => {
    if (!formData.name || !formData.year) {
      alert("Fill name and academic year");
      return;
    }
    const timeSpent = Date.now() - startTime;
    setQuiz((prev: any) => ({ ...prev, form1: formData, timeSpent: { ...prev.timeSpent, form1: timeSpent } }));
    navigate("/form2");
  };

  const reasonsList = [
    " JLPT/NAT විභාග පමණක් අරමුණු කරමින් ඉගැන්වීම",
    " පාසලේ දී අවධානය ලබා නොදීම",
    " විශ්ව විද්‍යාලයේ දී අවධානය ලබා නොදීම",
    " අක්ෂර ලිවීමට පමණක් අවධානය යොමු කිරීම",
    " ගුරුවරුන් නිවැරදිව ඉගැන්වීම් සිදු නොකිරීම",
    " Pitch Accent සඳහා විශේෂ ඉගැන්වීමක් සිදු නොකිරීම"
  ];

  return (
    <div className="min-h-screen bg-teal-700 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">QUESTIONNAIRE</h1>

        {/* Name + Year */}
        <input name="name" placeholder="නම" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded"/>
        <input name="year" placeholder="අධ්‍යයන වර්ෂය" value={formData.year} onChange={handleChange} className="w-full p-2 border rounded"/>

        {/* JLPT */}
        <div>
          <p className="font-medium">1. JLPT මට්ටම</p>
          {[" N5", " N4", " N3", " N2", " තවම සමත් වී නැත."].map((lvl) => (
            <label key={lvl} className="block">
              <input type="radio" name="jlpt" value={lvl} checked={formData.jlpt===lvl} onChange={handleChange}/> {lvl}
            </label>
          ))}
        </div>

        {/* Q2 */}
        <div>
          <p>2. ඔබ ජපන් වාග්විද්‍යාව හදාරා හෝ හදාරමින් සිටිනවාද?</p>
          {[" ඔව්", " නැත"].map((opt) => (
            <label key={opt} className="block">
              <input type="radio" name="studyJapanese" value={opt} checked={formData.studyJapanese===opt} onChange={handleChange}/> {opt}
            </label>
          ))}
        </div>

        {/* Q3 */}
        <div>
          <p>3. පහත සඳහන් ජපන් වචන වල ඔබ දන්නා තේරුම් ලියන්න.</p>
          {[
            { key: "sake", label: " さけ" },
            { key: "kumo", label: " くも" },
            { key: "kami", label: " かみ" },
            { key: "hashi", label: "はし" }
          ].map(({ key, label}) => (
            <div key={key} className="mb-4">
              <label className="block font-medium mb-1">{label}</label>
              <input name={key} value={formData[key as keyof typeof formData]} onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>
          ))}
        </div>

        {/* Q7 */}
        <div>
          <p>7. ඔබට ජපන් භාෂාවේ පවතින ස්වර උච්චාරණ මඟහැරී ඇති බව සිතනවාද?</p>
          {reasonsList.map((reason) => (
            <label key={reason} className="block">
              <input type="checkbox" checked={formData.reasons.includes(reason)} onChange={()=>handleCheckbox(reason)}/> {reason}
            </label>
          ))}
          <input placeholder="වෙනත් (කරුණාකර සඳහන් කරන්න)" name="otherReason" value={formData.otherReason} onChange={handleChange} className="w-full border p-2 mt-2"/>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={handleNext} className="bg-blue-600 text-white px-6 py-2 rounded">Next</button>
        </div>
      </div>
    </div>
  );
}

export default Form1;