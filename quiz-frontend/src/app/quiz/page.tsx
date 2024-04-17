"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

import { ModeToggle } from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <Link href={"/create"}>
        <Button>Create a new quiz</Button>
      </Link>
      <Table>
        <TableCaption>A list of your quizzes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Quiz ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Number of Questions</TableHead>
            <TableHead>Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-3/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-3/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-3/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-3/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-3/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-3/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-1/4" />
                </TableCell>
              </TableRow>
            </>
          ) : (
            quizzes.map((quiz, index) => (
              <TableRow key={index}>
                <TableCell>{quiz.id}</TableCell>
                <TableCell className="font-medium">{quiz.title}</TableCell>
                <TableCell>{quiz.questionIds.length}</TableCell>
                <TableCell>
                  <Link href={`/quiz/${index + 1}`}>Go to Quiz</Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </main>
  );
}

