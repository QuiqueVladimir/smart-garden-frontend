import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Module} from "../../models/module.entity";
import {CourseService} from "../../services/course/course.service";
import {MatCard, MatCardContent, MatCardImage, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-module-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatButton,
    MatCardContent,
    NgForOf,
    MatCardImage
  ],
  templateUrl: './module-detail.component.html',
  styleUrl: './module-detail.component.css'
})
export class ModuleDetailComponent implements OnInit{
module!: Module;
courseId!:number;
moduleId!:number;
safeVideoUrl!: SafeResourceUrl;
modules: Module[] = [];

constructor(private courseService: CourseService, private route: ActivatedRoute, private router:Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get('courseId')!;
      this.moduleId = +params.get('moduleId')!;
      this.loadModule();
      this.loadModules();
    });
  };

  loadModule(): void {
    this.courseService.getModuleById(this.moduleId).subscribe((module: Module) => {
      this.module = module;
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.module.video);
    });
  }

  loadModules(): void {
    this.courseService.getModulesByCurseId(this.courseId).subscribe((modules: Module[]) => {
      this.modules = modules;
    });
  }

  goBackToCourse():void{
  this.router.navigate(['/course', this.courseId])
  }

  previousModule(): void {
    const currentIndex = this.modules.findIndex(m => m.id === this.moduleId);
    if (currentIndex > 0) {
      const previousModuleId = this.modules[currentIndex - 1].id;
      this.router.navigate(['/courses', this.courseId, 'modules', previousModuleId]);
    }
  }
  nextModule(): void {
    const currentIndex = this.modules.findIndex(m => m.id === this.moduleId);
    if (currentIndex < this.modules.length - 1) {
      const nextModuleId = this.modules[currentIndex + 1].id;
      this.router.navigate(['/courses', this.courseId, 'modules', nextModuleId]);
    }
  }

}

