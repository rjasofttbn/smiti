package com.example.smiti.field.service;

import com.example.smiti.auth.entity.User;
import com.example.smiti.auth.repository.UserRepository;
import com.example.smiti.field.entity.Field;
import com.example.smiti.field.repository.FieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FieldService {

    private final FieldRepository fieldRepository;
    private final UserRepository userRepository;

    // Create field
    public Field create(Field field, String username) {
        // 1. Get the actual User entity from the DB
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Set the User object (Lombok creates setCreatedBy for the createdBy field)
        field.setCreatedBy(user);
        field.setCreatedAt(LocalDateTime.now());

        return fieldRepository.save(field);
    }

    // Get all active
    public List<Field> getAllActive() {
        return fieldRepository.findByDeletedAtIsNull();
    }

    // Get by ID
    public Field getById(Long id) {
        return fieldRepository.findById(id)
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

        return fieldRepository.save(field);
    }



    // Soft delete
    public void delete(Long id) {
        Field field = getById(id);
        field.setDeletedAt(LocalDateTime.now());
        fieldRepository.save(field);
    }

    // Trash
    public List<Field> getTrash() {
        return fieldRepository.findByDeletedAtIsNotNull();
    }
}