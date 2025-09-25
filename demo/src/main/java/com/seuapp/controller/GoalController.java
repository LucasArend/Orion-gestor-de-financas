package com.seuapp.controller;

import com.seuapp.dto.GoalRequest;
import com.seuapp.model.Goal;
import com.seuapp.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @PostMapping
    public ResponseEntity<Goal> createGoal(@Valid @RequestBody GoalRequest request) {
        Goal newGoal = goalService.createGoal(request);
        return new ResponseEntity<>(newGoal, HttpStatus.CREATED);
    }
}