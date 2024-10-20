import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  itemPerPage = 5;
  scrollLength = 300;
  startIndex = 0;
  endIndex = this.cards.length * 0 + this.itemPerPage;
  totalDots = 1;
  activeDot = 0;
  cardWidth = 0;
  @ViewChild('containerElement') containerElement!: ElementRef;
  resizeObserver!: ResizeObserver;

  ngOnInit() {
    this.totalDots = Math.ceil(this.cards.length / this.itemPerPage);
  }

  ngAfterViewInit(): void {
    this.initializeResizeObserver();
  }

  initializeResizeObserver(): void {
    // Create a ResizeObserver to observe the container
    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          const containerWidth = entry.contentRect.width;
          console.log('Container width:', containerWidth);

          // Set itemPerPage based on window size (this will correspond to row-cols- classes)
          if (window.innerWidth >= 1400) { // XXL (row-cols-xxl-5)
            this.itemPerPage = 5;
          } else if (window.innerWidth >= 992) { // LG (row-cols-lg-3)
            this.itemPerPage = 3;
          } else if (window.innerWidth >= 768) { // MD (row-cols-md-2)
            this.itemPerPage = 2;
          } else { // XS (row-cols-1)
            this.itemPerPage = 1;
          }

          this.activeDot = this.cards.length / this.itemPerPage + 1

          // Calculate card width based on container width and items per page
          this.cardWidth = containerWidth / this.itemPerPage;
          console.log('Card width:', this.cardWidth);
        }
      }
    });

    // Observe the container element
    this.resizeObserver.observe(this.containerElement.nativeElement);
  }

  ngOnDestroy(): void {
    // Clean up observer when the component is destroyed
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  next() {
    if (this.startIndex < this.cards.length) {
      this.startIndex = this.endIndex;
      this.endIndex = this.endIndex + this.itemPerPage;

      if (this.endIndex < this.cards.length - 1) {
        this.activeDot += 1;
      }
      if (this.endIndex > this.cards.length) {
        this.endIndex = this.cards.length - 1;
        this.startIndex = this.cards.length - this.itemPerPage;
        this.activeDot += 1;
      }
    }
  }

  prev() {
    this.endIndex = this.startIndex;
    this.startIndex = this.endIndex - this.itemPerPage;

    if (this.startIndex < 0) {
      this.startIndex = 0;
      this.endIndex = this.itemPerPage;
    }
    if (this.startIndex >= 0) {
      this.activeDot -= 1;
    }
  }

  createRange(total: number): number[] {
    return Array.from({ length: total }, (v, i) => i);
  }
}
