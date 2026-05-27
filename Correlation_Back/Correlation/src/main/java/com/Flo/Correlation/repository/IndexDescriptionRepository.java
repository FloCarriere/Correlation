package com.Flo.Correlation.repository;

import com.Flo.Correlation.entity.IndexDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndexDescriptionRepository extends JpaRepository<IndexDescription, Long> {
}
