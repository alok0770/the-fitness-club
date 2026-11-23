package com.thefitnessclub.controller;

import com.thefitnessclub.dto.BootstrapResponse;
import com.thefitnessclub.entity.Event;
import com.thefitnessclub.entity.MembershipPlan;
import com.thefitnessclub.entity.Product;
import com.thefitnessclub.entity.Transformation;
import com.thefitnessclub.repository.EventRepository;
import com.thefitnessclub.repository.MembershipPlanRepository;
import com.thefitnessclub.repository.ProductRepository;
import com.thefitnessclub.repository.TransformationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PublicController {

    private final TransformationRepository transformationRepo;
    private final EventRepository eventRepo;
    private final ProductRepository productRepo;
    private final MembershipPlanRepository planRepo;

    public PublicController(TransformationRepository transformationRepo,
                            EventRepository eventRepo,
                            ProductRepository productRepo,
                            MembershipPlanRepository planRepo) {
        this.transformationRepo = transformationRepo;
        this.eventRepo = eventRepo;
        this.productRepo = productRepo;
        this.planRepo = planRepo;
    }

    /**
     * Single cold-start proof bootstrap payload for the public React app.
     * Returns active plans and all items sorted by displayOrder ASC, createdAt DESC.
     */
    @GetMapping("/public/bootstrap")
    public ResponseEntity<BootstrapResponse> getBootstrapData() {
        List<Transformation> transformations = transformationRepo.findAllByOrderByDisplayOrderAscCreatedAtDesc();
        List<Event> events = eventRepo.findAllByOrderByDisplayOrderAscCreatedAtDesc();
        List<Product> products = productRepo.findAllByOrderByDisplayOrderAscCreatedAtDesc();
        List<MembershipPlan> plans = planRepo.findAllByIsActiveTrueOrderByDisplayOrderAscDurationMonthsAsc();

        return ResponseEntity.ok(new BootstrapResponse(transformations, events, products, plans));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealth() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "app", "The Fitness Club Backend",
                "hq", "Joshiyara Road HQ • Uttarkashi",
                "timestamp", Instant.now().toString()
        ));
    }
}
