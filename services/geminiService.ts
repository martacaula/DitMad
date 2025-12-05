import { GoogleGenAI, Type } from "@google/genai";
import { ProductAnalysis } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const analyzeProductImage = async (base64Image: string): Promise<ProductAnalysis> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const prompt = `
    Analyze this food product image. Act as a strict Danish nutrition expert using the Nordic Nutrition Recommendations.
    
    Tasks:
    1. Identify the product name and brand.
    2. Provide a numeric health score (0-100) where 100 is healthiest.
    3. Identify 3-4 Positive nutritional aspects (e.g., High Protein, High Fibre, Low Salt). Rate them 1-5 (5 is best).
    4. Identify 2-3 Negative nutritional aspects (e.g., High Sugar, High Calorie, Additives). Rate them 1-5 (where 1 is very bad/unhealthy, 5 is neutral/ok). 
       Note for Negatives: A rating of 1 or 2 means it is a strong negative factor.
    5. Suggest 3 healthier alternatives available in Denmark.
    
    Output pure JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            brand: { type: Type.STRING },
            numericScore: { type: Type.NUMBER, description: "Health score from 0 to 100" },
            positives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING, description: "e.g. '9,8 g'" },
                  rating: { type: Type.NUMBER, description: "1-5 stars" },
                  comment: { type: Type.STRING, description: "Short comment like 'Excellent amount of protein'" }
                }
              }
            },
            negatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING },
                  rating: { type: Type.NUMBER, description: "1-5 stars" },
                  comment: { type: Type.STRING }
                }
              }
            },
            alternatives: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT,
                properties: {
                   name: { type: Type.STRING },
                   reason: { type: Type.STRING }
                }
              } 
            }
          },
          required: ['productName', 'brand', 'numericScore', 'positives', 'negatives', 'alternatives'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as ProductAnalysis;

  } catch (error) {
    console.error("Error analyzing product:", error);
    throw new Error("Failed to analyze product. Please try again.");
  }
};
