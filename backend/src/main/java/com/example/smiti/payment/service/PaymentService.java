package com.example.smiti.payment.service;

import com.example.smiti.auth.entity.User;
import com.example.smiti.auth.repository.UserRepository;
import com.example.smiti.payment.entity.Payment;
import com.example.smiti.payment.entity.PaymentDTO;
import com.example.smiti.payment.repository.PaymentRepository;
import com.example.smiti.shareholder.entity.Shareholder;
import com.example.smiti.shareholder.repository.ShareholderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository repository;

    // Create payment
    // Make sure you have UserRepository injected at the top of the class
    private final UserRepository userRepository;

        private final ShareholderRepository shareholderRepository;
    public Payment create(Long shareholderId, Payment payment, String username) {
        Shareholder shareholder = shareholderRepository.findById(shareholderId)
                .orElseThrow(() -> new RuntimeException("Shareholder not found"));
        payment.setShareholder(shareholder);

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        payment.setCreatedBy(user);
        payment.setCreatedAt(LocalDateTime.now());
        payment.setStatus("Approved");

        return repository.save(payment);
    }


    // Get by ID
    public Payment getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    // Update payment
    public Payment update(Long id, Payment newData, String username) {

        Payment payment = getById(id);

        // Update simple fields
        if (newData.getAmount() != null) payment.setAmount(newData.getAmount());
        if (newData.getType() != null) payment.setType(newData.getType());
        if (newData.getKistiType() != null) payment.setKistiType(newData.getKistiType());
        if (newData.getPaymentDate() != null) payment.setPaymentDate(newData.getPaymentDate());
        if (newData.getComment() != null) payment.setComment(newData.getComment());

        // Update shareholder
        if (newData.getShareholder() != null && newData.getShareholder().getId() != null) {
            Shareholder shareholder = shareholderRepository.findById(newData.getShareholder().getId())
                    .orElseThrow(() -> new RuntimeException("Shareholder not found"));
            payment.setShareholder(shareholder);
        }

        // Track who updated
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        payment.setUpdatedBy(user);
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

    public List<PaymentDTO> getAllActive() {
        List<PaymentDTO> data = repository.findActivePaymentsWithDetails();
        // Check how many items were found and if the first one has a name
        if (!data.isEmpty()) {
            System.out.println("First Shareholder Name: " + data.get(0).getShareholderName() + data.get(0).getContactNo());
        }
        return data;
    }
}