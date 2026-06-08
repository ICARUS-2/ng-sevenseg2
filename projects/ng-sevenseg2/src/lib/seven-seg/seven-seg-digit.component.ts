import {
  Component,
  Input,
  ViewChildren,
  ViewChild,
  QueryList,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

const SEGMENTS_FOR_DIGIT: readonly number[] = [
  0x3f, 0x06, 0x5b, 0x4f, 0x66, 0x6d, 0x7d, 0x07, 0x7f, 0x6f,
];

@Component({
  selector: '[sevenSegDigit]',
  standalone: false,
  templateUrl: './seven-seg-digit.component.html',
  styleUrls: ['./seven-seg-digit.component.css'],
})
export class SevenSegDigitComponent implements AfterViewInit, OnChanges {
  @ViewChildren('seg', { read: ElementRef }) segments!: QueryList<ElementRef>;
  @ViewChild('dot', { read: ElementRef }) point!: ElementRef;

  @Input() digit: number | null = null;
  @Input() showDecimal: boolean = false;

  readonly allSegments: number[] = [0, 1, 2, 3, 4, 5, 6];

  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.render();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.viewReady) {
      this.render();
    }
  }

  private render(): void {
    const segs =
      this.digit !== null && this.digit !== undefined
        ? SEGMENTS_FOR_DIGIT[this.digit]
        : 0; // all segments off when digit is null

    this.segments.forEach((item, idx) => {
      const el: Element = item.nativeElement;
      if ((segs >> idx) & 1) {
        el.setAttribute('segmentOn', '');
        el.removeAttribute('segmentOff');
      } else {
        el.setAttribute('segmentOff', '');
        el.removeAttribute('segmentOn');
      }
    });

    const dotEl: Element = this.point.nativeElement;
    if (this.showDecimal) {
      dotEl.setAttribute('segmentOn', '');
      dotEl.removeAttribute('segmentOff');
    } else {
      dotEl.setAttribute('segmentOff', '');
      dotEl.removeAttribute('segmentOn');
    }
  }
}