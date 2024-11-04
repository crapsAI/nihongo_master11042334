export type ContentType = 'lesson' | 'vocabulary' | 'grammar' | 'comprehensive';

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  content: any;
}