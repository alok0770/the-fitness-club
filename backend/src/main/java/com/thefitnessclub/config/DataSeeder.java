package com.thefitnessclub.config;

import com.thefitnessclub.entity.Event;
import com.thefitnessclub.entity.MembershipPlan;
import com.thefitnessclub.entity.Product;
import com.thefitnessclub.entity.Transformation;
import com.thefitnessclub.repository.EventRepository;
import com.thefitnessclub.repository.MembershipPlanRepository;
import com.thefitnessclub.repository.ProductRepository;
import com.thefitnessclub.repository.TransformationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TransformationRepository transformationRepo;
    private final EventRepository eventRepo;
    private final ProductRepository productRepo;
    private final MembershipPlanRepository planRepo;

    @Value("${app.seed-demo-data:false}")
    private boolean seedDemoData;

    public DataSeeder(TransformationRepository transformationRepo,
                      EventRepository eventRepo,
                      ProductRepository productRepo,
                      MembershipPlanRepository planRepo) {
        this.transformationRepo = transformationRepo;
        this.eventRepo = eventRepo;
        this.productRepo = productRepo;
        this.planRepo = planRepo;
    }

    @Override
    public void run(String... args) {
        if (!seedDemoData) {
            return;
        }
        seedPlans();
        seedTransformations();
        seedEvents();
        seedProducts();
    }

    private void seedPlans() {
        if (planRepo.count() > 0) return;

        planRepo.save(new MembershipPlan(
                "M1",
                "1-Month Base",
                1,
                30,
                1000.0,
                "INR",
                "STANDARD",
                true,
                null,
                false,
                "Full Gym Floor & Free Weights Access, Strength Machines & Lifting Zone, Floor Trainer Form Guidance, Dedicated Changing & Bag Storage Area",
                "Flexible month-to-month gym access with hands-on floor guidance and complete free weight privileges.",
                1
        ));

        planRepo.save(new MembershipPlan(
                "M3",
                "3-Month Pro",
                3,
                90,
                2800.0,
                "INR",
                "PRO",
                true,
                "Save ₹200",
                false,
                "Full Gym Floor & Free Weights Access, Custom Workout Split & Routine Plan, Monthly Strength & Progress Check-In, Priority Floor Trainer Support",
                "Quarterly foundation designed for consistent progressive overload, personalized workout splits, and tangible results.",
                2
        ));

        planRepo.save(new MembershipPlan(
                "M12",
                "12-Month VIP",
                12,
                365,
                10000.0,
                "INR",
                "VIP",
                true,
                "Save ₹2,000",
                true,
                "Personalized Diet & Workout Roadmap, Priority 1-on-1 Form Guidance, 10% Pro Shop Discount, 2 Free Guest Day-Passes, 15-Day Travel Freeze",
                "The definitive all-access VIP pass with comprehensive coaching roadmaps, pro shop savings, and membership freeze options.",
                3
        ));
    }

    private void seedTransformations() {
        if (transformationRepo.count() > 0) return;

        transformationRepo.save(new Transformation(
                "Alok Rana",
                "Hypertrophy & V-Taper",
                "+9 kg Lean Muscle",
                "24 Weeks",
                "56 kg → 65 kg",
                "18% → 10%",
                "/assets/alok-before.jpg",
                "/assets/alok-after.jpg",
                "Disciplined progressive overload and metabolic nutrition at The Fitness Club.",
                1
        ));

        transformationRepo.save(new Transformation(
                "David Reynolds",
                "Strength & Recomposition",
                "+140 kg Big 3 Total",
                "24 Weeks",
                "74 kg → 83 kg",
                "14% → 11%",
                "/assets/transformation-2-before.jpg",
                "/assets/transformation-2-after.jpg",
                "Focused biomechanics and relentless accountability. Zero fluff.",
                2
        ));

        transformationRepo.save(new Transformation(
                "Elena Rostova",
                "Athletic Conditioning",
                "-8 kg Fat Loss",
                "20 Weeks",
                "64 kg → 56 kg",
                "23% → 13%",
                "/assets/transformation-3-before.jpg",
                "/assets/transformation-3-after.jpg",
                "Explosive output, cardiovascular stamina, and physique definition.",
                3
        ));
    }

    private void seedEvents() {
        if (eventRepo.count() > 0) return;

        eventRepo.save(new Event(
                "Iron Clash: Deadlift & PR Night",
                "STRENGTH MEET",
                "Strength & Power",
                "Every Last Friday",
                "19:00 - 22:00",
                "Main Platform",
                "Members Only",
                "Heavy iron, raw chalk, and personal records under the lights.",
                "Join the squad on the platform for calibrated kilo pulls and maximum encouragement.",
                "/images/events/event-1.jpg",
                1
        ));

        eventRepo.save(new Event(
                "Strength & Grip Challenge",
                "COMMUNITY SHOWDOWN",
                "Grip & Endurance",
                "Monthly Showcase",
                "10:00 - 13:00",
                "Functional Zone",
                "Open Invitational",
                "Monthly head-to-head endurance and grip battles for the squad.",
                "Farmer carries, axle deadlifts, and pinch-block holds testing true work capacity.",
                "/images/events/event-2.jpg",
                2
        ));

        eventRepo.save(new Event(
                "The Fitness Club: Squad Night",
                "SQUAD NIGHT",
                "Social & Lifting",
                "Bi-Weekly Saturday",
                "20:00 - 23:00",
                "Full Facility",
                "All Tiers",
                "Curated playlists, PR attempts, and community atmosphere.",
                "After-hours training with competition lighting, recovery refreshments, and team coaching.",
                "/images/events/event-3.jpg",
                3
        ));

        eventRepo.save(new Event(
                "Sunday Outdoor Conditioning",
                "OUTDOOR RUN CLUB",
                "Conditioning & Aerobic",
                "Every Sunday",
                "06:30 - 08:30",
                "Joshiyara Trails",
                "Complimentary",
                "Sunrise sprints and recovery sessions beyond the gym walls.",
                "High-altitude trail running, hill sprints, and mobility recovery in the fresh mountain air.",
                "/images/events/event-4.jpg",
                4
        ));
    }

    private void seedProducts() {
        if (productRepo.count() > 0) return;

        productRepo.save(new Product(
                "Hydrolyzed Native Whey Isolate",
                "Formula No. 01 • Cold-Pressed",
                "Nutrition",
                "₹5,499",
                "94% purity cold-pressed grass-fed isolate with bioactive enzymatic absorption matrix.",
                "/assets/product-1.jpg",
                "In Stock",
                "Best Seller",
                1
        ));

        productRepo.save(new Product(
                "Architect Leather Lever Belt (11mm)",
                "Hand-Crafted English Bridle",
                "Equipment",
                "₹8,999",
                "Full-grain English bridle leather with micro-adjustable matte blackened zinc lever.",
                "/assets/product-2.jpg",
                "Limited Stock",
                "IPF Approved",
                2
        ));

        productRepo.save(new Product(
                "Heavy French Terry Oversized Hoodie",
                "520 GSM Minimalist Silhouette",
                "Apparel",
                "₹4,200",
                "Drop-shoulder structure with tonal embossed emblem and dense double-knit cuffs.",
                "/assets/product-3.jpg",
                "In Stock",
                "Member Favorite",
                3
        ));

        productRepo.save(new Product(
                "Pure Micronized Creapure & Minerals",
                "Elemental Bioactive Complex",
                "Nutrition",
                "₹2,199",
                "Pharmaceutical grade creatine monohydrate combined with bioactive chelated electrolytes.",
                "/assets/product-4.jpg",
                "In Stock",
                "Certified Clean",
                4
        ));
    }
}
