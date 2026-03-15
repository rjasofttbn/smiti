package com.example.smiti.documentmedia.service;

import com.example.smiti.auth.entity.User;
import com.example.smiti.auth.repository.UserRepository;
import com.example.smiti.documentmedia.entity.DocumentMedia;
import com.example.smiti.documentmedia.repository.DocumentMediaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentMediaService {

    private final DocumentMediaRepository repository;

    // Create
    // Ensure you have UserRepository and DocumentMediaRepository injected
    private final UserRepository userRepository;

    public DocumentMedia create(DocumentMedia doc, String username) {
        // 1. Fetch the User entity using the username (email)
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        // 2. Use the correct Lombok setter for the User object
        doc.setCreatedBy(user);

        // 3. Set the timestamp
        doc.setCreatedAt(LocalDateTime.now());

        return repository.save(doc);
    }

    // Get all active
    public List<DocumentMedia> getAllActive() {
        return repository.findByDeletedAtIsNull();
    }

    // Trash


    // Get by ID
    public DocumentMedia getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document media not found"));
    }

    // Update
    public DocumentMedia update(Long id, DocumentMedia newData) {
        DocumentMedia doc = getById(id);

        doc.setFilePath(newData.getFilePath());
        doc.setComment(newData.getComment());
        doc.setType(newData.getType());
        doc.setLinkedToId(newData.getLinkedToId());
        doc.setLinkedType(newData.getLinkedType());

        doc.setUpdatedAt(LocalDateTime.now());

        return repository.save(doc);
    }

    // Soft delete
    public void delete(Long id) {
        DocumentMedia doc = getById(id);
        doc.setDeletedAt(LocalDateTime.now());
        repository.save(doc);
    }

    // Trash
    public List<DocumentMedia> getTrash() {
        return repository.findByDeletedAtIsNotNull();
    }

    // Get by linkedToId + linkedType
    public List<DocumentMedia> getByLinked(Long linkedToId, String linkedType) {
        return repository.findByLinkedToIdAndLinkedType(linkedToId, linkedType);
    }
}