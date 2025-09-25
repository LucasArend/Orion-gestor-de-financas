package com.seuapp.service;

import com.seuapp.dto.BillRequest;
import com.seuapp.model.Bill;
import com.seuapp.enums.PaymentStatus;
import com.seuapp.enums.PaymentMethod;
import com.seuapp.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepository;

    public Bill createBill(BillRequest request) {
        Bill bill = new Bill();
        bill.setDescription(request.getDescription());
        bill.setAmount(request.getAmount());
        bill.setDueDate(request.getDueDate());

        // Conversão de String para Enum: garante que o valor é válido antes de salvar
        try {
            bill.setStatus(PaymentStatus.valueOf(request.getStatus().toUpperCase()));
            bill.setPaymentMethod(PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase()));
        } catch (IllegalArgumentException e) {
            // Em uma API robusta, você lançaria uma exceção aqui (400 Bad Request)
            throw new IllegalArgumentException("Status ou Método de Pagamento inválido. Verifique os valores permitidos.");
        }

        return billRepository.save(bill);
    }

    public List<Bill> listAllBills() {
        return billRepository.findAll();
    }
}