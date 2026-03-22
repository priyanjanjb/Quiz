import { createContext, useContext, useState, type ReactNode } from "react";

type QuizState = {
  name: string;
  form1: any;
  form2: Record<string, string>;
  form3: Record<string, string>;
  form4: Record<number, string>;
  answerType: string;
};

const QuizContext = createContext<any>(null);

export const QuizProvider = ({ children }: { children: ReactNode }) => {

  const [quiz, setQuiz] = useState<QuizState>({
    name: "",
    form1: {},
    form2: {},
    form3: {},
    form4: {},
    answerType: ""
  });

  return (
    <QuizContext.Provider value={{ quiz, setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);