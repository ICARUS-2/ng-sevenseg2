import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SevenSegDigitComponent } from './seven-seg-digit.component';

interface DigitState {
  value: number | null;
  showDecimal: boolean;
}

@Component({
  selector: 'seven-seg',
  standalone: false,
  templateUrl: './seven-seg.component.html',
  styleUrls: ['./seven-seg.component.css'],
})
export class SevenSegComponent implements OnInit, OnChanges {
  @Input() value: number | null = null;
  @Input() digits: number = 1;
  @Input() decimalPlaces: number = 0;
  @Input() color: string = "blue";

  digitStates: DigitState[] = [];

  ngOnInit(): void {
    this.computeDigitStates();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.computeDigitStates();
  }

  get viewBox(): string {
    return `0 0 ${this.digits * 57} 80`;
  }

  groupTransform(i: number): string {
    return `translate(${i * 57} 0)`;
  }

  private computeDigitStates(): void {
    if (this.value === null || this.value === undefined) {
      this.digitStates = Array.from({ length: this.digits }, () => ({
        value: null,
        showDecimal: false,
      }));
      return;
    }

    const decimalFactor = Math.pow(10, this.decimalPlaces);
    const rounded = Math.round(this.value * decimalFactor) / decimalFactor;
    let intValue = Math.round(rounded * decimalFactor);

    const decimalIdx =
      this.decimalPlaces > 0 ? this.digits - this.decimalPlaces - 1 : -1;

    const states: DigitState[] = [];
    let leadingZero = true;

    for (let i = 0; i < this.digits; i++) {
      const divisor = Math.pow(10, this.digits - i - 1);
      const curDigitRaw = intValue / divisor;
      intValue = intValue % divisor;

      const curDigit =
        i === this.digits - 1
          ? Math.round(curDigitRaw)
          : Math.floor(curDigitRaw);

      if (curDigit > 0) leadingZero = false;

      const isLeadingZero = leadingZero && i < this.digits - 1;
      states.push({
        value: isLeadingZero ? null : curDigit,
        showDecimal: i === decimalIdx,
      });
    }

    this.digitStates = states;
  }
}