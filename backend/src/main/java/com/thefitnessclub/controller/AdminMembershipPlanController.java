package com.thefitnessclub.controller;

import com.thefitnessclub.entity.MembershipPlan;
import com.thefitnessclub.repository.MembershipPlanRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/plans")
public class AdminMembershipPlanController {

    private final MembershipPlanRepository repo;

    public AdminMembershipPlanController(MembershipPlanRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<MembershipPlan> getAll() {
        return repo.findAllByOrderByDisplayOrderAscDurationMonthsAsc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MembershipPlan> getById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MembershipPlan> create(@RequestBody MembershipPlan item) {
        item.setId(null);
        MembershipPlan saved = repo.save(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MembershipPlan> update(@PathVariable Long id, @RequestBody MembershipPlan item) {
        return repo.findById(id)
                .map(existing -> {
                    existing.setCode(item.getCode());
                    existing.setName(item.getName());
                    existing.setDurationMonths(item.getDurationMonths());
                    existing.setDurationDays(item.getDurationDays());
                    existing.setPrice(item.getPrice());
                    existing.setCurrency(item.getCurrency());
                    existing.setTier(item.getTier());
                    existing.setIsActive(item.getIsActive());
                    existing.setBadge(item.getBadge());
                    existing.setIsPopular(item.getIsPopular());
                    existing.setFeaturesSummary(item.getFeaturesSummary());
                    existing.setDescription(item.getDescription());
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
