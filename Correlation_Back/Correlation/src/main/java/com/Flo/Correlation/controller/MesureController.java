package com.Flo.Correlation.controller;


import com.Flo.Correlation.entity.Mesure;
import com.Flo.Correlation.service.MesureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mesures")
@CrossOrigin(origins = "http://localhost:4200")
public class MesureController {

    @Autowired
    private MesureService mesureService; // On injecte le service et non le repo

    @GetMapping
    public List<Mesure> getAll() {
        return mesureService.obtenirToutesLesMesures();
    }

    @GetMapping("/groupees")
    public Map<String, List<Mesure>> getGroupees() {
        return mesureService.obtenirMesuresGroupeesParCourbe();
    }
}