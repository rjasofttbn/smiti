package com.example.smiti.payment.controller;

import com.example.smiti.payment.entity.Payment;
import com.example.smiti.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // Create payment
    @PostMapping
    public ResponseEntity<Payment> create(@RequestBody Payment payment, Principal principal) {
        return ResponseEntity.ok(paymentService.create(payment, principal.getName()));
    }

    // Get all payments
    @GetMapping
    public ResponseEntity<List<Payment>> getAll() {
        return ResponseEntity.ok(paymentService.getAllActive());
    }

    // Get payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getById(id));
    }

    // Get payments by shareholder
    @GetMapping("/shareholder/{shareholderId}")
    public ResponseEntity<List<Payment>> getByShareholder(@PathVariable Long shareholderId) {
        return ResponseEntity.ok(paymentService.getByShareholder(shareholderId));
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Payment> update(@PathVariable Long id, @RequestBody Payment payment) {
        return ResponseEntity.ok(paymentService.update(id, payment));
    }

    // Status active
    @PatchMapping("/{id}/active")
    public ResponseEntity<Payment> active(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.updateStatus(id, "active"));
    }

    // Status inactive
    @PatchMapping("/{id}/inactive")
    public ResponseEntity<Payment> inactive(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.updateStatus(id, "inactive"));
    }

    // Soft delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id,
                                         @RequestParam(defaultValue = "false") boolean confirm) {

        if (!confirm) {
            return ResponseEntity.badRequest()
                    .body("Delete payment ID " + id + "? add ?confirm=true");
        }

        paymentService.delete(id);

        return ResponseEntity.ok("Payment moved to trash");
    }

    // Trash list
    @GetMapping("/trash")
    public ResponseEntity<List<Payment>> trash() {
        return ResponseEntity.ok(paymentService.getTrash());
    }
}