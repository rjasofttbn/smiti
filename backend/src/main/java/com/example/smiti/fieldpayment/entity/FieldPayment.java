package com.example.smiti.fieldpayment.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "field_payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FieldPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long fieldId;

    private BigDecimal amount;

    private LocalDate paymentDate;

    private String mediaLinks;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    private String created_by;
    private String updated_by;
}