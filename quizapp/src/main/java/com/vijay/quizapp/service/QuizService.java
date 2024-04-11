package com.vijay.quizapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.vijay.quizapp.dao.QuestionDao;
import com.vijay.quizapp.dao.QuizDao;
import com.vijay.quizapp.model.Question;
import com.vijay.quizapp.model.QuestionWrapper;
import com.vijay.quizapp.model.Quiz;
import com.vijay.quizapp.model.Response;

@Service
public class QuizService {

    @Autowired
    QuizDao quizDao;

    @Autowired
    QuestionDao questionDao;

    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {

        List<Question> questions = questionDao.findRandomQuestionsByCategory(category, numQ);

        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestions(questions);
        quizDao.save(quiz);

        return new ResponseEntity<>("Success", HttpStatus.CREATED);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        Optional<Quiz> quiz = quizDao.findById(id);
        List<Question> questionsFromDB = quiz.get().getQuestions();
        List<QuestionWrapper> questionsForUser = new ArrayList<>();
        for (Question Q : questionsFromDB) {
            QuestionWrapper qn = new QuestionWrapper(
                Q.getId(),
                Q.getQuestionTitle(),
                Q.getOption1(),
                Q.getOption2(),
                Q.getOption3(),
                Q.getOption4()
            );
            questionsForUser.add(qn);
        }

        return new ResponseEntity<>(questionsForUser, HttpStatus.OK);
    }

    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
        Quiz quiz = quizDao.findById(id).get();
        List<Question> questions = quiz.getQuestions();
        int score=0, i=0;

        for (Response response : responses) {
            if(response.getResponse().equals(questions.get(i).getRightAnswer())) {;;
                score++;
            }
            i++;
        }
        return new ResponseEntity<>(score, HttpStatus.OK);
    }

}
