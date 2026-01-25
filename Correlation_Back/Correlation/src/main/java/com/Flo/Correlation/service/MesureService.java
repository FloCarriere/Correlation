package com.Flo.Correlation.service;

import com.Flo.Correlation.entity.Mesure;
import com.Flo.Correlation.repository.MesureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MesureService {

    @Autowired
    private MesureRepository repository;

    // Récupérer toutes les données brutes
    public List<Mesure> obtenirToutesLesMesures() {
        return repository.findAll();
    }

    // Organiser les données par nom de courbe (très utile pour ton front-end !)
    public Map<String, List<Mesure>> obtenirMesuresGroupeesParCourbe() {
        List<Mesure> toutes = repository.findAll();
        return toutes.stream()
                .collect(Collectors.groupingBy(Mesure::getNomCourbe));
    }
}