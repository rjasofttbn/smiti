package com.example.smiti.fieldpayment.repository;

import com.example.smiti.fieldpayment.entity.FieldPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FieldPaymentRepository extends JpaRepository<FieldPayment, Long> {

    List<FieldPayment> findByDeletedAtIsNull();     // active payments
    List<FieldPayment> findByDeletedAtIsNotNull();  // soft deleted / trash
    List<FieldPayment> findByFieldId(Long fieldId); // payments by field
}