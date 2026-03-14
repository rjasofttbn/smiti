package com.example.smiti.documentmedia.repository;

import com.example.smiti.documentmedia.entity.DocumentMedia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentMediaRepository extends JpaRepository<DocumentMedia, Long> {

    // Active documents
    List<DocumentMedia> findByDeletedAtIsNull();

    // Soft-deleted documents / trash
    List<DocumentMedia> findByDeletedAtIsNotNull();

    // Get documents linked to specific entity
    List<DocumentMedia> findByLinkedToIdAndLinkedType(Long linkedToId, String linkedType);
}