package com.seuapp.controller;

import com.seuapp.dto.TransactionRequest;
import com.seuapp.model.Transaction;
import com.seuapp.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@Valid @RequestBody TransactionRequest request) {
        Transaction newTransaction = transactionService.createTransaction(request);
        return new ResponseEntity<>(newTransaction, HttpStatus.CREATED);
    }
}