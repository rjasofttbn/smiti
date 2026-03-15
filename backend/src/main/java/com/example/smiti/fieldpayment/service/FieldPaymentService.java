package com.example.smiti.fieldpayment.service;

import com.example.smiti.auth.entity.User;
import com.example.smiti.auth.repository.UserRepository;
import com.example.smiti.fieldpayment.entity.FieldPayment;
import com.example.smiti.fieldpayment.repository.FieldPaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FieldPaymentService {

    private final FieldPaymentRepository repository;

    // Create
    // Inject UserRepository alongside your FieldPaymentRepository
    private final UserRepository userRepository;


    public FieldPayment create(FieldPayment payment, String username) {
        // 1. Fetch the actual User object from the database
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Logged in user not found"));

        // 2. Use the correct setter (Lombok generates setCreatedBy for the createdBy field)
        payment.setCreatedBy(user);

        // 3. Set the timestamp
        payment.setCreatedAt(LocalDateTime.now());

        return repository.save(payment);
    }

    // Get all active
    public List<FieldPayment> getAllActive() {
        return repository.findByDeletedAtIsNull();
    }

    // Get by id
    public FieldPayment getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Field Payment not found"));
    }

    // Update
    public FieldPayment update(Long id, FieldPayment newData) {

        FieldPayment payment = getById(id);

        payment.setAmount(newData.getAmount());
        payment.setPaymentDate(newData.getPaymentDate());
        payment.setMediaLinks(newData.getMediaLinks());

        payment.setUpdatedAt(LocalDateTime.now());

        return repository.save(payment);
    }



    // Soft delete
    public void delete(Long id) {
        FieldPayment payment = getById(id);
        payment.setDeletedAt(LocalDateTime.now());
        repository.save(payment);
    }

    // Trash
    public List<FieldPayment> getTrash() {
        return repository.findByDeletedAtIsNotNull();
    }

    // Payments by field
    public List<FieldPayment> getByField(Long fieldId) {
        return repository.findByFieldId(fieldId);
    }
}