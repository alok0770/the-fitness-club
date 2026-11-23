package com.thefitnessclub.repository;

import com.thefitnessclub.entity.Transformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransformationRepository extends JpaRepository<Transformation, Long> {
    List<Transformation> findAllByOrderByDisplayOrderAscCreatedAtDesc();
}
