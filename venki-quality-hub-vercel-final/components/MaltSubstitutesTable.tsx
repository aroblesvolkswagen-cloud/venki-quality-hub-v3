import React from 'react';
import { X, Wheat } from 'lucide-react';

type MaltRow = {
  generic: string;
  theSwaen: string;
  weyermann: string;
  castle: string;
  sensory: string;
  usage: string;
};

const MALT_ROWS: MaltRow[] = [
  {
    generic: 'Pale Ale',
    theSwaen: 'The Swaen Pale Ale',
    weyermann: 'Weyermann Pale Ale',
    castle: 'Castle Pale',
    sensory: 'Galleta ligera, miel suave, base limpia.',
    usage: 'Base para ales e IPA modernas.',
  },
  {
    generic: 'Pilsner',
    theSwaen: 'The Swaen Pilsner',
    weyermann: 'Weyermann Pilsner',
    castle: 'Castle Pilsen',
    sensory: 'Malta pálida, crujiente, notas a cracker.',
    usage: 'Lagers, pils checas y cervezas claras.',
  },
  {
    generic: 'Vienna',
    theSwaen: 'The Swaen Vienna',
    weyermann: 'Weyermann Vienna',
    castle: 'Castle Vienna',
    sensory: 'Tostado ligero, pan dulce, color ámbar.',
    usage: 'Vienna lager, märzen y ámbar belgas.',
  },
  {
    generic: 'Munich Light',
    theSwaen: 'The Swaen Munich Light',
    weyermann: 'Weyermann Munich I',
    castle: 'Castle Munich Light',
    sensory: 'Pan horneado, corteza, miel tostada.',
    usage: 'Bases ámbar, refuerzo de cuerpo y color.',
  },
  {
    generic: 'Munich Dark',
    theSwaen: 'The Swaen Munich Dark',
    weyermann: 'Weyermann Munich II',
    castle: 'Castle Munich Dark',
    sensory: 'Pan negro, toffee profundo, corteza caramelizada.',
    usage: 'Doppelbock, dunkel y brown ales robustas.',
  },
  {
    generic: 'Caramel/Crystal 20L',
    theSwaen: 'The Swaen GoldSwaen Light',
    weyermann: 'Weyermann Carahell',
    castle: 'Castle Cara Blond',
    sensory: 'Caramelo suave, miel, aumento de espuma.',
    usage: 'Aumenta cuerpo en ales claras y lagers doradas.',
  },
  {
    generic: 'Caramel/Crystal 60L',
    theSwaen: 'The Swaen GoldSwaen Amber',
    weyermann: 'Weyermann Carared',
    castle: 'Castle Cara Ruby',
    sensory: 'Caramelo rojo, toffee, color rojo intenso.',
    usage: 'Irish red, amber ale y red IPA.',
  },
  {
    generic: 'Caramel/Crystal 120L',
    theSwaen: 'The Swaen GoldSwaen Brown',
    weyermann: 'Weyermann Caraaroma',
    castle: 'Castle Cara Malt Special B',
    sensory: 'Pasas, ciruela, toffee oscuro.',
    usage: 'Dubbel, porter dulce y dark mild.',
  },
  {
    generic: 'Chocolate',
    theSwaen: 'The Swaen Chocolate',
    weyermann: 'Weyermann Chocolate Wheat',
    castle: 'Castle Chocolate',
    sensory: 'Cacao, corteza tostada, color marrón profundo.',
    usage: 'Porter, stout, brown ale y schwarzbier.',
  },
  {
    generic: 'Roasted Barley',
    theSwaen: 'The Swaen Black Barley',
    weyermann: 'Weyermann Roasted Barley',
    castle: 'Castle Roasted Barley',
    sensory: 'Café espresso, ceniza ligera, seco.',
    usage: 'Seca stout, Irish stout y robust porter.',
  },
  {
    generic: 'Wheat Malt',
    theSwaen: 'The Swaen Wheat Malt',
    weyermann: 'Weyermann Wheat',
    castle: 'Castle Wheat Blanc',
    sensory: 'Pan blanco, cremosidad, espuma estable.',
    usage: 'Weissbier, Witbier, NEIPA como proteína.',
  },
  {
    generic: 'Oat Malt/Flaked Oats',
    theSwaen: 'The Swaen Oat Malt',
    weyermann: 'Weyermann Oat Malt',
    castle: 'Castle Oat Flakes',
    sensory: 'Avena cremosa, sensación sedosa.',
    usage: 'NEIPA, stout cremosa, cuerpo y turbidez.',
  },
  {
    generic: 'Rye Malt',
    theSwaen: 'The Swaen Rye Malt',
    weyermann: 'Weyermann Rye',
    castle: 'Castle Rye',
    sensory: 'Picante, pan de centeno, sequedad final.',
    usage: 'Rye IPA, roggenbier y saison especiada.',
  },
  {
    generic: 'Acidulated',
    theSwaen: 'The Swaen Sour Malt',
    weyermann: 'Weyermann Acidulated Malt',
    castle: 'Castle Acid',
    sensory: 'Ajuste de pH, toque láctico limpio.',
    usage: 'Corrección de mash para lagers claras y hazy IPA.',
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MaltSubstitutesTable: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Wheat className="text-amber-300" />
            <div>
              <p className="text-xs uppercase text-amber-300 tracking-widest">Sustituciones de malta</p>
              <h3 className="text-xl font-semibold text-white">The Swaen vs Weyermann vs Castle</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200" aria-label="Cerrar tabla">
            <X />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800/60">
              <tr className="text-left">
                <th className="px-3 py-2">Genérico</th>
                <th className="px-3 py-2">The Swaen</th>
                <th className="px-3 py-2">Weyermann</th>
                <th className="px-3 py-2">Castle Malting</th>
                <th className="px-3 py-2">Descripción sensorial</th>
                <th className="px-3 py-2">Uso sugerido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {MALT_ROWS.map(row => (
                <tr key={row.generic} className="hover:bg-slate-800/30">
                  <td className="px-3 py-2 font-semibold text-white">{row.generic}</td>
                  <td className="px-3 py-2 text-amber-200">{row.theSwaen}</td>
                  <td className="px-3 py-2 text-slate-200">{row.weyermann}</td>
                  <td className="px-3 py-2 text-slate-200">{row.castle}</td>
                  <td className="px-3 py-2 text-slate-300">{row.sensory}</td>
                  <td className="px-3 py-2 text-slate-300">{row.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaltSubstitutesTable;
