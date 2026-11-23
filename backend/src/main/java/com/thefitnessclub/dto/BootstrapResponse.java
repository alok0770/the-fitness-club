package com.thefitnessclub.dto;

import com.thefitnessclub.entity.Event;
import com.thefitnessclub.entity.MembershipPlan;
import com.thefitnessclub.entity.Product;
import com.thefitnessclub.entity.Transformation;

import java.util.List;

public class BootstrapResponse {

    private List<Transformation> transformations;
    private List<Event> events;
    private List<Product> products;
    private List<MembershipPlan> plans;

    public BootstrapResponse() {}

    public BootstrapResponse(List<Transformation> transformations,
                             List<Event> events,
                             List<Product> products,
                             List<MembershipPlan> plans) {
        this.transformations = transformations;
        this.events = events;
        this.products = products;
        this.plans = plans;
    }

    public List<Transformation> getTransformations() { return transformations; }
    public void setTransformations(List<Transformation> transformations) { this.transformations = transformations; }

    public List<Event> getEvents() { return events; }
    public void setEvents(List<Event> events) { this.events = events; }

    public List<Product> getProducts() { return products; }
    public void setProducts(List<Product> products) { this.products = products; }

    public List<MembershipPlan> getPlans() { return plans; }
    public void setPlans(List<MembershipPlan> plans) { this.plans = plans; }
}
