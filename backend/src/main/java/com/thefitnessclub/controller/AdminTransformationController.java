package com.thefitnessclub.controller;

import com.thefitnessclub.entity.Transformation;
import com.thefitnessclub.repository.TransformationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/transformations")
public class AdminTransformationController {

    private final TransformationRepository repo;

    public AdminTransformationController(TransformationRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Transformation> getAll() {
        return repo.findAllByOrderByDisplayOrderAscCreatedAtDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transformation> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Transformation> create(@RequestBody Transformation item) {
        item.setId(null);
        Transformation saved = repo.save(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transformation> update(@PathVariable Long id, @RequestBody Transformation item) {
        return repo.findById(id)
                .map(existing -> {
                    existing.setName(item.getName());
                    existing.setCategory(item.getCategory());
                    existing.setAchievement(item.getAchievement());
                    existing.setDuration(item.getDuration());
                    existing.setWeightChange(item.getWeightChange());
                    existing.setBodyFat(item.getBodyFat());
                    existing.setBeforeImage(item.getBeforeImage());
                    existing.setAfterImage(item.getAfterImage());
                    existing.setQuote(item.getQuote());
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
