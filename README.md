# ng-sevenseg v0.1.1

Seven segment display built as an Angular module and component. SVG markup shamelessly borrowed from http://brandonlwhite.github.io/sevenSeg.js/, with rendering adapted from jQuery to Angular. Rebuilt for Angular 21+

MIT License, see included license file.

## Usage

`npm i ng-sevenseg`

In the module where you want to use seven-seg:
```
import { SevenSegModule } from 'ng-sevenseg';

@NgModule({
  imports: [
    SevenSegModule
  ]
MyModule { ... }
```

...and in your component template:
```
<seven-seg digits="3" decimalPlaces="1" value="2.1" color="blue"></seven-seg>
```

* Minimal configuration, no attributes are required to render a blank display. You can, of course, bind to values in the controller with brackets (`[value]="myValue"`)
* Without a value set, the display will render "off"; an empty string will be interpreted as "0"
* `digits` indicates the total number of digits displayed, including decimal places.
Ignoring this attribute will render the display as one digit.
* `decimalPlaces` indicates the fixed number of decimal places. Behavior is undefined
if this value is greater than the number of digits.
* `color` indicates the color of the display

