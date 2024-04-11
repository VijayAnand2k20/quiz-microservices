package com.vijay.quizapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vijay.quizapp.model.Quiz;

public interface QuizDao extends JpaRepository<Quiz, Integer> {
    
}
