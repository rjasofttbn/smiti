package com.example.smiti.shareholder.service;

import com.example.smiti.shareholder.entity.Shareholder;
import com.example.smiti.shareholder.repository.ShareholderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShareholderService {

    private final ShareholderRepository repository;

    // Create
    public Shareholder create(Shareholder shareholder, String username) {
        shareholder.setCreatedAt(LocalDateTime.now());
        shareholder.setCreated_by(username);
        shareholder.setStatus("active");

        return repository.save(shareholder);
    }

    // Get all active
    public List<Shareholder> getAllActive() {
        return repository.findByDeletedAtIsNull();
    }

    // Get by ID
    public Shareholder getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shareholder not found"));
    }

    // Update
    public Shareholder updateShareholder(Long id, Shareholder newData) {

        Shareholder shareholder = getById(id);

        shareholder.setName(newData.getName());
        shareholder.setFatherName(newData.getFatherName());
        shareholder.setMotherName(newData.getMotherName());
        shareholder.setContactNo(newData.getContactNo());
        shareholder.setShareCount(newData.getShareCount());
        shareholder.setUpdatedAt(LocalDateTime.now());

        return repository.save(shareholder);
    }

    // Update Status
    public Shareholder updateStatus(Long id, String status) {

        Shareholder shareholder = getById(id);
        shareholder.setStatus(status);

        return repository.save(shareholder);
    }



    // Soft delete
    public void delete(Long id) {
        Shareholder shareholder = getById(id);
        shareholder.setDeletedAt(LocalDateTime.now());
        repository.save(shareholder);
    }

    // Trash list
    public List<Shareholder> getTrash() {
        return repository.findByDeletedAtIsNotNull();
    }

}