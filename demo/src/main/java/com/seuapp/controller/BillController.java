package com.seuapp.controller;

import com.seuapp.dto.BillRequest;
import com.seuapp.model.Bill;
import com.seuapp.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/bills")
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping
    public ResponseEntity<Bill> createBill(@Valid @RequestBody BillRequest request) {
        Bill newBill = billService.createBill(request);
        return new ResponseEntity<>(newBill, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Bill>> listAllBills() {
        List<Bill> bills = billService.listAllBills();
        return ResponseEntity.ok(bills); // Retorna 200 OK
    }
}