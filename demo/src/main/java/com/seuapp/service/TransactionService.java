package com.seuapp.service;

import com.seuapp.dto.TransactionRequest;
import com.seuapp.model.Transaction;
import com.seuapp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction createTransaction(TransactionRequest request) {
        Transaction transaction = new Transaction();
        transaction.setDescription(request.getDescription());
        transaction.setAmount(request.getAmount());
        transaction.setType(request.getType());
        transaction.setDate(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }
}