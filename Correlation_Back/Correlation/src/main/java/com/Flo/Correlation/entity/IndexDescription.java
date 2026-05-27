package com.Flo.Correlation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IndexDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String symbol;

    // "mappedBy" indique que c'est le champ 'indexName' dans IndexData qui gère la relation
    @OneToMany(mappedBy = "indexDescription", cascade = CascadeType.ALL)
    private List<IndexData> indexDataList;
}

