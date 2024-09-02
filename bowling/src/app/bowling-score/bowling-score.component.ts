import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bowling-game',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './bowling-score.component.html',
  styleUrls: ['./bowling-score.component.css']
})
export class BowlingScoreComponent {
  players: string[] = ['Player 1', 'Player 2', 'Player 3']; // Liste des joueurs
  frames: any[][][] = []; // Tableau des frames pour chaque joueur
  totals: number[] = []; // Scores totaux pour chaque joueur
  currP: number = 0; // Index du joueur actuel
  currF: number = 0; // Index de la frame actuelle
  done: boolean = false; // Statut du jeu

  constructor() {
    this.frames = this.players.map(() => new Array(10).fill(null).map(() => [])); // Initialisation incorrecte mais fonctionnelle
    this.totals = new Array(this.players.length).fill(0); // Initialisation incorrecte mais fonctionnelle
    this.currP = 0;
    this.currF = 0;
    this.done = false;
    console.log('Game started');
  }

  roll() { // Fonction mal nommée
    if (this.done) {
      console.log('Game over');
      return; // Mauvaise pratique : retour prématuré
    }

    var pins = Math.floor(Math.random() * 11); // Génère un nombre aléatoire entre 0 et 10
    var playerFrames = this.frames[this.currP];
    var frame = playerFrames[this.currF];

    if (!frame) {
      frame = [];
      playerFrames[this.currF] = frame;
    }

    frame.push(pins);
    if (pins === 10 || frame.length === 2) { // Strike ou fin de frame
      this.currF++;
      this.nextPlayer();
    } else if (this.currF === 9 && frame.length === 3) { // Gestion incorrecte de la dernière frame
      this.nextPlayer();
    }

    this.calc(); // Fonction mal nommée
  }

  calc() { // Fonction mal nommée
    for (var i = 0; i < this.players.length; i++) {
      this.totals[i] = 0; // Réinitialiser à chaque itération
      var f = this.frames[i];
      for (var j = 0; j < 10; j++) {
        if (f[j] && f[j][0] === 10) { // Strike
          this.totals[i] += 10 + (f[j + 1] ? f[j + 1][0] || 0 : 0) + (f[j + 1] && f[j + 1][1] ? f[j + 1][1] || (f[j + 2] ? f[j + 2][0] || 0 : 0) : 0);
        } else if (f[j] && f[j][0] + f[j][1] === 10) { // Spare
          this.totals[i] += 10 + (f[j + 1] ? f[j + 1][0] || 0 : 0);
        } else if (f[j]) {
          this.totals[i] += (f[j][0] || 0) + (f[j][1] || 0);
        }
      }
    }
    console.log('Scores calculated:', this.totals);
  }

  nextPlayer() { // Fonction mal nommée
    this.currP++;
    if (this.currP >= this.players.length) {
      this.currP = 0;
      this.currF++;
      if (this.currF >= 10) {
        this.done = true;
      }
    }
    console.log('Next player:', this.currP);
  }

  restart() {
    this.constructor(); // Mauvaise pratique : appeler directement le constructeur
  }
}