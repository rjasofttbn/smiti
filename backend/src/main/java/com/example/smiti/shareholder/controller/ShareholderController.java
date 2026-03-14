package com.example.smiti.shareholder.controller;

import com.example.smiti.shareholder.entity.Shareholder;
import com.example.smiti.shareholder.service.ShareholderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/shareholders")
@RequiredArgsConstructor
public class ShareholderController {

    private final ShareholderService shareholderService;

    // Create a new shareholder
    @PostMapping
    public ResponseEntity<Shareholder> create(@RequestBody Shareholder shareholder, Principal principal) {
        return ResponseEntity.ok(shareholderService.create(shareholder, principal.getName()));
    }

    // Get all active shareholders
    @GetMapping
    public ResponseEntity<List<Shareholder>> getAll() {
        return ResponseEntity.ok(shareholderService.getAllActive());
    }

    // Get shareholder by ID
    @GetMapping("/{id}")
    public ResponseEntity<Shareholder> getById(@PathVariable Long id) {
        return ResponseEntity.ok(shareholderService.getById(id));
    }

    // Update shareholder
    @PutMapping("/{id}")
    public ResponseEntity<Shareholder> update(@PathVariable Long id, @RequestBody Shareholder shareholder) {
        return ResponseEntity.ok(shareholderService.updateShareholder(id, shareholder));
    }

    // Set status to active
    @PatchMapping("/{id}/active")
    public ResponseEntity<Shareholder> setStatusActive(@PathVariable Long id) {
        return ResponseEntity.ok(shareholderService.updateStatus(id, "active"));
    }

    // Set status to inactive
    @PatchMapping("/{id}/inactive")
    public ResponseEntity<Shareholder> setStatusInactive(@PathVariable Long id) {
        return ResponseEntity.ok(shareholderService.updateStatus(id, "inactive"));
    }

    // Delete shareholder (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id, @RequestParam(defaultValue = "false") boolean confirm) {
        if (!confirm) {
            return ResponseEntity.status(400)
                    .body("Delete shareholder ID " + id + "? Add '?confirm=true' to proceed.");
        }
        shareholderService.delete(id);
        return ResponseEntity.ok("Shareholder moved to trash.");
    }

    // Get trashed shareholders
    @GetMapping("/trash")
    public ResponseEntity<List<Shareholder>> getTrash() {
        return ResponseEntity.ok(shareholderService.getTrash());
    }
}