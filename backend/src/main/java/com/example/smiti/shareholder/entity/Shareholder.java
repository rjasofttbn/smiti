package com.example.smiti.shareholder.entity;

import com.example.smiti.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "shareholders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shareholder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String fatherName;
    private String motherName;
    private String nid;
    private String pic;
    private String contactNo;

    @Column(columnDefinition = "TEXT")
    private String presentAddress;

    @Column(columnDefinition = "TEXT")
    private String permanentAddress;

    private Integer shareCount;

    private String nomineeName;
    private String nomineeRelation;
    private String nomineeBirthReg;
    private String nomineeNid;
    private String nomineePic;
    private String nomineeContactNo;

    private String status;
    private String comment;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @ManyToOne
    @JoinColumn(name = "created_by") // Maps to 'created_by' column in DB
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by") // Maps to 'updated_by' column in DB
    private User updatedBy;
}
