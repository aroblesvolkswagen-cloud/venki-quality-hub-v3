import React, { useMemo } from 'react';
import { X, Leaf } from 'lucide-react';

interface HopRow {
  region: string;
  variety: string;
  aa: string;
  aroma: string;
  engineering: string;
  pairings: string[];
}

const regionConfigs: {
  region: string;
  aa: string;
  aroma: string;
  engineering: string;
  pairings: string[];
  varieties: string[];
}[] = [
  {
    region: 'USA (Yakima)',
    aa: '7-18%+',
    aroma: 'Cítrico, resinoso, dank y tropical en alto impacto',
    engineering: 'FWH aporta estructura resinosa; en whirlpool libera mango y pomelo; en dry hop maximiza aceites de mirceno y tioles.',
    pairings: ['Citra + Mosaic', 'Simcoe + Columbus', 'El Dorado + Amarillo', 'Chinook + Centennial'],
    varieties: [
      'Cascade',
      'Centennial',
      'Chinook',
      'Citra',
      'Mosaic',
      'Simcoe',
      'Amarillo',
      'Columbus/CTZ',
      'Warrior',
      'Idaho 7',
      'Strata',
      'El Dorado',
      'Sabro',
      'Talus',
      'Ekuanot',
      'Ahtanum',
      'Azacca',
      'Bravo',
      'Cashmere',
      'Comet',
      'Crystal',
      'HBC 586',
      'Vista',
      'Loral',
      'Sultana',
      'Triumph',
    ],
  },
  {
    region: 'Nueva Zelanda',
    aa: '6-14%',
    aroma: 'Vinoso, sauvignon blanc, lima y fruta de hueso',
    engineering: 'Ideal en whirlpool para preservar tioles; dry hop tardío potencia uva y maracuyá.',
    pairings: ['Nelson Sauvin + Motueka', 'Riwaka + Nectaron', 'Wakatu + Pacific Jade', 'Rakau + Taiheke'],
    varieties: [
      'Nelson Sauvin',
      'Motueka',
      'Riwaka',
      'Waimea',
      'Wakatu',
      'Pacific Jade',
      'Kohatu',
      'Rakau',
      'Taiheke',
      'Nectaron',
      'Hort 4337',
    ],
  },
  {
    region: 'Australia',
    aa: '10-18%',
    aroma: 'Fruta tropical madura, resina dulce y pino',
    engineering: 'Whirlpool para piña y maracuyá; dry hop produce explosión de frutas de carozo.',
    pairings: ['Galaxy + Vic Secret', 'Eclipse + Ella', 'Enigma + Topaz', 'Pride of Ringwood + Galaxy'],
    varieties: ['Galaxy', 'Vic Secret', 'Eclipse', 'Ella', 'Enigma', 'Topaz', 'Pride of Ringwood', 'Summer', 'Melba'],
  },
  {
    region: 'Alemania',
    aa: '3-14%',
    aroma: 'Floral, especiado elegante, miel ligera y cítrico suave',
    engineering: 'FWH aporta suavidad amarga; whirlpool resalta especias; dry hop sutil para pils y lagers.',
    pairings: ['Hallertau Mittelfrüh + Tettnang', 'Spalt Select + Saphir', 'Mandarina Bavaria + Huell Melon', 'Perle + Tradition'],
    varieties: [
      'Hallertau Mittelfrüh',
      'Tettnang',
      'Spalt Select',
      'Saphir',
      'Tradition',
      'Perle',
      'Hersbrucker',
      'Mandarina Bavaria',
      'Huell Melon',
      'Polaris',
      'Callista',
      'Ariana',
      'Opal',
    ],
  },
  {
    region: 'República Checa',
    aa: '3-10%',
    aroma: 'Herbal noble, especiado y limpio',
    engineering: 'FWH para amargor redondo; whirlpool corto mantiene notas a hierba fresca.',
    pairings: ['Saaz + Kazbek', 'Premiant + Saaz', 'Sladek + Agnus', 'Saaz + Harmonie'],
    varieties: ['Saaz', 'Kazbek', 'Premiant', 'Sladek', 'Agnus', 'Harmonie'],
  },
  {
    region: 'Reino Unido',
    aa: '4-13%',
    aroma: 'Terroso, té negro, frutos de carozo y mermelada',
    engineering: 'Excelente para FWH en bitters; en whirlpool da mermelada de naranja; dry hop para ales tradicionales.',
    pairings: ['Fuggles + East Kent Goldings', 'Target + Challenger', 'Bramling Cross + First Gold', 'Jester + Olicana'],
    varieties: ['Fuggles', 'East Kent Goldings', 'Challenger', 'Target', 'First Gold', 'Bramling Cross', 'Jester', 'Olicana', 'Admiral'],
  },
  {
    region: 'Argentina (Patagonia - El Lupular)',
    aa: '6-13%',
    aroma: 'Resina limpia, floral frío, piel de naranja',
    engineering: 'Whirlpool destaca pino y cítrico; dry hop para IPA patagónica fresca.',
    pairings: ['Mapuche + Victoria', 'Nahuel + Traful', 'Nugget Patagonia + Cascade Patagonia', 'Victoria + Spalter Select Patagonia'],
    varieties: ['Mapuche', 'Victoria', 'Traful', 'Nahuel', 'Nugget Patagonia', 'Cascade Patagonia', 'Bullion Patagonia'],
  },
  {
    region: 'Sudáfrica',
    aa: '12-18%',
    aroma: 'Guayaba, grosella, mermelada tropical',
    engineering: 'Whirlpool tibio para fruta roja; dry hop tardío maximiza aceites de pasión.',
    pairings: ['Southern Passion + African Queen', 'Southern Tropic + Southern Star', 'Outeniqua + Southern Aroma', 'African Queen + Citra'],
    varieties: ['Southern Passion', 'African Queen', 'Southern Tropic', 'Southern Star', 'Outeniqua', 'Southern Aroma'],
  },
  {
    region: 'Eslovenia',
    aa: '3-12%',
    aroma: 'Floral suave, miel ligera y té verde',
    engineering: 'Ideal en lagers aromáticas; FWH redondea amargor; dry hop discreto.',
    pairings: ['Styrian Golding + Celeia', 'Dana + Aurora', 'Bobek + Celeia', 'Savinjski Golding + Styrian Golding'],
    varieties: ['Styrian Golding', 'Celeia', 'Dana', 'Aurora', 'Bobek', 'Savinjski Golding'],
  },
  {
    region: 'Francia',
    aa: '4-15%',
    aroma: 'Fruta roja elegante, mandarina y especias suaves',
    engineering: 'Whirlpool para mandarina; dry hop agrega frambuesa y vino blanco.',
    pairings: ['Strisselspalt + Mistral', 'Barbe Rouge + Aramis', 'Triskel + Barbe Rouge', 'Bouclier + Mistral'],
    varieties: ['Strisselspalt', 'Mistral', 'Barbe Rouge', 'Aramis', 'Triskel', 'Bouclier'],
  },
  {
    region: 'Polonia',
    aa: '6-13%',
    aroma: 'Herbal, cítrico suave y especias balsámicas',
    engineering: 'FWH aporta amargor limpio; whirlpool genera cáscara de limón; dry hop ligero.',
    pairings: ['Lubelski + Marynka', 'Sybilla + Junga', 'Oktawia + Puławski', 'Marynka + Junga'],
    varieties: ['Lubelski', 'Marynka', 'Sybilla', 'Oktawia', 'Puławski', 'Junga'],
  },
  {
    region: 'España',
    aa: '7-14%',
    aroma: 'Cítrico mediterráneo, tomillo y resina suave',
    engineering: 'Excelentes en whirlpool para pale ales ligeras; FWH da amargor noble.',
    pairings: ['Negral + Nugget España', 'Columbus España + Perle España', 'Admiral España + Negral', 'Nugget España + Columbus España'],
    varieties: ['Negral', 'Nugget España', 'Columbus España', 'Perle España', 'Admiral España'],
  },
  {
    region: 'China',
    aa: '6-12%',
    aroma: 'Floral dulce, fruta de carozo y té oolong',
    engineering: 'Whirlpool tibio para chabacano; dry hop ligero mantiene perfil limpio.',
    pairings: ['Qingdao Flower + Zhouqin', 'Xinjiang No.1 + Qingdao Flower', 'Kirin China + Zhouqin', 'Xinjiang No.1 + Columbus'],
    varieties: ['Qingdao Flower', 'Zhouqin', 'Xinjiang No.1', 'Kirin China', 'Yunnan Sun'],
  },
  {
    region: 'Rusia',
    aa: '5-12%',
    aroma: 'Pino frío, especia seca y té negro',
    engineering: 'FWH redondea amargor en baltic porter; whirlpool corto para notas de bosque.',
    pairings: ['Sapsan + Voskhod', 'Triumph Rusia + Ladoga', 'Northern Brewer Rusia + Sapsan', 'Voskhod + Ladoga'],
    varieties: ['Sapsan', 'Voskhod', 'Triumph Rusia', 'Northern Brewer Rusia', 'Ladoga'],
  },
];

export const HOP_DATA: HopRow[] = regionConfigs.flatMap(config =>
  config.varieties.map(variety => ({
    region: config.region,
    variety,
    aa: config.aa,
    aroma: `${config.aroma} (${variety})`,
    engineering: config.engineering,
    pairings: config.pairings,
  }))
);

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const HopsDatabaseTable: React.FC<Props> = ({ isOpen, onClose }) => {
  const grouped = useMemo(() => {
    return HOP_DATA.reduce<Record<string, HopRow[]>>((acc, hop) => {
      acc[hop.region] = acc[hop.region] ? [...acc[hop.region], hop] : [hop];
      return acc;
    }, {});
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Leaf className="text-amber-400" />
            <div>
              <p className="text-xs uppercase text-amber-300 tracking-widest">Enciclopedia de Lúpulos</p>
              <h3 className="text-xl font-semibold text-white">Más de 100 variedades agrupadas por región</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
            aria-label="Cerrar enciclopedia"
          >
            <X />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[78vh] divide-y divide-slate-800">
          {Object.entries(grouped).map(([region, hops]) => (
            <div key={region} className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <h4 className="text-lg font-semibold text-white">{region}</h4>
                <span className="text-xs text-slate-400">{hops.length} variedades</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-800/60 text-left">
                    <tr>
                      <th className="px-3 py-2 w-48">Variedad / Origen</th>
                      <th className="px-3 py-2 w-20">% AA</th>
                      <th className="px-3 py-2 w-56">Perfil de Aroma</th>
                      <th className="px-3 py-2">Ingeniería de Adición</th>
                      <th className="px-3 py-2 w-64">Combinaciones de Élite</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {hops.map(hop => (
                      <tr key={`${region}-${hop.variety}`} className="hover:bg-slate-800/40">
                        <td className="px-3 py-2 font-semibold text-white">{hop.variety}</td>
                        <td className="px-3 py-2 text-amber-300">{hop.aa}</td>
                        <td className="px-3 py-2 text-slate-200">{hop.aroma}</td>
                        <td className="px-3 py-2 text-slate-300">{hop.engineering}</td>
                        <td className="px-3 py-2 text-amber-200">{hop.pairings.join(' · ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HopsDatabaseTable;
