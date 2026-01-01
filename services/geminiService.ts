
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY || '' });
  }

  // 重新初始化以确保使用最新的 API KEY（针对 Veo 所需的 Key 选择逻辑）
  private refreshClient() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateContent(prompt: string, contextAssets: any[] = []) {
    this.refreshClient();
    try {
      const parts: any[] = [{ text: prompt }];
      
      for (const asset of contextAssets) {
        if (asset.type === 'IMAGE' && asset.content.startsWith('data:')) {
          const [, base64Part] = asset.content.split(',');
          parts.push({
            inlineData: {
              data: base64Part,
              mimeType: 'image/png'
            }
          });
        } else if (asset.type === 'TEXT' || asset.type === 'CHARACTER' || asset.type === 'SCENE') {
          parts.push({ text: `[Context ${asset.type} - ${asset.title}]: ${asset.content}` });
        }
      }

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: { parts },
        config: {
          systemInstruction: "You are CineFlow AI. Help users create films by analyzing context (characters, scenes, images). Output creative ideas and scripts."
        }
      });

      return response.text;
    } catch (error) {
      console.error("Gemini Text Error:", error);
      throw error;
    }
  }

  async generateImage(prompt: string, referenceImage?: string) {
    this.refreshClient();
    try {
      const contents: any = { parts: [{ text: prompt }] };
      if (referenceImage && referenceImage.startsWith('data:')) {
        const [, base64Part] = referenceImage.split(',');
        contents.parts.unshift({
          inlineData: { data: base64Part, mimeType: 'image/png' }
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

  async generateVideo(prompt: string, imageUri?: string) {
    this.refreshClient();
    try {
      const config: any = {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      };

      const payload: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config
      };

      if (imageUri && imageUri.startsWith('data:')) {
        const [, base64Part] = imageUri.split(',');
        payload.image = {
          imageBytes: base64Part,
          mimeType: 'image/png'
        };
      }

      let operation = await this.ai.models.generateVideos(payload);

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await this.ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const finalUrl = `${downloadLink}&key=${process.env.API_KEY}`;
      return finalUrl;
    } catch (error) {
      console.error("Veo Video Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
