package com.example.smiti.field.entity;

import com.example.smiti.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "fields")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Field {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ownerName;
    private String plotNo;
    private Double area;
    private String location;
    private String dagNo;
    private String rsNo;
    private String bsNo;
    private String kothianNo;

    private String comment;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy; // Use CamelCase for Java standards

    @ManyToOne
    @JoinColumn(name = "updated_by")
    private User updatedBy;
}