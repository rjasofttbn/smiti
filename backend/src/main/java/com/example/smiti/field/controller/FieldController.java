package com.example.smiti.field.controller;

import com.example.smiti.field.entity.Field;
import com.example.smiti.field.service.FieldService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/fields")
@RequiredArgsConstructor
public class FieldController {

    private final FieldService service;

    // Create field
    @PostMapping
    public ResponseEntity<Field> create(@RequestBody Field field, Principal principal) {
        return ResponseEntity.ok(service.create(field, principal.getName()));
    }

    // Get all fields
    @GetMapping
    public ResponseEntity<List<Field>> getAll() {
        return ResponseEntity.ok(service.getAllActive());
    }

    // Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<Field> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    // Update field
    @PutMapping("/{id}")
    public ResponseEntity<Field> update(@PathVariable Long id, @RequestBody Field field) {
        return ResponseEntity.ok(service.update(id, field));
    }

    // Soft delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id,
                                         @RequestParam(defaultValue = "false") boolean confirm) {
        if (!confirm) {
            return ResponseEntity.badRequest()
                    .body("Delete Field ID " + id + "? add ?confirm=true");
        }

        service.delete(id);

        return ResponseEntity.ok("Field moved to trash");
    }

    // Trash list
    @GetMapping("/trash")
    public ResponseEntity<List<Field>> trash() {
        return ResponseEntity.ok(service.getTrash());
    }
}