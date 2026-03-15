package com.example.smiti.documentmedia.entity;

import com.example.smiti.auth.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "document_media")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long linkedToId;
    private String linkedType;
    private String type;
    private String filePath;
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