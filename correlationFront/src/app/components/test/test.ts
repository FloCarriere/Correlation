import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-test',
  imports: [BaseChartDirective],
  templateUrl: './test.html',
  styleUrl: './test.scss',
})
export class Test {
  // 1. Définition du type de graphique
  public lineChartType: ChartType = 'line';

  // Configuration des données avec deux datasets
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Série A (2025)', //C'est ce qui apparaîtra dans la légende en haut du graphique.
        borderColor: '#42A5F5', // Bleu
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        //fill: true,//Défini sur true, il remplit la zone sous la courbe avec la backgroundColor. C'est très utile pour créer un "Area Chart".
        tension: 0.4, // Courbure de la ligne (0 = droit, 0.5 = arrondi)
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Série B (2026)',
        borderColor: '#FFA726', // Orange
        backgroundColor: 'rgba(255, 167, 38, 0.2)',
        //fill: true,
        tension: 0.25,
      },
    ],
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Force l'axe Y à commencer à 0
      },
    },
  };
}
