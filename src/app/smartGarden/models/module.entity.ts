export class Module {
  id: number;
  courseId: number;
  title: string;
  description: string;
  video: string;
  transcription: string;
  images: string[];
  links: string[];
  constructor(module:{
    id: number,
    courseId: number,
    title: string,
    description: string,
    video: string,
    transcription?: string,
    images?: string[],
    links?: string[]}) {
    this.id = module.id;
    this.courseId = module.courseId;
    this.title = module.title;
    this.description = module.description
    this.video = module.video;
    this.transcription = module.transcription || '';
    this.images = module.images || [''];
    this.links = module.links || [''];

  }
}
