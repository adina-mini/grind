export type SearchResultType = 'skill' | 'project' | 'challenge' | 'checkpoint' | 'track';

export interface SearchItem {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  tags?: string[];
  trackName?: string;
  difficulty?: string;
  targetView: string; // 'roadmap' | 'projects' | 'challenges' | 'timeline'
  targetId: string;
}
