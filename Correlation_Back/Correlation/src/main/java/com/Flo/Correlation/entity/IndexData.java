package com.Flo.Correlation.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "Data")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IndexData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double closingPrice;
    private LocalDate dateDay;

    @ManyToOne
   @JoinColumn(name = "index_description_id", nullable = false) // Crée une colonne de jointure dans la table index_data
    private IndexDescription indexDescription;


}
