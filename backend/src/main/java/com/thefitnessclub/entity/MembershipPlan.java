package com.thefitnessclub.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "membership_plans")
public class MembershipPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    @Column(nullable = false)
    private String name;

    @Column(name = "duration_months", nullable = false)
    private Integer durationMonths = 1;

    @Column(name = "duration_days")
    private Integer durationDays;

    @Column(nullable = false)
    private Double price;

    private String currency = "INR";
    private String tier;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    private String badge;

    @Column(name = "is_popular")
    private Boolean isPopular = false;

    @Column(columnDefinition = "TEXT")
    private String featuresSummary;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public MembershipPlan() {}

    public MembershipPlan(String code, String name, Integer durationMonths, Integer durationDays,
                          Double price, String currency, String tier, Boolean isActive,
                          String badge, Boolean isPopular, String featuresSummary,
                          String description, Integer displayOrder) {
        this.code = code;
        this.name = name;
        this.durationMonths = durationMonths != null ? durationMonths : 1;
        this.durationDays = durationDays;
        this.price = price;
        this.currency = currency != null ? currency : "INR";
        this.tier = tier;
        this.isActive = isActive != null ? isActive : true;
        this.badge = badge;
        this.isPopular = isPopular != null ? isPopular : false;
        this.featuresSummary = featuresSummary;
        this.description = description;
        this.displayOrder = displayOrder != null ? displayOrder : 0;
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getDurationMonths() { return durationMonths; }
    public void setDurationMonths(Integer durationMonths) { this.durationMonths = durationMonths; }

    public Integer getDurationDays() { return durationDays; }
    public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getTier() { return tier; }
    public void setTier(String tier) { this.tier = tier; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public Boolean getIsPopular() { return isPopular; }
    public void setIsPopular(Boolean isPopular) { this.isPopular = isPopular; }

    public String getFeaturesSummary() { return featuresSummary; }
    public void setFeaturesSummary(String featuresSummary) { this.featuresSummary = featuresSummary; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
