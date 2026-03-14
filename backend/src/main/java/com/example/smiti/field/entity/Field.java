package com.example.smiti.field.entity;

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

    private String created_by;
    private String updated_by;
}