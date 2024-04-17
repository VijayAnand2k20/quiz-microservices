"use client";

import React, { useState, FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModeToggle } from "@/components/global/mode-toggle";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    categoryName: "",
    numQuestions: "",
    title: "",
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    console.log("Test");
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      console.log(formData);

      const response = await fetch(
        "http://localhost:8765/quiz-service/quiz/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create quiz. Please try again.");
      }

      const data = await response;
      router.push("/");
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string
  ) => {
    if (typeof e === "string") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["categoryName"]: e,
      }));
    } else {
      // Handle event case
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <main className="flex flex-col gap-6 justify-center items-center h-[100dvh]">
      <ModeToggle />
      <Card className="w-[350px]">
        <form onSubmit={onSubmit}>
          <CardHeader>
            <Link href={"/"} className="text-center flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="16"
                height="16"
              >
                <polygon
                  points="30 15 5.2 15 10.75 8.66 9.25 7.34 1.67 16 9.25 24.66 10.75 23.34 5.2 17 30 17 30 15"
                  data-name="12"
                  fill="#ffffff"
                  className="color000 svgShape"
                ></polygon>
              </svg>
              &nbsp; All Quizes
            </Link>
            <CardTitle>Create Quiz</CardTitle>
            <CardDescription>
              Create a new quiz in just a click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {error && <div style={{ color: "red" }}>{error}</div>}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title of Quiz</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter a title for the quiz"
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="numQuestions">Number of questions</Label>
                <Input
                  id="numQuestions"
                  type="number"
                  placeholder="Enter a number"
                  name="numQuestions"
                  required
                  value={formData.numQuestions}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="categoryName">Category</Label>
                <Select
                  name="categoryName"
                  required
                  value={formData.categoryName}
                  onValueChange={handleChange}
                >
                  <SelectTrigger id="categoryName">
                    <SelectValue placeholder="Category of the quiz" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
