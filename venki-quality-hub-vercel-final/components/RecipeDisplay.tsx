import React, { useMemo, useState } from 'react';
import { FileText, Palette, Download, FlaskConical, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RecipeResponse, RecipeVariant } from '../types';

interface Props {
  recipe?: RecipeResponse;
}

const srmHexScale = [
  '#FFE699', '#FFD878', '#FFCA5A', '#FFBF42', '#FBB123', '#F8A600', '#F39C00', '#EA8F00', '#E58500', '#DE7C00',
  '#D77200', '#CF6900', '#CB6200', '#C35900', '#BB5100', '#B54C00', '#B04500', '#A63E00', '#A13700', '#9B3200',
  '#952D00', '#8E2900', '#882300', '#821E00', '#7B1A00', '#771900', '#701400', '#6A0E00', '#660D00', '#5E0B00',
  '#5A0A02', '#600903', '#520907', '#4C0505', '#470606', '#420607', '#3B0607', '#3A070B', '#36080A', '#2D070A',
];

const srmToHex = (srmValue: string) => {
  const value = Number.parseFloat(srmValue);
  if (Number.isNaN(value)) return '#FFBF42';
  const index = Math.min(Math.max(Math.round(value), 1), srmHexScale.length) - 1;
  return srmHexScale[index];
};

const parseWeight = (amount: string) => {
  const numeric = Number.parseFloat(amount.replace(/[^0-9.,]/g, '').replace(',', '.'));
  if (Number.isNaN(numeric)) return 0;
  if (amount.toLowerCase().includes('kg')) return numeric;
  if (amount.toLowerCase().includes('g')) return numeric / 1000;
  return numeric;
};

const generateClientSideXML = (variation: RecipeVariant) => {
  const hops = variation.ingredients.filter(ing => ing.use?.toLowerCase().includes('hop') || ing.use?.toLowerCase().includes('lúpulo'));
  const malts = variation.ingredients.filter(ing => !hops.includes(ing));

  const hopXml = hops
    .map(ing => {
      const amount = parseWeight(ing.amount).toFixed(3);
      return `    <HOP>\n      <NAME>${ing.name}</NAME>\n      <ALPHA>${ing.notes || '0'}</ALPHA>\n      <AMOUNT>${amount}</AMOUNT>\n      <USE>${ing.use || 'Boil'}</USE>\n      <TIME>${ing.time || '60'}</TIME>\n    </HOP>`;
    })
    .join('\n');

  const maltXml = malts
    .map(ing => {
      const amount = parseWeight(ing.amount).toFixed(3);
      return `    <FERMENTABLE>\n      <NAME>${ing.name}</NAME>\n      <TYPE>Grain</TYPE>\n      <AMOUNT>${amount}</AMOUNT>\n      <NOTES>${ing.substitution} como sustituto Swaen</NOTES>\n    </FERMENTABLE>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<RECIPES>
  <RECIPE>
    <NAME>${variation.title} - ${variation.style}</NAME>
    <VERSION>1</VERSION>
    <TYPE>All Grain</TYPE>
    <BATCH_SIZE>${variation.batchSizeLiters}</BATCH_SIZE>
    <EFFICIENCY>${variation.efficiency}</EFFICIENCY>
    <BOIL_TIME>${variation.boilTime.replace(/[^0-9]/g, '') || '60'}</BOIL_TIME>
    <HOPS>
${hopXml}
    </HOPS>
    <FERMENTABLES>
${maltXml}
    </FERMENTABLES>
    <MISCS>
      <MISC>
        <NAME>Fermentación</NAME>
        <TYPE>Other</TYPE>
        <USE>Primary</USE>
        <TIME>0</TIME>
        <NOTES>${variation.fermentation}</NOTES>
      </MISC>
    </MISCS>
    <NOTES>${variation.tips.join(' | ')}. Agua: ${variation.waterProfile}</NOTES>
  </RECIPE>
</RECIPES>`;
};

const RecipeDisplay: React.FC<Props> = ({ recipe }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeVariation = useMemo(() => recipe?.variations?.[activeIndex], [recipe, activeIndex]);

  const handlePDF = () => {
    if (!activeVariation) return;
    const pdf = new jsPDF();
    pdf.setFillColor(15, 23, 42);
    pdf.setTextColor(30, 41, 59);
    pdf.rect(0, 0, 210, 297, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.text(`Maestro Cervecero AI - ${activeVariation.title}`, 14, 20);
    pdf.setFontSize(12);
    pdf.text(`Estilo: ${activeVariation.style} | Volumen: ${activeVariation.batchSizeLiters} L | Eficiencia: ${activeVariation.efficiency}%`, 14, 30);
    pdf.text(`Agua: ${activeVariation.waterProfile}`, 14, 38);
    pdf.text(`Fermentación: ${activeVariation.fermentation}`, 14, 46);

    autoTable(pdf, {
      startY: 54,
      head: [['Ingrediente original', 'Sustitución Swaen', 'Cantidad', 'Uso / Tiempo', 'Notas']],
      body: activeVariation.ingredients.map(ing => [ing.name, ing.substitution, ing.amount, `${ing.use || ''} ${ing.time || ''}`, ing.notes || '']),
      styles: { fillColor: [30, 41, 59], textColor: 255 },
      headStyles: { fillColor: [245, 158, 11], textColor: [30, 41, 59] },
    });

    const mashStart = (autoTable as any).previous.finalY + 8;
    pdf.text('Macerado / Hervor', 14, mashStart);
    activeVariation.mashSchedule.forEach((step, index) => {
      pdf.text(`• ${step}`, 14, mashStart + 8 + index * 6);
    });

    const tipsStart = mashStart + 8 + activeVariation.mashSchedule.length * 6 + 6;
    pdf.text('Tips del maestro cervecero', 14, tipsStart);
    activeVariation.tips.forEach((tip, index) => {
      pdf.text(`• ${tip}`, 14, tipsStart + 8 + index * 6);
    });

    pdf.save(`${activeVariation.title}.pdf`);
  };

  const handleTastingSheet = () => {
    if (!activeVariation) return;
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text('Hoja de cata BJCP - Maestro Cervecero AI', 14, 20);
    pdf.setFontSize(12);
    pdf.text(`Estilo: ${activeVariation.style}`, 14, 30);
    pdf.text(`Lote: ${activeVariation.batchSizeLiters} L`, 14, 38);

    const attributes = ['Aroma', 'Apariencia', 'Sabor', 'Sensación en boca', 'Impresión general'];
    attributes.forEach((attr, idx) => {
      const y = 50 + idx * 20;
      pdf.text(attr, 14, y);
      pdf.line(40, y, 180, y);
      pdf.text('Bajo', 40, y + 6);
      pdf.text('Alto', 170, y + 6);
    });

    pdf.text('Notas:', 14, 160);
    pdf.rect(14, 164, 180, 60);
    pdf.save(`Hoja_Cata_${activeVariation.title}.pdf`);
  };

  const handleXML = () => {
    if (!activeVariation) return;
    const xml = generateClientSideXML(activeVariation);
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeVariation.title}.xml`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!recipe || !recipe.variations?.length) {
    return (
      <div className="mt-6 p-6 rounded-2xl border border-dashed border-amber-500/40 bg-slate-900/60 text-slate-300">
        <p>Completa el formulario y obtendrás tres variaciones (Clásica, Competitiva y Experimental) con sustituciones Swaen / Lallemand.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveIndex(index => (index === 0 ? recipe.variations.length - 1 : index - 1))}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700"
            aria-label="Anterior"
          >
            <ChevronLeft />
          </button>
          <div className="px-3 py-2 rounded-lg bg-amber-500 text-slate-900 font-semibold">
            {recipe.variations[activeIndex]?.title || 'Receta'}
          </div>
          <button
            onClick={() => setActiveIndex(index => (index === recipe.variations.length - 1 ? 0 : index + 1))}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700"
            aria-label="Siguiente"
          >
            <ChevronRight />
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={handleXML} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100">
            <Download size={18} /> BeerXML
          </button>
          <button onClick={handlePDF} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100">
            <FileText size={18} /> PDF Receta
          </button>
          <button onClick={handleTastingSheet} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100">
            <FlaskConical size={18} /> Hoja de cata
          </button>
        </div>
      </div>

      {activeVariation && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(activeVariation.stats).map(([key, value]) => (
                <div key={key} className="rounded-xl bg-slate-800/70 p-3 border border-slate-700">
                  <p className="text-xs uppercase text-slate-400">{key}</p>
                  <p className="text-2xl font-bold text-amber-300">{value}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
              <p className="text-sm text-slate-300 mb-2 flex items-center gap-2"><Palette className="text-amber-300" size={16} /> Color SRM</p>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg border border-slate-700" style={{ backgroundColor: srmToHex(activeVariation.stats.SRM) }}></div>
                <div>
                  <p className="text-lg font-semibold text-white">SRM {activeVariation.stats.SRM}</p>
                  <p className="text-slate-400 text-sm">Visualizador en vaso basado en tabla Morey.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Info size={16} className="text-amber-300" />
                <h4 className="font-semibold text-white">Notas de agua, fermentación y empaque</h4>
              </div>
              <p className="text-sm text-slate-300"><span className="font-semibold text-amber-200">Agua:</span> {activeVariation.waterProfile}</p>
              <p className="text-sm text-slate-300"><span className="font-semibold text-amber-200">Fermentación:</span> {activeVariation.fermentation}</p>
              <p className="text-sm text-slate-300"><span className="font-semibold text-amber-200">Empaque:</span> {activeVariation.packaging}</p>
            </div>
            <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
              <h4 className="font-semibold text-white mb-2">Macerado & Hervor</h4>
              <ul className="space-y-1 list-disc list-inside text-slate-300">
                {activeVariation.mashSchedule.map(step => (
                  <li key={step}>{step}</li>
                ))}
                <li><span className="font-semibold text-amber-200">Hervor:</span> {activeVariation.boilTime}</li>
              </ul>
            </div>
            <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
              <h4 className="font-semibold text-white mb-2">Tips expertos</h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {activeVariation.tips.map(tip => (
                  <div key={tip} className="p-3 rounded-lg bg-slate-900/70 border border-slate-700 text-sm text-slate-200">{tip}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4 space-y-4">
            <h4 className="font-semibold text-white">Ingredientes</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-900/60 text-left">
                  <tr>
                    <th className="px-2 py-2 w-[34%]">Original</th>
                    <th className="px-2 py-2 w-[26%]">Sustitución (The Swaen)</th>
                    <th className="px-2 py-2 w-[14%]">Cantidad</th>
                    <th className="px-2 py-2 w-[12%]">Uso</th>
                    <th className="px-2 py-2 w-[14%]">Alternativas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {activeVariation.ingredients.map(ing => (
                    <tr key={`${ing.name}-${ing.amount}`} className="hover:bg-slate-900/40">
                      <td className="px-2 py-2 text-white font-semibold">{ing.name}</td>
                      <td className="px-2 py-2 text-amber-300 font-medium">{ing.substitution}</td>
                      <td className="px-2 py-2 text-slate-200">{ing.amount}</td>
                      <td className="px-2 py-2 text-slate-300">{ing.use} {ing.time ? `(${ing.time})` : ''}</td>
                      <td className="px-2 py-2 text-slate-300" title={ing.alternatives?.join(', ')}>
                        {ing.alternatives?.slice(0, 2).join(' · ') || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-lg bg-slate-900/60 border border-amber-500/30 p-3 text-sm text-slate-300">
              <p className="font-semibold text-amber-200">Nota de sustitución</p>
              <p>Los ingredientes muestran nombre histórico y su equivalente The Swaen o Lallemand. Las alternativas se despliegan al pasar el mouse.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDisplay;
