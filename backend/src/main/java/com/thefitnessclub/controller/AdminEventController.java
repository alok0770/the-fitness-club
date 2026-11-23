package com.thefitnessclub.controller;

import com.thefitnessclub.entity.Event;
import com.thefitnessclub.repository.EventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/events")
public class AdminEventController {

    private final EventRepository repo;

    public AdminEventController(EventRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Event> getAll() {
        return repo.findAllByOrderByDisplayOrderAscCreatedAtDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Event> create(@RequestBody Event item) {
        item.setId(null);
        Event saved = repo.save(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> update(@PathVariable Long id, @RequestBody Event item) {
        return repo.findById(id)
                .map(existing -> {
                    existing.setTitle(item.getTitle());
                    existing.setTag(item.getTag());
                    existing.setCategory(item.getCategory());
                    existing.setDate(item.getDate());
                    existing.setTime(item.getTime());
                    existing.setLocation(item.getLocation());
                    existing.setBadge(item.getBadge());
                    existing.setCaption(item.getCaption());
                    existing.setDescription(item.getDescription());
                    existing.setImage(item.getImage());
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
