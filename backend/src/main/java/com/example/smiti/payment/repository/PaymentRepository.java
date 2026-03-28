package com.example.smiti.payment.repository;

import com.example.smiti.payment.entity.Payment;
import com.example.smiti.payment.entity.PaymentDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByDeletedAtIsNull();      // active payments
    List<Payment> findByDeletedAtIsNotNull();   // soft-deleted / trash
    List<Payment> findByShareholderId(Long shareholderId);

    @Query(value = "SELECT p.id as id, p.amount as amount, p.status as status, p.date as date, " +
            "s.name as shareholderName, s.contactNo as contactNo " +
            "FROM payments p " +
            "JOIN shareholders s ON p.shareholder_id = s.id " +
            "WHERE p.deleted_at IS NULL",
            nativeQuery = true)
    List<PaymentDTO> findActivePaymentsWithDetails();
}