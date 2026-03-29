import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Importe ChangeDetectorRef
import { ChartConfiguration, ChartData, ChartType, Chart, registerables } from 'chart.js';
import { MesureService } from '../../services/mesure-service';
//import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-graphique-component',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graphique-component.html',
  styleUrl: './graphique-component.scss',
})
export class GraphiqueComponent implements OnInit {
  // @ViewChild(BaseChartDirective) chart?: BaseChartDirective; //ajouter pour réparer l'actualisation
  // Configuration des données du graphique
  public lineChartData?: ChartData<'line'> = {
    // ajout de ? pour que ce soit optionnel avant retour du service
    datasets: [],
    labels: [], // Les points sur l'axe X
  };

  // Options du graphique (ex: rendre les courbes lisses)
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, // Optionnel : aide souvent à l'affichage
    elements: { line: { tension: 0.4 } },
  };

  // 2. Injecte le ChangeDetectorRef dans le constructeur
  constructor(
    private mesureService: MesureService,
    private cdr: ChangeDetectorRef,
  ) {
    Chart.register(...registerables); // 2. Toujours enregistrer les composants pour Chart.js --> ajouter pour essayer de réparer pb d'actualisation
  }

  ngOnInit() {
    console.log('debut ngoninit');

    this.mesureService.getMesuresGroupees().subscribe((data) => {
      const nomsDesCourbes = Object.keys(data);
      const nouveauxDatasets: any[] = [];
      let tousLesLabels: any[] = [];

      nomsDesCourbes.forEach((nom, index) => {
        const points = data[nom as keyof typeof data];

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

      console.log('passage service');
      console.log(nouveauxDatasets);

      // 3. On assigne les données
      this.lineChartData = {
        labels: tousLesLabels,
        datasets: nouveauxDatasets,
      };

      // 4. TRÈS IMPORTANT : On force la détection de changement
      // Cela simule ce qui se passe quand tu modifies le HTML/SCSS
      this.cdr.detectChanges();
    });
  }

  // Petite fonction utilitaire pour varier les couleurs automatiquement
  private genererCouleur(index: number, opacite: number = 1): string {
    const couleurs = ['#3f51b5', '#ff4081', '#4caf50', '#ffeb3b'];
    return couleurs[index % couleurs.length];
  }
}

// !!!!!!!!!! pb de refresh : quand on change la disposition du div (toucher aux paramètre style du div) dans le html ça marche mais ça disparait quand on actualise
// ça vient du scss ou du html pas du ts
/*C'est le diagnostic final ! Si même au lancement (premier chargement) rien ne s'affiche, mais que la moindre modification du code "réveille" le graphique, c'est que la détection de changement d'Angular (Change Detection) ne surveille pas ton service.

Cela arrive souvent si ton service MesureService utilise fetch, axios, ou une base de données temps réel (comme Firebase ou des WebSockets) qui s'exécute en dehors de la "Zone" d'Angular. Angular ne "voit" pas les données arriver, donc il ne rafraîchit pas le HTML.

Voici la solution chirurgicale pour forcer l'affichage :

1. Utiliser le ChangeDetectorRef (La méthode fiable)
Nous allons dire manuellement à Angular : "Hé, les données sont là, redessine le composant maintenant !"
2. Pourquoi le HTML/SCSS "répare" le problème ?
Quand tu modifies un fichier, l'outil de développement d'Angular (HMR - Hot Module Replacement) force un cycle de rendu complet sur tous les composants actifs. Comme tes données sont déjà arrivées et stockées dans this.lineChartData, elles apparaissent d'un coup.

Au lancement normal ou au F5, Angular fait son cycle de rendu avant que le backend ne réponde, puis il "s'endort" car il ne détecte pas que le subscribe a modifié une variable.*/

//voir les 4 étapes dans le code
