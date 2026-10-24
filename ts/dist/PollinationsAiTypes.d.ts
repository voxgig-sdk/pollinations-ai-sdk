export interface GenerateText {
    choices?: any[];
    created?: number;
    id?: string;
    max_tokens?: number;
    messages: any[];
    model?: string;
    object?: string;
    seed?: number;
    temperature?: number;
    usage?: Record<string, any>;
}
export interface GenerateTextCreateData {
    max_tokens?: number;
    messages: any[];
    model?: string;
    seed?: number;
    temperature?: number;
}
export interface ImageGeneration {
}
export interface ImageGenerationLoadMatch {
    prompt: string;
    enhance?: boolean;
    height?: number;
    model?: string;
    nologo?: boolean;
    seed?: number;
    width?: number;
}
