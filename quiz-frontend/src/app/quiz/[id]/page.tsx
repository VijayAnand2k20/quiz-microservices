import { ModeToggle } from "@/components/global/mode-toggle";
import React from "react";

const QuizPage = ({ params: { id } }: { params: { id: Number } }) => {
  return (
    <main className="flex flex-col gap-6 justify-center items-center h-[100dvh] container">
      <ModeToggle />
      <p>Id: {String(id)}</p>
    </main>
  );
};

export default QuizPage;

// Quiz has id: number, title:string, questionIds: list of numbers
interface Quiz {
  id: number;
  title: string;
  questionIds: number[];
}

export async function generateStaticParams() {
  const quizes = await fetch("http://localhost:8090/quiz/get/all").then((res) =>
    res.json()
  );
  return quizes.map((quiz: Quiz) => ({
    id: String(quiz.id),
  }));
}
