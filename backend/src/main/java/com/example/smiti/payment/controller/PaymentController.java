package com.example.smiti.payment.controller;

import com.example.smiti.payment.entity.Payment;
import com.example.smiti.payment.entity.PaymentDTO;
import com.example.smiti.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PaymentService paymentService;

    // Create payment
    @PostMapping
    public ResponseEntity<Payment> create(@RequestBody Map<String, Object> payload, Principal principal) {
        Long shareholderId = Long.valueOf(payload.get("shareholderId").toString());

        Payment payment = new Payment();
        payment.setAmount(BigDecimal.valueOf(Double.valueOf(payload.get("amount").toString())));
        payment.setType(payload.get("type").toString());
        payment.setKistiType(payload.get("kistiType").toString());
        // Optional: paymentDate
        Object dateObj = payload.get("paymentDate");
        if (dateObj != null) {
            payment.setPaymentDate(LocalDate.parse(dateObj.toString())); // expects "YYYY-MM-DD"
        }
        payment.setComment((String) payload.get("comment"));

        Payment savedPayment = paymentService.create(shareholderId, payment, principal.getName());
        return ResponseEntity.ok(savedPayment);
    }
//    @PostMapping
//    public ResponseEntity<Payment> create(@RequestBody Payment payment, Principal principal) {
//        Payment savedPayment = paymentService.create(payment, principal.getName());
//        return ResponseEntity.ok(savedPayment);
//    }

    // Get all payments
    @GetMapping
// Change <List<Payment>> to <List<PaymentDTO>>
    public ResponseEntity<List<PaymentDTO>> getAll() {
        // Remove the manual (casting) - it's no longer needed!
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
    public ResponseEntity<Payment> update(
            @PathVariable Long id,
            @RequestBody Payment payment,
            Principal principal) {

        Payment updatedPayment = paymentService.update(id, payment, principal.getName());
        return ResponseEntity.ok(updatedPayment);
    }

    // Status active
    @PatchMapping("/{id}/approved")
    public ResponseEntity<Payment> approved(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.updateStatus(id, "Approved"));
    }

    // Status inactive
    @PatchMapping("/{id}/requested")
    public ResponseEntity<Payment> requested(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.updateStatus(id, "Requested"));
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