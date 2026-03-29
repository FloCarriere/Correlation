import { Routes } from '@angular/router';
import { GraphiqueComponent } from './components/graphique-component/graphique-component';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

export const routes: Routes = [
  { path: 'graphique', component: GraphiqueComponent },
  { path: 'header', component: Header },
  { path: 'footer', component: Footer },
  { path: '**', component: GraphiqueComponent, pathMatch: 'full' },
];
