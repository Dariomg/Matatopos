import { Component } from '@angular/core';

@Component({
  selector: 'app-matatopos',
  imports: [],
  templateUrl: './matatopos.html',
  styleUrls: ['./matatopos.css'] 
})
export class Matatopos {
  gridSize = 9;
  activeIndex: number = -1;
  score: number = 0;

  ngOnInit(): void {
    this.spawnTopo();
  }

  spawnTopo(): void {
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * this.gridSize);
    } while (newIndex === this.activeIndex);
    this.activeIndex = newIndex;
  }

  hitTopo(index: number): void {
    if (index === this.activeIndex) {
      this.score++;
      this.spawnTopo();
    } else {
      this.score = 0;       
      this.activeIndex = -1; 
      this.spawnTopo();
    }
  }
}