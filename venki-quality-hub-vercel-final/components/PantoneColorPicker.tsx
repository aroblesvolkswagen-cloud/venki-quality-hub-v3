import React, { useState, useMemo } from 'react';
import { Ink } from '../types';
import { TEXT_INPUT_STYLE, ICONS } from '../constants';

interface PantoneColorPickerProps {
    inks: Ink[];
    onSelectInk: (ink: Ink) => void;
    onClose: () => void;
}

const PantoneColorPicker: React.FC<PantoneColorPickerProps> = ({ inks, onSelectInk, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [justSelectedId, setJustSelectedId] = useState<string | null>(null);

    const filteredInks = useMemo(() => {
        if (!searchTerm.trim()) {
            return inks;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        return inks.filter(ink =>
            ink.name.toLowerCase().includes(lowercasedFilter) ||
            ink.id.toLowerCase().includes(lowercasedFilter)
        );
    }, [inks, searchTerm]);

    const handleSelect = (ink: Ink) => {
        onSelectInk(ink);
        setJustSelectedId(ink.id);
        setTimeout(() => {
            setJustSelectedId(null);
        }, 1000); // Confirmation visible for 1 second
    };

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Buscar por nombre o código Pantone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={TEXT_INPUT_STYLE}
            />
            <div className="max-h-80 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-2 glass rounded-lg">
                {filteredInks.map(ink => (
                    <button
                        key={ink.id}
                        onDoubleClick={() => handleSelect(ink)}
                        className="relative flex flex-col items-center p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-venki-cyan glass-button"
                        title={`Doble clic para añadir ${ink.name}`}
                    >
                        <div
                            className="w-full h-16 rounded-md border-2 border-white/30 shadow-inner"
                            style={{ backgroundColor: ink.hex || '#ccc' }}
                        ></div>
                        <div className="mt-2 text-center">
                            <p className="text-xs font-bold text-text-strong truncate">{ink.name}</p>
                            <p className="text-xs text-text-muted">{ink.id}</p>
                        </div>
                        {justSelectedId === ink.id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-green-500/80 rounded-lg animate-fade-in-down">
                                {React.cloneElement(ICONS.Check, { className: 'w-8 h-8 text-white' })}
                            </div>
                        )}
                    </button>
                ))}
                {filteredInks.length === 0 && (
                     <div className="col-span-full text-center py-8 text-text-muted">
                        No se encontraron tintas que coincidan con la búsqueda.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PantoneColorPicker;