export interface RecommendationResponse {
    data: Data;
}

export interface Data {
    recommendation: Recommendation;
}

export interface Recommendation {
    content: string;
}

export interface PredictionResponse {
    class:      string;
    confidence: number;
}
