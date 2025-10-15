import { GoogleGenAI, Type, type GenerateContentParameters } from "@google/genai";

/**
 * Archivo autocontenido listo para copiar y pegar en Google AI Studio o en un
 * entorno Node. Expone las mismas configuraciones de prompts que usa la
 * aplicación para solicitar fórmulas Pantone y consejos de calidad.
 */

/** Mensaje de sistema que mantiene la salida de la fórmula en JSON estricto. */
export const pantoneFormulaSystemInstruction = `You are a world-class expert in Pantone color mixing for the industrial printing industry. Your knowledge covers the entire global Pantone Solid Coated Formula Guide. Your task is to provide the exact mixing formula for a given Pantone Solid Coated color code. You must respond ONLY with the JSON object matching the provided schema. Do not add any extra text or explanations. If the color code is invalid or not found, return an error in the description field and an empty components array.`;

/** Mensaje de sistema para el consultor de calidad en español. */
export const qualityTipSystemInstruction = `You are an expert quality management consultant for the industrial printing and manufacturing industry. Your advice is clear, concise, and focused on tangible improvements. Respond in Spanish. Structure your response with a title, a short introduction, and then a list of actionable steps or bullet points.`;

/**
 * Tipado del mensaje de usuario aceptado por Google AI Studio.
 * `GenerateContentParameters['contents']` es una lista de turnos de chat.
 */
type UserContent = GenerateContentParameters["contents"];

/**
 * Construye la estructura de mensaje de usuario requerida por el SDK.
 */
export const toUserMessage = (prompt: string): UserContent => [
    {
        role: "user",
        parts: [{ text: prompt }],
    },
];

/**
 * Esquema de salida que limita la respuesta de Gemini a un JSON predecible.
 */
export const pantoneFormulaSchema = {
    type: Type.OBJECT,
    properties: {
        pantoneName: { type: Type.STRING, description: 'Official Pantone code and name, e.g., "PANTONE 185 C"' },
        hex: { type: Type.STRING, description: 'Approximate HEX color code, e.g., "#C8102E"' },
        description: { type: Type.STRING, description: 'A brief description of the color, e.g., "A vibrant, classic red."' },
        components: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: 'Official name of the base ink component, e.g., "PANTONE Yellow 012 C"' },
                    percentage: { type: Type.NUMBER, description: 'The percentage of this component in the mix.' },
                    hex: { type: Type.STRING, description: 'Approximate HEX color code of the base ink.' },
                    role: { type: Type.STRING, description: 'The function of this ink in the mix, e.g., "Provides the main red hue."' },
                },
                required: ["name", "percentage", "hex", "role"],
            },
        },
    },
    required: ["pantoneName", "hex", "description", "components"],
} as const;

/**
 * Construye la solicitud completa que se puede enviar desde Google AI Studio.
 */
export const createPantoneFormulaRequest = (pantoneCode: string): GenerateContentParameters => ({
    model: "gemini-2.5-flash",
    contents: toUserMessage(
        `Provide the mixing formula for the Pantone Solid Coated color: ${pantoneCode}. ` +
        "Follow the supplied JSON schema exactly. If the color code is invalid, explain the problem in the description and return an empty components array."
    ),
    config: {
        systemInstruction: pantoneFormulaSystemInstruction,
        responseMimeType: "application/json",
        responseSchema: pantoneFormulaSchema,
    },
});

/**
 * Construye la solicitud para obtener un consejo de calidad.
 */
export const createQualityTipRequest = (topic: string): GenerateContentParameters => ({
    model: "gemini-2.5-flash",
    contents: toUserMessage(
        `Provide a detailed, practical, and actionable quality improvement tip for the following topic in the printing/manufacturing industry: "${topic}".`
    ),
    config: {
        systemInstruction: qualityTipSystemInstruction,
    },
});

/**
 * Fabrica clientes individuales de Gemini.
 */
export const createGeminiClient = (apiKey: string) => new GoogleGenAI({ apiKey });

/**
 * Ejecuta la consulta de fórmula Pantone y devuelve el texto JSON sin procesar.
 */
export const fetchPantoneFormulaRaw = async (apiKey: string, pantoneCode: string): Promise<string | undefined> => {
    const client = createGeminiClient(apiKey);
    const response = await client.models.generateContent(createPantoneFormulaRequest(pantoneCode));
    return response.text;
};

/**
 * Ejecuta la consulta de consejo de calidad y devuelve el texto generado.
 */
export const fetchQualityTipRaw = async (apiKey: string, topic: string): Promise<string | undefined> => {
    const client = createGeminiClient(apiKey);
    const response = await client.models.generateContent(createQualityTipRequest(topic));
    return response.text;
};
