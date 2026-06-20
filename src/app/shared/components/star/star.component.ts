import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'pm-star',
  template: `
    <div class="crop" [style.width.px]="cropWidth" [title]="rating" (click)="onClick()">
      <div style="width: 75px">
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
      </div>
    </div>
  `,
  styles: [
    `
      .crop {
        overflow: hidden;
      }

      div {
        cursor: pointer;
      }
    `,
  ],
})
export class StarComponent implements OnChanges {
  @Input() rating = 0;
  cropWidth = 75;

  @Output() ratingClicked = new EventEmitter<string>();

  ngOnChanges(): void {
    this.cropWidth = (this.rating * 75) / 5;
  }

  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }
}
