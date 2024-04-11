package com.vijay.quizservice.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vijay.quizservice.model.Quiz;


public interface QuizDao extends JpaRepository<Quiz, Integer> {
    
}
