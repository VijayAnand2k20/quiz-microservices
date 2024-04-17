"use client";

import React, { useEffect, useState } from "react";

import { ModeToggle } from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import HomeLogo from "@/components/global/HomeLogo";

interface Quiz {
  id: number;
  title: string;
  questionIds: [];
}

export default function Home() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8090/quiz/get/all")
      .then((response) => response.json())
      .then((data) => {
        setQuizzes(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="flex flex-col gap-6 justify-center items-center h-[100dvh] container">
      <ModeToggle />
      <Card className="w-[350px] h-[30dvh] flex flex-col justify-center items-center gap-4">
        <CardHeader>
          <h2>Quizzes</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href={"/quiz"}>
            <Button>View all quizzes</Button>
          </Link>
          <Link href={"/create"}>
            <Button>Create a new quiz</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
