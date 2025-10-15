import { GoogleGenAI } from "@google/genai";
import { PantoneFormulaResult } from '../types';
import {
    createPantoneFormulaRequest,
    createQualityTipRequest,
    createGeminiClient,
} from './googleAiStudioSnippet';

/**
 * Instancia compartida del cliente de Gemini para evitar recreaciones.
 */
let cachedClient: GoogleGenAI | null = null;

class MissingGeminiApiKeyError extends Error {
    constructor() {
        super('Falta la clave de API de Gemini. Configura la variable VITE_GEMINI_API_KEY en tu entorno.');
        this.name = 'MissingGeminiApiKeyError';
    }
}

const FALLBACK_PANTONE_FORMULA: PantoneFormulaResult = {
    pantoneName: 'PANTONE 186 C',
    hex: '#C8102E',
    description: 'Mezcla de demostración generada sin conexión para mostrar el flujo de consulta de fórmulas Pantone.',
    components: [
        {
            name: 'PANTONE Rubine Red C',
            percentage: 72,
            hex: '#CE0058',
            role: 'Aporta el tono rojo vibrante predominante de la mezcla.',
        },
        {
            name: 'PANTONE Yellow 012 C',
            percentage: 18,
            hex: '#FFD700',
            role: 'Añade calidez y luminosidad para equilibrar el color final.',
        },
        {
            name: 'PANTONE Transparent White',
            percentage: 10,
            hex: '#F4F2F3',
            role: 'Suaviza la densidad logrando el acabado brillante de la guía.',
        },
    ],
};

const buildFallbackTip = (topic: string): string => {
    const normalizedTopic = topic?.trim() || 'optimización del proceso de impresión';

    return [
        `### Plan rápido de mejora para ${normalizedTopic}`,
        'Este es un ejemplo sin conexión para que puedas probar la aplicación aun sin una clave de Gemini.',
        '1. Define el objetivo específico y la métrica que quieres mejorar en las próximas dos semanas.',
        '2. Revisa los registros históricos e identifica las tres principales causas que afectan el objetivo.',
        '3. Diseña una prueba controlada para atacar la causa más frecuente e involucra al equipo operativo.',
        '4. Documenta los resultados, comparte el aprendizaje y programa la siguiente iteración.',
    ].join('\n\n');
};

const isMissingApiKeyError = (error: unknown): error is MissingGeminiApiKeyError => error instanceof MissingGeminiApiKeyError;

/**
 * Determina la clave de API buscando primero en el entorno de Vite y, si
 * estuviera disponible, en variables de entorno de Node. Las referencias a
 * `process` están protegidas para evitar errores en tiempo de ejecución en el
 * navegador.
 */
const resolveApiKey = (): string | undefined => {
    const importMetaEnv = typeof import.meta !== 'undefined'
        ? (import.meta as unknown as { env?: Record<string, string | undefined> }).env
        : undefined;

    const processEnv = typeof process !== 'undefined' ? process.env : undefined;

    const candidates = [
        importMetaEnv?.VITE_GEMINI_API_KEY,
        importMetaEnv?.GEMINI_API_KEY,
        importMetaEnv?.API_KEY,
        processEnv?.VITE_GEMINI_API_KEY,
        processEnv?.GEMINI_API_KEY,
        processEnv?.API_KEY,
    ];

    for (const candidate of candidates) {
        if (typeof candidate === 'string' && candidate.trim().length > 0) {
            return candidate.trim();
        }
    }

    return undefined;
};

const getClient = (): GoogleGenAI => {
    if (!cachedClient) {
        const apiKey = resolveApiKey();

        if (!apiKey) {
            throw new MissingGeminiApiKeyError();
        }

        cachedClient = createGeminiClient(apiKey);
    }

    return cachedClient;
};

type GenerateContentResponse = Awaited<ReturnType<GoogleGenAI['models']['generateContent']>>;

const ensureTextResponse = (response: GenerateContentResponse, errorMessage: string): string => {
    const text = response.text?.trim();

    if (!text) {
        throw new Error(errorMessage);
    }

    return text;
};

export async function getPantoneFormula(pantoneCode: string): Promise<PantoneFormulaResult> {
    console.log(`Getting Pantone formula for: "${pantoneCode}"`);
    try {
        const ai = getClient();
        const response = await ai.models.generateContent(
            createPantoneFormulaRequest(pantoneCode)
        );

        const jsonText = ensureTextResponse(
            response,
            'La respuesta del servicio Gemini no contiene datos de fórmula.'
        );

        const parsed = JSON.parse(jsonText) as PantoneFormulaResult;

        if (!parsed || typeof parsed.pantoneName !== 'string') {
            throw new Error('La respuesta del servicio Gemini no devolvió una fórmula válida.');
        }

        if (!Array.isArray(parsed.components)) {
            throw new Error('La fórmula devuelta por Gemini no contiene componentes válidos.');
        }

        for (const component of parsed.components) {
            if (
                !component ||
                typeof component.name !== 'string' ||
                typeof component.percentage !== 'number' ||
                typeof component.hex !== 'string' ||
                typeof component.role !== 'string'
            ) {
                throw new Error('Uno de los componentes de la fórmula está incompleto.');
            }
        }

        return parsed;
    } catch (error) {
        if (isMissingApiKeyError(error)) {
            console.warn('No se detectó clave de Gemini; usando la fórmula de demostración en modo sin conexión.');
            return {
                ...FALLBACK_PANTONE_FORMULA,
                pantoneName: pantoneCode?.trim() ? `${pantoneCode.toUpperCase()} (demo)` : FALLBACK_PANTONE_FORMULA.pantoneName,
            };
        }

        console.error("Error calling Gemini API for Pantone formula:", error);
        throw new Error("No se pudo obtener una respuesta del consultor Pantone. Verifica el código del color y vuelve a intentarlo.");
    }
}

export async function generateTip(topic: string): Promise<string> {
    console.log(`Getting quality tip for: "${topic}"`);
    try {
        const ai = getClient();
        const response = await ai.models.generateContent(
            createQualityTipRequest(topic)
        );

        return ensureTextResponse(
            response,
            'La respuesta del servicio Gemini no contiene un consejo válido.'
        );
    } catch (error) {
        if (isMissingApiKeyError(error)) {
            console.warn('No se detectó clave de Gemini; devolviendo un consejo de demostración en modo sin conexión.');
            return buildFallbackTip(topic);
        }

        console.error("Error calling Gemini API for a quality tip:", error);
        throw new Error("No se pudo obtener una respuesta del consultor de calidad. Por favor, intenta de nuevo.");
    }
}