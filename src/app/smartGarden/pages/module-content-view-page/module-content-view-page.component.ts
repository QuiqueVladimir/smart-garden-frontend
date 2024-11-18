import { Component } from '@angular/core';
import { Module } from '../../models/module.entity';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../../services/module/module.service';

@Component({
  selector: 'app-module-content-view-page',
  standalone: true,
  imports: [],
  templateUrl: './module-content-view-page.component.html',
  styleUrl: './module-content-view-page.component.css'
})
export class ModuleContentViewPageComponent {
  module: Module = {} as Module;
  moduleId: number;

  constructor(private route: ActivatedRoute, private moduleService: ModuleService) {
    this.moduleId = this.route.snapshot.params['moduleId'];
  }

  ngOnInit(): void {
    this.moduleService.getModuleById(this.moduleId).subscribe((module: Module) => {
      this.module = module;
    });
  }
}

