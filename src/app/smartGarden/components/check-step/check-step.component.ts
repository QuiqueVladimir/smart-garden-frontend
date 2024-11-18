import { Component, Input } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-check-step',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './check-step.component.html',
  styleUrl: './check-step.component.css'
})
export class CheckStepComponent {
  @Input() courseTitle!: string;
  @Input() courseDescription!: string;
  @Input() coursePrice!: number;
  @Input() moduleTitles!: string[];
}
