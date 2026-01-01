
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY || '' });
  }

  async generateContent(prompt: string, contextAssets: any[] = []) {
    try {
      const parts: any[] = [{ text: prompt }];
      
      // Process context assets (images)
      for (const asset of contextAssets) {
        if (asset.type === 'IMAGE' && asset.content.startsWith('data:')) {
          const [mimePart, base64Part] = asset.content.split(',');
          const mimeType = mimePart.match(/:(.*?);/)?.[1] || 'image/png';
          parts.push({
            inlineData: {
              data: base64Part,
              mimeType: mimeType
            }
          });
        }
      }

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
          systemInstruction: "You are CineFlow AI, a world-class film production assistant. You help users manage assets (characters, scenes, images, videos) and write scripts. Be concise, creative, and professional."
        }
      });

      return response.text;
    } catch (error) {
      console.error("Gemini Text Error:", error);
      throw error;
    }
  }

  async generateImage(prompt: string, referenceImage?: string) {
    try {
      const contents: any = { parts: [{ text: prompt }] };
      
      if (referenceImage && referenceImage.startsWith('data:')) {
        const [mimePart, base64Part] = referenceImage.split(',');
        const mimeType = mimePart.match(/:(.*?);/)?.[1] || 'image/png';
        contents.parts.unshift({
          inlineData: {
            data: base64Part,
            mimeType: mimeType
          }
        });
      }

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: contents,
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error) {
      console.error("Gemini Image Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
