package com.example.smiti.field.service;

import com.example.smiti.field.entity.Field;
import com.example.smiti.field.repository.FieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FieldService {

    private final FieldRepository repository;

    // Create field
    public Field create(Field field, String username) {
        field.setCreatedAt(LocalDateTime.now());
        field.setCreated_by(username);
        return repository.save(field);
    }

    // Get all active
    public List<Field> getAllActive() {
        return repository.findByDeletedAtIsNull();
    }

    // Get by ID
    public Field getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Field not found"));
    }

    // Update
    public Field update(Long id, Field newData) {
        Field field = getById(id);

        field.setOwnerName(newData.getOwnerName());
        field.setPlotNo(newData.getPlotNo());
        field.setArea(newData.getArea());
        field.setLocation(newData.getLocation());
        field.setDagNo(newData.getDagNo());
        field.setRsNo(newData.getRsNo());
        field.setBsNo(newData.getBsNo());
        field.setKothianNo(newData.getKothianNo());
        field.setComment(newData.getComment());

        field.setUpdatedAt(LocalDateTime.now());

        return repository.save(field);
    }



    // Soft delete
    public void delete(Long id) {
        Field field = getById(id);
        field.setDeletedAt(LocalDateTime.now());
        repository.save(field);
    }

    // Trash
    public List<Field> getTrash() {
        return repository.findByDeletedAtIsNotNull();
    }
}