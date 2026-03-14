package com.example.smiti.fieldpayment.controller;

import com.example.smiti.fieldpayment.entity.FieldPayment;
import com.example.smiti.fieldpayment.service.FieldPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/field-payments")
@RequiredArgsConstructor
public class FieldPaymentController {

    private final FieldPaymentService service;

    // Create
    @PostMapping
    public ResponseEntity<FieldPayment> create(@RequestBody FieldPayment payment,
                                               Principal principal) {

        return ResponseEntity.ok(service.create(payment, principal.getName()));
    }

    // Get all
    @GetMapping
    public ResponseEntity<List<FieldPayment>> getAll() {

        return ResponseEntity.ok(service.getAllActive());
    }

    // Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<FieldPayment> getById(@PathVariable Long id) {

        return ResponseEntity.ok(service.getById(id));
    }

    // Get by field
    @GetMapping("/field/{fieldId}")
    public ResponseEntity<List<FieldPayment>> getByField(@PathVariable Long fieldId) {

        return ResponseEntity.ok(service.getByField(fieldId));
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<FieldPayment> update(@PathVariable Long id,
                                               @RequestBody FieldPayment payment) {

        return ResponseEntity.ok(service.update(id, payment));
    }

    // Soft delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id,
                                         @RequestParam(defaultValue = "false") boolean confirm) {

        if (!confirm) {
            return ResponseEntity.badRequest()
                    .body("Delete Field Payment " + id + "? add ?confirm=true");
        }

        service.delete(id);

        return ResponseEntity.ok("Field payment moved to trash");
    }

    // Trash
    @GetMapping("/trash")
    public ResponseEntity<List<FieldPayment>> trash() {

        return ResponseEntity.ok(service.getTrash());
    }
}