import {Component, Input, OnInit} from '@angular/core';
import {PublicationService} from "../../services/publication/publication.service";
import {Publication} from "../../models/publication-entity";
import {PublicationCardComponent} from "../publication-card/publication-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-publications-list',
  standalone: true,
  imports: [
    PublicationCardComponent,
    NgForOf
  ],
  templateUrl: './publications-list.component.html',
  styleUrl: './publications-list.component.css'
})
export class PublicationsListComponent implements OnInit{
  @Input() communityId!: number;
  publications: Publication[] = [];
  constructor(private publicationService: PublicationService) {}

  ngOnInit(): void {
    this.getPublications();
  }
  getPublications(): void {
    this.publicationService.getPublicationsByCommunityId(this.communityId).subscribe((data: Publication[]) => {
      this.publications = data;
    })
  }
}
