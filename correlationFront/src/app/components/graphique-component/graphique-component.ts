import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { MesureService } from '../../services/mesure-service';
//import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graphique-component',
  imports: [BaseChartDirective],
  templateUrl: './graphique-component.html',
  styleUrl: './graphique-component.scss',
})
export class GraphiqueComponent implements OnInit {
  // Configuration des données du graphique
  public lineChartData: ChartData<'line'> = {
    datasets: [],
    labels: [], // Les points sur l'axe X
  };

  // Options du graphique (ex: rendre les courbes lisses)
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: { line: { tension: 0.4 } },
  };

  constructor(private mesureService: MesureService) {}

  ngOnInit() {
    this.mesureService.getMesuresGroupees().subscribe((data) => {
      const nomsDesCourbes = Object.keys(data);
      const nouveauxDatasets: any[] = [];
      let tousLesLabels: any[] = [];

      nomsDesCourbes.forEach((nom, index) => {
        const points = data[nom as keyof typeof data];
        console.log('**************************');
        console.log(points);

        if (Array.isArray(points)) {
          // On récupère les X de la première courbe pour les labels
          if (index === 0) {
            tousLesLabels = points.map((p) => p.valeurX);
          }

          // On crée une ligne pour chaque groupe
          nouveauxDatasets.push({
            data: points.map((p) => p.valeurY),
            label: nom,
            fill: false,
            borderColor: this.genererCouleur(index),
            backgroundColor: this.genererCouleur(index, 0.3),
          });
        }
      });

      this.lineChartData = {
        labels: tousLesLabels,
        datasets: nouveauxDatasets,
      };
    });
  }

  // Petite fonction utilitaire pour varier les couleurs automatiquement
  private genererCouleur(index: number, opacite: number = 1): string {
    const couleurs = ['#3f51b5', '#ff4081', '#4caf50', '#ffeb3b'];
    return couleurs[index % couleurs.length];
  }
}
