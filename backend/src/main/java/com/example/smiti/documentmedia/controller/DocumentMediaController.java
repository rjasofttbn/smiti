package com.example.smiti.documentmedia.controller;

import com.example.smiti.documentmedia.entity.DocumentMedia;
import com.example.smiti.documentmedia.service.DocumentMediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/document-media")
@RequiredArgsConstructor
public class DocumentMediaController {

    private final DocumentMediaService service;

    // Create
    @PostMapping
    public ResponseEntity<DocumentMedia> create(@RequestBody DocumentMedia doc, Principal principal) {
        return ResponseEntity.ok(service.create(doc, principal.getName()));
    }

    // Get all
    @GetMapping
    public ResponseEntity<List<DocumentMedia>> getAll() {
        return ResponseEntity.ok(service.getAllActive());
    }

    // Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<DocumentMedia> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    // Get by linkedToId + linkedType
    @GetMapping("/linked/{linkedType}/{linkedToId}")
    public ResponseEntity<List<DocumentMedia>> getByLinked(@PathVariable String linkedType,
                                                           @PathVariable Long linkedToId) {
        return ResponseEntity.ok(service.getByLinked(linkedToId, linkedType));
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<DocumentMedia> update(@PathVariable Long id, @RequestBody DocumentMedia doc) {
        return ResponseEntity.ok(service.update(id, doc));
    }

    // Soft delete
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id,
                                         @RequestParam(defaultValue = "false") boolean confirm) {
        if (!confirm) {
            return ResponseEntity.badRequest()
                    .body("Delete DocumentMedia ID " + id + "? add ?confirm=true");
        }

        service.delete(id);

        return ResponseEntity.ok("Document media moved to trash");
    }

    // Trash
    @GetMapping("/trash")
    public ResponseEntity<List<DocumentMedia>> trash() {
        return ResponseEntity.ok(service.getTrash());
    }
}