export interface AiInfo {
  labels?: AiInfoLabel[];
  content?: string;
  voice?: string;
}

export interface AiInfoLabel {
  name: string;
  confidence: number;
}
