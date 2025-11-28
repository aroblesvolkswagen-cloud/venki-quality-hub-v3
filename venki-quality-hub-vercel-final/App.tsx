import React, { Component, useEffect, useState } from 'react';
import { AlertTriangle, Bot, BookOpen, Wheat } from 'lucide-react';
import BrewForm from './components/BrewForm';
import HopsDatabaseTable from './components/HopsDatabaseTable';
import MaltSubstitutesTable from './components/MaltSubstitutesTable';
import RecipeDisplay from './components/RecipeDisplay';
import { generateRecipe } from './services/geminiService';
import { RecipeResponse, UserInput } from './types';

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean; message?: string }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary atrapó un error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
          <div className="p-6 rounded-2xl bg-slate-800 border border-red-400/40 max-w-xl text-center">
            <AlertTriangle className="text-red-400 mx-auto mb-3" size={48} />
            <h1 className="text-2xl font-bold mb-2">Algo salió mal</h1>
            <p className="text-slate-300">{this.state.message}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [showHops, setShowHops] = useState(false);
  const [showMalt, setShowMalt] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    const missing = !process?.env?.API_KEY;
    setApiKeyMissing(missing);
  }, []);

  const handleSubmit = async (input: UserInput) => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await generateRecipe(input);
      setRecipe(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo generar la receta';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <header className="py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-amber-300 uppercase tracking-[0.3em] text-xs">AI Brewing Lab</p>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                <Bot className="text-amber-400" /> Maestro Cervecero AI
              </h1>
              <p className="text-slate-400 mt-2">Diseña recetas de 55 L, eficiencia 75%, tres ollas y sustituciones The Swaen / Lallemand.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowHops(true)} className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-amber-500/40">
                <BookOpen size={18} className="text-amber-300" /> Enciclopedia de lúpulos
              </button>
              <button onClick={() => setShowMalt(true)} className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-amber-500/40">
                <Wheat size={18} className="text-amber-300" /> Sustituciones de malta
              </button>
            </div>
          </header>

          {apiKeyMissing && (
            <div className="mb-4 rounded-xl border border-red-400/40 bg-red-500/10 text-red-200 p-4">
              ⚠️ No se encontró API_KEY. Establece process.env.API_KEY para conectar con Gemini.
            </div>
          )}

          <BrewForm onSubmit={handleSubmit} loading={loading} />

          {error && (
            <div className="mt-4 rounded-xl border border-red-400/40 bg-red-500/10 text-red-200 p-4">
              {error}
            </div>
          )}

          <RecipeDisplay recipe={recipe} />
        </div>

        <HopsDatabaseTable isOpen={showHops} onClose={() => setShowHops(false)} />
        <MaltSubstitutesTable isOpen={showMalt} onClose={() => setShowMalt(false)} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
