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
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor // Lombok generates constructor automatically
public class ShareholderController {

    private final ShareholderService shareholderService;

    // Remove this manual constructor:
    // public ShareholderController(ShareholderService service) {
    //     this.shareholderService = service;
    // }

    @PostMapping
    public ResponseEntity<Shareholder> create(@RequestBody Shareholder shareholder, Principal principal) {
        return ResponseEntity.ok(shareholderService.create(shareholder, principal.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Shareholder>> getAll() {
        return ResponseEntity.ok(shareholderService.getAllActive());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shareholder> getById(@PathVariable Long id) {
        return ResponseEntity.ok(shareholderService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shareholder> update(@PathVariable Long id, @RequestBody Shareholder shareholder) {
        return ResponseEntity.ok(shareholderService.updateShareholder(id, shareholder));
    }

    @PatchMapping("/{id}/active")
    public ResponseEntity<Shareholder> setStatusActive(@PathVariable Long id) {
        return ResponseEntity.ok(shareholderService.updateStatus(id, "active"));
    }

    @PatchMapping("/{id}/inactive")
    public ResponseEntity<Shareholder> setStatusInactive(@PathVariable Long id) {
        return ResponseEntity.ok(shareholderService.updateStatus(id, "inactive"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id, @RequestParam(defaultValue = "false") boolean confirm) {
        if (!confirm) {
            return ResponseEntity.status(400)
                    .body("Delete shareholder ID " + id + "? Add '?confirm=true' to proceed.");
        }
        shareholderService.delete(id);
        return ResponseEntity.ok("Shareholder moved to trash.");
    }

    @GetMapping("/trash")
    public ResponseEntity<List<Shareholder>> getTrash() {
        return ResponseEntity.ok(shareholderService.getTrash());
    }
}