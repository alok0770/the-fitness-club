package com.thefitnessclub.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "transformations")
public class Transformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String category;
    private String achievement;
    private String duration;
    private String weightChange;
    private String bodyFat;

    @Column(columnDefinition = "TEXT")
    private String beforeImage;

    @Column(columnDefinition = "TEXT")
    private String afterImage;

    @Column(columnDefinition = "TEXT")
    private String quote;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public Transformation() {}

    public Transformation(String name, String category, String achievement, String duration,
                          String weightChange, String bodyFat, String beforeImage, String afterImage,
                          String quote, Integer displayOrder) {
        this.name = name;
        this.category = category;
        this.achievement = achievement;
        this.duration = duration;
        this.weightChange = weightChange;
        this.bodyFat = bodyFat;
        this.beforeImage = beforeImage;
        this.afterImage = afterImage;
        this.quote = quote;
        this.displayOrder = displayOrder != null ? displayOrder : 0;
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getAchievement() { return achievement; }
    public void setAchievement(String achievement) { this.achievement = achievement; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getWeightChange() { return weightChange; }
    public void setWeightChange(String weightChange) { this.weightChange = weightChange; }

    public String getBodyFat() { return bodyFat; }
    public void setBodyFat(String bodyFat) { this.bodyFat = bodyFat; }

    public String getBeforeImage() { return beforeImage; }
    public void setBeforeImage(String beforeImage) { this.beforeImage = beforeImage; }

    public String getAfterImage() { return afterImage; }
    public void setAfterImage(String afterImage) { this.afterImage = afterImage; }

    public String getQuote() { return quote; }
    public void setQuote(String quote) { this.quote = quote; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
