package com.example.smiti.payment.service;

import com.example.smiti.payment.entity.Payment;
import com.example.smiti.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository repository;

    // Create payment
    public Payment create(Payment payment, String username) {

        payment.setCreatedAt(LocalDateTime.now());
        payment.setCreated_by(username);
        payment.setStatus("active");

        return repository.save(payment);
    }

    // Get all active
    public List<Payment> getAllActive() {
        return repository.findByDeletedAtIsNull();
    }

    // Get by ID
    public Payment getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    // Update payment
    public Payment update(Long id, Payment newData) {

        Payment payment = getById(id);

        payment.setAmount(newData.getAmount());
        payment.setType(newData.getType());
        payment.setDate(newData.getDate());
        payment.setComment(newData.getComment());

        payment.setUpdatedAt(LocalDateTime.now());

        return repository.save(payment);
    }

    // Update status
    public Payment updateStatus(Long id, String status) {

        Payment payment = getById(id);

        payment.setStatus(status);

        return repository.save(payment);
    }



    // Soft delete
    public void delete(Long id) {
        Payment payment = getById(id);
        payment.setDeletedAt(LocalDateTime.now());
        repository.save(payment);
    }

    // Trash
    public List<Payment> getTrash() {
        return repository.findByDeletedAtIsNotNull();
    }

    // Get payments by shareholder
    public List<Payment> getByShareholder(Long shareholderId) {
        return repository.findByShareholderId(shareholderId);
    }
}