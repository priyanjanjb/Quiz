import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

function Form1() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    year: "",
    jlpt: "",
    studyJapanese: "",
    sake: "",
    kumo: "",
    kami: "",
    hashi: "",
    similarWords: "",
    pitchKnowledge: "",
    pitchDifficulty: "",
    reasons: [] as string[],
    otherReason: "",
    trainingInterest: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Checkbox handler (Q7)
  const handleCheckbox = (value: string) => {
    setFormData((prev) => {
      const exists = prev.reasons.includes(value);
      return {
        ...prev,
        reasons: exists
          ? prev.reasons.filter((r) => r !== value)
          : [...prev.reasons, value]
      };
    });
  };

  const handleNext = () => {
    if (!formData.name || !formData.year) {
      alert("Fill name and academic year");
      return;
    }

    console.log(formData);

    navigate("/form2");
  };

  return (
    <div className="min-h-screen bg-teal-700 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 space-y-6">

        <h1 className="text-2xl font-bold text-center">QUESTIONNAIRE</h1>

        {/* Name + Year */}
        <input
          name="name"
          placeholder="නම"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="year"
          placeholder="අධ්‍යයන වර්ෂය"
          value={formData.year}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <h3 className="text-2xl font-bold text-center">පර්යේෂණ අරමුණු සඳහා පහත ඇති සියලුම ප්‍රශ්නවලට අවංකව පිළිතුරු සපයන්න. </h3>
        {/* Q1 JLPT */}
        <div>
          <p className="font-medium">1. JLPT මට්ටම</p>
          {[" N5", " N4", " N3", " N2", " තවම සමත් වී නැත."].map((lvl) => (
            <label key={lvl} className="block">
              <input
                type="radio"
                name="jlpt"
                value={lvl}
                onChange={handleChange}
              /> {lvl}
            </label>
          ))}
        </div>

        {/* Q2 */}
        <div>
          <p>2. ඔබ ජපන් වාග්විද්‍යාව හදාරා හෝ හදාරමින් සිටිනවාද?</p>
          {[" ඔව්", " නැත"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="studyJapanese"
                value={opt}
                onChange={handleChange}
              /> {opt}
            </label>
          ))}
        </div>

        {/* Q3 */}
        <div>
          <p>3. පහත සඳහන් ජපන් වචන වල ඔබ දන්නා තේරුම් ලියන්න.</p>

          <input name="sake" placeholder="さけ" onChange={handleChange} className="w-full border p-2 mb-2"/>
          <input name="kumo" placeholder="くも" onChange={handleChange} className="w-full border p-2 mb-2"/>
          <input name="kami" placeholder="かみ" onChange={handleChange} className="w-full border p-2 mb-2"/>
          <input name="hashi" placeholder="はし" onChange={handleChange} className="w-full border p-2"/>
        </div>

        {/* Q4 */}
        <div>
          <p>4. ඇතැම් ජපන් වචන උච්චාරණය එකම වගේ වුණත් අර්තය වෙනස් වන අවස්තා ඇත.      
(උදා; හෂි - චොප්ස්ටික්ස් , පාලම) ඔබට මෙවැනි වචන හමුවී තිබෙනවාද? </p>
          {[" ඔව්", " නැත"].map((opt) => (
            <label key={opt} className="block">
              <input type="radio" name="similarWords" value={opt} onChange={handleChange}/> {opt}
            </label>
          ))}
        </div>

        {/* Q5 */}
        <div>
          <p>5. ජපන් භාෂාවේ ස්වර උච්චාරණය :ඡසඑජය ්ජජැබඑ* පිළිබඳ සංකල්පය ගැන ඔබ කවදා හෝ අසා තිබේද?</p>
          {[" ඔව්", " නැත"].map((opt) => (
            <label key={opt} className="block">
              <input type="radio" name="pitchKnowledge" value={opt} onChange={handleChange}/> {opt}
            </label>
          ))}
        </div>

        {/* Q6 */}
        <div>
          <p>6. ඔබට ජපන් භාෂාවේ පවතින ස්වර උච්චාරණ මඟහැරී ඇති බව සිතනවාද?</p>
          {["ඔව්", "නැත"].map((opt) => (
            <label key={opt} className="block">
              <input type="radio" name="pitchDifficulty" value={opt} onChange={handleChange}/> {opt}
            </label>
          ))}
        </div>

        {/* Q7 */}
        <div>
          <p>7. ඔබට ජපන් භාෂාවේ පවතින ස්වර උච්චාරණ මඟහැරී ඇති බව සිතනවාද?</p>

          {[
            " JLPT/NAT විභාග පමණක් අරමුණු කරමින් ඉගැන්වීම",
            " පාසලේ දී අවධානය ලබා නොදීම",
            " විශ්ව විද්‍යාලයේ දී අවධානය ලබා නොදීම",
            " අක්ෂර ලිවීමට පමණක් අවධානය යොමු කිරීම",
            " ගුරුවරුන් නිවැරදිව ඉගැන්වීම් සිදු නොකිරීම",
            " Pitch Accent සඳහා විශේෂ ඉගැන්වීමක් සිදු නොකිරීම"
          ].map((reason) => (
            <label key={reason} className="block">
              <input
                type="checkbox"
                onChange={() => handleCheckbox(reason)}
              /> {reason}
            </label>
          ))}

          <input
            placeholder="වෙනත් (කරුණාකර සඳහන් කරන්න)"
            name="otherReason"
            onChange={handleChange}
            className="w-full border p-2 mt-2"
          />
        </div>

        {/* Q8 */}
        <div>
          <p>8. "උච්චාරණය එක හා සමාන වුවත් අර්ථය වෙනස් වචන" - නිවැරදිව උච්චාරණය කිරීමට, 
ඇහුම්කන්දීමට පුහුණුවීම මඟින් ජපන් භාෂා දැනුම වැඩි දියුණු කරගැනීමට</p>
          {["කැමතියි", "අකමැතියි", "ඒ පිළිබඳ දැනුම පවතින බැවින් මා හට පුහුණුවක් අවශ්‍ය නැත."].map((opt) => (
            <label key={opt} className="block">
              <input type="radio" name="trainingInterest" value={opt} onChange={handleChange}/> {opt}
            </label>
          ))}
        </div>

        {/* NEXT */}
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Next
        </button>

      </div>
    </div>
  );
}

export default Form1;