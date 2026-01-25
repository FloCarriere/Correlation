import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Test } from './components/test/test';
import { GraphiqueComponent } from './components/graphique-component/graphique-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Test, GraphiqueComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('correlationFront');
}
