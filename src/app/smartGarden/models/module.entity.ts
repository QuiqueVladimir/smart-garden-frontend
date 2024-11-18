export class Module {
  id: number;
  courseId: number;
  title: string;
  description: string;
  video: string;
  transcription: string;
  order: number;
  constructor(module:{
    id: number,
    courseId: number,
    title: string,
    description: string,
    video: string,
    transcription?: string,
    order: number}) {
    this.id = module.id;
    this.courseId = module.courseId;
    this.title = module.title;
    this.description = module.description
    this.video = module.video;
    this.transcription = module.transcription || '';
    this.order = module.order;
  }
}
