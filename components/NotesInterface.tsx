import React, { useState, useEffect, useRef } from 'react';
import { Factory } from '../types';

interface NotesInterfaceProps {
  factories: Factory[];
  selectedFactoryId: number | null;
}

const NotesInterface: React.FC<NotesInterfaceProps> = ({ factories, selectedFactoryId }) => {
  const [activeNoteId, setActiveNoteId] = useState<string>('general');
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cargar notas al inicio
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('china_tour_notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (e) {
      console.error("Error loading notes", e);
    }
  }, []);

  // Limpiar el timer si el componente se desmonta
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (selectedFactoryId) {
      setActiveNoteId(selectedFactoryId.toString());
    }
  }, [selectedFactoryId]);

  const handleNoteChange = (text: string) => {
    const updatedNotes = { ...notes, [activeNoteId]: text };
    setNotes(updatedNotes);
    setSaveStatus('saving');

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('china_tour_notes', JSON.stringify(updatedNotes));
      setLastSaved(new Date());
      setSaveStatus('saved');
    }, 1000);
  };

  const insertFormat = (prefix: string, suffix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = notes[activeNoteId] || '';
    const selectedText = currentText.substring(start, end);

    const newText = currentText.substring(0, start) + prefix + selectedText + suffix + currentText.substring(end);
    
    handleNoteChange(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Función para descargar notas
  const downloadNotes = () => {
    let content = "🇨🇳 BITÁCORA DE VIAJE - CHINA PREFAB TOUR\n";
    content += `📅 Generado: ${new Date().toLocaleString()}\n`;
    content += "========================================\n\n";

    // Notas Generales
    if (notes['general']) {
      content += "📝 NOTAS GENERALES\n";
      content += "------------------\n";
      content += notes['general'] + "\n\n";
    }

    // Notas por Fábrica
    factories.sort((a,b) => a.priority - b.priority).forEach(f => {
      const note = notes[f.id.toString()];
      if (note && note.trim().length > 0) {
        content += `🏭 ${f.name} (Rank #${f.priority})\n`;
        content += `📍 ${f.city}\n`;
        content += "------------------\n";
        content += note + "\n\n";
      }
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bitacora_China_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getActiveTitle = () => {
    if (activeNoteId === 'general') return 'Notas Generales del Viaje';
    const factory = factories.find(f => f.id.toString() === activeNoteId);
    return factory ? `Notas: ${factory.name}` : 'Notas';
  };

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800 text-white p-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <h3 className="font-semibold text-sm">Cuaderno de Bitácora</h3>
        </div>
        
        <div className="flex items-center gap-2">
            <select 
            value={activeNoteId} 
            onChange={(e) => setActiveNoteId(e.target.value)}
            className="bg-slate-700 border-none text-xs rounded px-2 py-1 focus:ring-1 focus:ring-brand-500 outline-none cursor-pointer max-w-[140px] truncate text-white"
            >
            <option value="general">📝 Notas Generales</option>
            <optgroup label="Fábricas">
                {factories.sort((a,b) => a.priority - b.priority).map(f => (
                <option key={f.id} value={f.id.toString()}>
                    #{f.priority} - {f.name}
                </option>
                ))}
            </optgroup>
            </select>
            
            {/* Download Button */}
            <button 
                onClick={downloadNotes}
                className="bg-blue-600 hover:bg-blue-500 text-white p-1 rounded transition-colors"
                title="Descargar Notas (.txt)"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-yellow-50">
        <div className="px-4 py-2 bg-yellow-100/50 border-b border-yellow-200 flex justify-between items-center h-10">
            <span className="text-xs font-bold text-yellow-800 uppercase tracking-wide truncate pr-2">
              {getActiveTitle()}
            </span>
            
            <div className="flex items-center gap-2">
              {saveStatus === 'saving' ? (
                <div className="flex items-center gap-1.5 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                  <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">Guardando...</span>
                </div>
              ) : lastSaved ? (
                <div className="flex items-center gap-1.5 opacity-70">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-[10px] text-green-800 whitespace-nowrap">
                    Guardado {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ) : null}
            </div>
        </div>

        <div className="px-3 py-1.5 border-b border-yellow-200/50 flex gap-2 bg-yellow-50/80">
          <button 
            onClick={() => insertFormat('**', '**')}
            className="p-1 hover:bg-yellow-200 rounded text-slate-700 font-bold text-xs w-6 h-6 flex items-center justify-center transition-colors border border-transparent hover:border-yellow-300"
            title="Negrita"
          >
            B
          </button>
          <button 
            onClick={() => insertFormat('_', '_')}
            className="p-1 hover:bg-yellow-200 rounded text-slate-700 italic font-serif text-xs w-6 h-6 flex items-center justify-center transition-colors border border-transparent hover:border-yellow-300"
            title="Cursiva"
          >
            I
          </button>
          <button 
            onClick={() => insertFormat('\n- ', '')}
            className="p-1 hover:bg-yellow-200 rounded text-slate-700 text-xs w-6 h-6 flex items-center justify-center transition-colors border border-transparent hover:border-yellow-300"
            title="Lista"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        
        <textarea
          ref={textareaRef}
          className="flex-1 w-full p-4 bg-transparent resize-none focus:outline-none text-slate-700 text-sm leading-relaxed font-mono placeholder-yellow-700/30"
          placeholder={`Escribe aquí tus observaciones...\n\nUsa la barra de herramientas para formatear:\n**Negrita**, _Cursiva_, - Listas`}
          value={notes[activeNoteId] || ''}
          onChange={(e) => handleNoteChange(e.target.value)}
          spellCheck={false}
        />
        
        <div className="absolute inset-0 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(transparent 95%, #e5e7eb 95%)', 
               backgroundSize: '100% 1.5rem',
               top: '6rem' 
             }}>
        </div>
      </div>
    </div>
  );
};

export default NotesInterface;