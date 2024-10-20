import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  itemPerPage = 5
  scrollLength = 300
  startIndex = 0;
  endIndex = this.cards.length * 0 + this.itemPerPage
  totalDots = 1
  activeDot = 0

  ngOnInit() {
    this.totalDots = this.cards.length / this.itemPerPage + 1
  }
  next() {
    if (this.startIndex < this.cards.length) {
      this.startIndex = this.endIndex;
      this.endIndex = this.endIndex + this.itemPerPage;

      if (this.endIndex < this.cards.length - 1) {
        this.activeDot += 1
        console.log(this.activeDot, '30');


      }
      if (this.endIndex > this.cards.length) {
        this.endIndex = this.cards.length - 1
        this.startIndex = this.cards.length - this.itemPerPage
        this.activeDot += 1
      }
    }
  }

  prev() {
    this.endIndex = this.startIndex;
    this.startIndex = this.endIndex - this.itemPerPage;

    if (this.startIndex < 0) {
      this.startIndex = 0;
      this.endIndex = this.itemPerPage
    }
    if (this.startIndex >= 0) {
      this.activeDot -= 1
    }
  }

  createRange(total: number): number[] {
    return Array.from({ length: total }, (v, i) => i);
  }
}
