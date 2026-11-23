package com.thefitnessclub.controller;

import com.thefitnessclub.entity.Product;
import com.thefitnessclub.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    private final ProductRepository repo;

    public AdminProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Product> getAll() {
        return repo.findAllByOrderByDisplayOrderAscCreatedAtDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product item) {
        item.setId(null);
        Product saved = repo.save(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product item) {
        return repo.findById(id)
                .map(existing -> {
                    existing.setName(item.getName());
                    existing.setEdition(item.getEdition());
                    existing.setCategory(item.getCategory());
                    existing.setPrice(item.getPrice());
                    existing.setDetails(item.getDetails());
                    existing.setImage(item.getImage());
                    existing.setStatus(item.getStatus());
                    existing.setBadge(item.getBadge());
                    existing.setDisplayOrder(item.getDisplayOrder());
                    return ResponseEntity.ok(repo.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
