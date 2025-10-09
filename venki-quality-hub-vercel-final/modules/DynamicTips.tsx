import React, { useState } from 'react';
import { generateTip } from '../services/geminiService';
import { ICONS, TEXT_INPUT_STYLE } from '../constants';

const DynamicTips: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [tip, setTip] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerateTip = async () => {
        if (!topic.trim()) {
            setError('Por favor, ingresa un tema.');
            return;
        }
        setIsLoading(true);
        setError('');
        setTip('');
        try {
            const generatedTip = await generateTip(topic);
            setTip(generatedTip);
        } catch (err) {
            setError('Error al generar el consejo. Por favor, intenta de nuevo.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const quickTopics = [
        "Implementar 5'S en el área de prensas",
        "Reducir desperdicio de tinta",
        "Mejorar el control estadístico de proceso (SPC)",
        "Técnicas de análisis de causa raíz"
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold venki-title-gradient">Consejos Dinámicos de Calidad</h2>
            </div>

            <div className="border-l-4 border-venki-cyan text-text-default p-4 no-print rounded-r-xl glass glass-noise">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="glass w-10 h-10 rounded-full flex items-center justify-center text-venki-cyan">
                          {ICONS.Question}
                        </div>
                    </div>
                    <div className="ml-4">
                        <p className="font-bold venki-subtitle">Guía Rápida</p>
                        <p className="text-sm mt-1 text-text-muted">
                            <strong>1. Haz una Pregunta:</strong> Escribe un tema o problema de calidad en el campo de texto.<br/>
                            <strong>2. Usa Sugerencias:</strong> Haz clic en los botones de temas rápidos para llenar el campo.<br/>
                            <strong>3. Genera Consejo:</strong> Presiona 'Generar Consejo' para recibir una recomendación de la IA.
                        </p>
                    </div>
                </div>
            </div>

            <div className="glass glass-noise p-8 text-center">
                 <div className="glass-specular"></div>
                 <div className="glass-glare"></div>
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full glass glass-strong">
                    {React.cloneElement(ICONS.FMEA, { className: 'w-8 h-8 text-venki-cyan' })}
                </div>
                <h2 className="text-xl font-bold venki-subtitle">Consultor de Calidad IA</h2>
                <p className="mt-2 text-text-muted">
                    Obtén consejos y mejores prácticas para optimizar tus procesos.
                </p>

                <div className="mt-6">
                     <p className="text-sm text-text-muted mb-2">Pregunta sobre un tema, por ejemplo:</p>
                     <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {quickTopics.map(t => (
                            <button 
                                key={t} 
                                onClick={() => setTopic(t)}
                                className="tab"
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Ej: Cómo reducir el tiempo de cambio de trabajo"
                            className={TEXT_INPUT_STYLE + ' rounded-r-none'}
                        />
                        <button
                            onClick={handleGenerateTip}
                            disabled={isLoading}
                            className="btn-primary rounded-l-none flex items-center justify-center"
                        >
                            {isLoading ? ICONS.Spinner : 'Generar Consejo'}
                        </button>
                    </div>
                </div>
            </div>

            {error && <p className="mt-4 text-center text-red-400 glass glass-danger p-3">{error}</p>}
            
            {tip && (
                 <div className="mt-6 p-6 glass glass-noise border-l-4 border-venki-cyan">
                    <h3 className="text-lg font-semibold text-text-strong venki-subtitle">Recomendación del Consultor IA:</h3>
                    <div className="mt-2 text-text-default whitespace-pre-wrap prose prose-invert max-w-none prose-p:text-text-default prose-strong:text-text-strong prose-headings:text-accent-cyan" dangerouslySetInnerHTML={{ __html: tip.replace(/\n/g, '<br />') }} />
                 </div>
            )}
        </div>
    );
};

export default DynamicTips;