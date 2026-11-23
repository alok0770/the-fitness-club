package com.thefitnessclub.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String edition;
    private String category;
    private String price;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(columnDefinition = "TEXT")
    private String image;

    private String status = "In Stock";
    private String badge;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public Product() {}

    public Product(String name, String edition, String category, String price,
                   String details, String image, String status, String badge, Integer displayOrder) {
        this.name = name;
        this.edition = edition;
        this.category = category;
        this.price = price;
        this.details = details;
        this.image = image;
        this.status = status != null ? status : "In Stock";
        this.badge = badge;
        this.displayOrder = displayOrder != null ? displayOrder : 0;
        this.createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEdition() { return edition; }
    public void setEdition(String edition) { this.edition = edition; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
