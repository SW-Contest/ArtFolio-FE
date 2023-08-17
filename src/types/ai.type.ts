export interface AIInfo {
  labels?: AIInfoLabel[];
  content?: string;
  voice?: string;
}

export interface AIInfoLabel {
  name: string;
  confidence: number;
}
