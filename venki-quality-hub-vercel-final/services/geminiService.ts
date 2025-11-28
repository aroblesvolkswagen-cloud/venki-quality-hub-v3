import { GoogleGenAI } from '@google/genai';
import { RecipeResponse, UserInput } from '../types';

const MODEL_NAME = 'gemini-1.5-pro';

const systemPrompt = `Eres un maestro cervecero profesional especializado en ingeniería de procesos para lotes caseros avanzados.
Reglas críticas:
- Equipo de 3 ollas, volumen final 55 L, eficiencia 75%.
- Fidelidad histórica: el campo "name" de cada ingrediente debe ser la referencia original (ej: Weyermann, Yakima Chief).
- El campo "substitution" debe ser siempre marca The Swaen para maltas y Lallemand para levaduras.
- Genera exactamente un arreglo JSON con 3 objetos: Receta Clásica, Receta Competitiva y Receta Experimental.
- No generes XML ni texto adicional fuera del JSON.
- Incluye mashSchedule, waterProfile, fermentationStrategy, expertSuggestions y las variaciones.
- maxOutputTokens generosos para evitar cortes.`;

function buildClient() {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
  if (!apiKey) {
    throw new Error('Falta API_KEY para Google Gemini');
  }
  return new GoogleGenAI({ apiKey });
}

export async function generateRecipe(userInput: UserInput): Promise<RecipeResponse> {
  const client = buildClient();
  const model = client.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: systemPrompt,
    generationConfig: {
      maxOutputTokens: 32768,
      temperature: 0.65,
    },
  });

  const userPrompt = `Solicito 3 variaciones de receta (Clásica, Competitiva, Experimental) para el estilo ${userInput.style}.
Perfil buscado: ${userInput.profile}.
Referencia sensorial: ${userInput.reference}.
Devuélvelo ÚNICAMENTE como JSON válido.`;

  const result = await model.generateContent(userPrompt);
  const text = result.response.text();
  try {
    const parsed = JSON.parse(text) as RecipeResponse;
    return parsed;
  } catch (error) {
    throw new Error('La respuesta de Gemini no es JSON válido: ' + (error as Error).message);
  }
}
