package com.Flo.Correlation.repository;

import com.Flo.Correlation.entity.Mesure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MesureRepository extends JpaRepository<Mesure, Long> {
    // Cette méthode nous permettra de récupérer les points d'une courbe précise
    List<Mesure> findByNomCourbeOrderByValeurXAsc(String nomCourbe);
}