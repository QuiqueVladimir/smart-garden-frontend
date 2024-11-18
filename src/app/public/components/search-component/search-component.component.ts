import { Component } from '@angular/core';
import {MatInput} from "@angular/material/input";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [
    MatInput,
    MatFormField,
    MatLabel,
    MatButton,
    MatIcon,
    FormsModule,
    MatIconButton
  ],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css'
})
export class SearchComponentComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  onSearch(): void{
    if(this.searchQuery.trim()){
      this.router.navigate(['/explore'], { queryParams: { search: this.searchQuery } });
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

}
