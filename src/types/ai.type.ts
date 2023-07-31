export interface AiInfo {
  labels?: AiInfoLabel[];
  content?: string;
}

export interface AiInfoLabel {
  name: string;
  confidence: number;
}
