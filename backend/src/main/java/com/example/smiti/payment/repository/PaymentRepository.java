package com.example.smiti.payment.repository;

import com.example.smiti.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByDeletedAtIsNull();      // active payments
    List<Payment> findByDeletedAtIsNotNull();   // soft-deleted / trash
    List<Payment> findByShareholderId(Long shareholderId);
}