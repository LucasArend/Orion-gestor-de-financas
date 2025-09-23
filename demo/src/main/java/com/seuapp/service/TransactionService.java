package com.seuapp.service;

import com.seuapp.dto.TransactionRequest;
import com.seuapp.exception.TransactionNotFoundException; // Import da nova exceção
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

    public Transaction updateTransaction(Long id, TransactionRequest request) {
        // 1. Busca a transação pelo ID
        return transactionRepository.findById(id)
                .map(transaction -> {
                    // 2. Se encontrada, atualiza os dados
                    transaction.setDescription(request.getDescription());
                    transaction.setAmount(request.getAmount());
                    transaction.setType(request.getType());

                    // 3. Salva e retorna a transação atualizada
                    return transactionRepository.save(transaction);
                })
                // 4. Se não encontrada, lança a exceção
                .orElseThrow(() -> new TransactionNotFoundException("Transação com ID " + id + " não encontrada."));
    }
}