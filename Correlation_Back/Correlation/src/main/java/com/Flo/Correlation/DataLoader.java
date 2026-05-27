package com.Flo.Correlation;

import com.Flo.Correlation.entity.IndexData;
import com.Flo.Correlation.entity.IndexDescription;
import com.Flo.Correlation.repository.IndexDataRepository;
import com.Flo.Correlation.repository.IndexDescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataLoader implements CommandLineRunner {
    @Autowired
    private IndexDescriptionRepository indexNameRepository;

    @Autowired
    private IndexDataRepository indexDataRepository;

    @Override
    public void run(String... args) throws Exception {
        // 1. Créer l'entité parente
        IndexDescription sp500 = new IndexDescription();
        sp500.setName("S&P 500");
        sp500.setSymbol("SPX");
        indexNameRepository.save(sp500);

        // 2. Créer une donnée liée
        IndexData data1 = new IndexData();
        data1.setClosingPrice(5000.50);
        data1.setDateDay(LocalDate.parse("2023-10-10"));
        data1.setIndexDescription(sp500); // On lie la donnée à l'indice

        indexDataRepository.save(data1);

        System.out.println("Données de test insérées avec succès !");
    }
}
