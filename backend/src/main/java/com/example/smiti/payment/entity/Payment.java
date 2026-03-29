package com.example.smiti.payment.entity;

import com.example.smiti.auth.entity.User;
import com.example.smiti.shareholder.entity.Shareholder;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "shareholder_id")
    private Shareholder shareholder;

    private String kistiType;

    private String type;

    private BigDecimal amount;

    @Column(name = "payment_date") // optional, maps to DB column
    private LocalDate paymentDate;

    private String status;

    private String comment;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by")
    private User updatedBy;
}