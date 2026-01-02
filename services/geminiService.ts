
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

const tools: FunctionDeclaration[] = [
  {
    name: "create_character",
    description: "Create a new character asset card on the cinematic canvas.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "The name of the character." },
        description: { type: Type.STRING, description: "Detailed physical and personality description." }
      },
      required: ["name", "description"]
    }
  },
  {
    name: "create_scene",
    description: "Define a new scene or setting for the film.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "The name of the scene (e.g., 'Neo-Tokyo Rooftops')." },
        description: { type: Type.STRING, description: "Visual and atmospheric description of the setting." }
      },
      required: ["title", "description"]
    }
  },
  {
    name: "generate_image",
    description: "Generate a concept art image based on a prompt.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        prompt: { type: Type.STRING, description: "The visual prompt for the image generation." }
      },
      required: ["prompt"]
    }
  },
  {
    name: "generate_video",
    description: "Generate a short video clip/animation using the Veo model.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        prompt: { type: Type.STRING, description: "The motion and scene prompt for video generation." }
      },
      required: ["prompt"]
    }
  },
  {
    name: "add_script_note",
    description: "Add a text-based script note or dialogue snippet to the workspace.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Title of the note." },
        content: { type: Type.STRING, description: "The text content of the note." }
      },
      required: ["title", "content"]
    }
  }
];

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Fixed: Always use process.env.API_KEY directly for initialization
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private refreshClient() {
    // Fixed: Re-initialize with process.env.API_KEY directly to ensure the latest key is used
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateWithTools(prompt: string, contextAssets: any[] = []) {
    this.refreshClient();
    try {
      const parts: any[] = [{ text: prompt }];
      
      for (const asset of contextAssets) {
        parts.push({ text: `[Workspace Asset ${asset.type} - ${asset.title}]: ${asset.content}` });
      }

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: { parts },
        config: {
          tools: [{ functionDeclarations: tools }],
          systemInstruction: `You are CineFlow Studio Agent, a world-class AI film director and designer. 
          Your goal is to help the user build a film project on an infinite canvas.
          
          When the user asks to create something (a character, a scene, an image, etc.), use the corresponding tool.
          Do NOT just talk about creating it; trigger the tool.
          You can call multiple tools in one turn if needed (e.g., create a character AND generate their concept art).
          
          Analyze the current workspace context to ensure consistency in style and narrative.`
        }
      });

      return response;
    } catch (error) {
      console.error("Gemini Tool Error:", error);
      throw error;
    }
  }

  async generateImage(prompt: string) {
    this.refreshClient();
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
    });
    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return part ? `data:${part.inlineData.mimeType};base64,${part.inlineData.data}` : null;
  }

  async generateVideo(prompt: string) {
    this.refreshClient();
    let operation = await this.ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });
    while (!operation.done) {
      await new Promise(r => setTimeout(r, 5000));
      operation = await this.ai.operations.getVideosOperation({ operation: operation });
    }
    return `${operation.response?.generatedVideos?.[0]?.video?.uri}&key=${process.env.API_KEY}`;
  }
}

export const geminiService = new GeminiService();
