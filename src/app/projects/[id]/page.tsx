// ... existing code ... <new file>
'use client';
import { useParams } from 'next/navigation';
import type React from 'react';
import { useState, useRef } from 'react';

interface ElementBase {
  id: string;
  type: 'image' | 'text';
  x: number;
  y: number;
}
interface ImageElement extends ElementBase {
  type: 'image';
  src: string;
  width: number;
  height: number;
}
interface TextElement extends ElementBase {
  type: 'text';
  text: string;
  fontSize: number;
  color: string;
}
type CanvasElement = ImageElement | TextElement;

export default function ProjectEditorPage() {
  const { id } = useParams<{ id: string }>();
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({x: 0, y: 0});
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [newText, setNewText] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);

  // Helper for adding image
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setElements(prev => [
        ...prev,
        {
          id: `${Date.now()}-img`,
          type: 'image',
          src: ev.target?.result as string,
          x: 80,
          y: 80,
          width: 180,
          height: 120,
        } as ImageElement
      ]);
    };
    reader.readAsDataURL(file);
  }
  // Helper for adding text
  function addTextBox() {
    if (!newText.trim()) return;
    setElements(prev => [
      ...prev,
      {
        id: `${Date.now()}-txt`,
        type: 'text',
        x: 100,
        y: 100 + prev.length * 32,
        text: newText,
        fontSize: 28,
        color: '#222',
      } as TextElement
    ]);
    setNewText('');
  }
  // Drag element
  function startDrag(e: React.MouseEvent, id: string) {
    setSelectedId(id);
    setDragging(true);
    const el = elements.find(el => el.id === id);
    if (el && canvasRef.current) {
      const bounds = canvasRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - bounds.left - el.x,
        y: e.clientY - bounds.top - el.y,
      });
    }
  }
  function onDrag(e: React.MouseEvent) {
    if (!dragging || !selectedId) return;
    if (canvasRef.current) {
      const bounds = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - bounds.left - dragOffset.x;
      const y = e.clientY - bounds.top - dragOffset.y;
      setElements(prev => prev.map(el => el.id === selectedId ? { ...el, x, y } : el));
    }
  }
  function endDrag() {
    setDragging(false);
  }
  // Remove element
  function deleteElement(id: string) {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  // Basic quick effects for text elements
  function applyTextEffect(effect: 'bigger'|'smaller'|'color', value?: string) {
    if (!selectedId) return;
    setElements(prev => prev.map(el => {
      if (el.id !== selectedId || el.type !== 'text') return el;
      if (effect === 'bigger') return { ...el, fontSize: el.fontSize + 4 };
      if (effect === 'smaller') return { ...el, fontSize: Math.max(12, el.fontSize - 4) };
      if (effect === 'color' && value) return { ...el, color: value };
      return el;
    }));
  }

  return (
    <div className="max-w-5xl mx-auto py-9 px-4">
      <h1 className="text-2xl font-bold mb-2 text-[#464fc3]">Project Editor</h1>
      <div className="flex gap-6 items-start">
        {/* Sidebar tools */}
        <div className="w-64 p-4 bg-white rounded shadow flex flex-col gap-6">
          <div>
            <label className="block mb-2">Add image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
          </div>
          <div>
            <label className="block mb-2">Add text</label>
            <input value={newText} onChange={e => setNewText(e.target.value)} className="border px-2 py-1 rounded w-full mb-2" placeholder="Your text" />
            <button onClick={addTextBox} className="bg-[#464fc3] text-white px-3 py-1 rounded">Add</button>
          </div>
          {selectedId && elements.find(e => e.id === selectedId && e.type === 'text') && (
            <div className="border-t pt-4 mt-2">
              <label className="font-semibold">Text effects</label>
              <div className="flex gap-2 mt-2">
                <button onClick={() => applyTextEffect('bigger')} className="px-2 py-1 border rounded">A+</button>
                <button onClick={() => applyTextEffect('smaller')} className="px-2 py-1 border rounded">A-</button>
                <button onClick={() => applyTextEffect('color', '#464fc3')} className="px-2 py-1 border rounded bg-[#464fc3] text-white" style={{backgroundColor:'#464fc3'}}>Blue</button>
                <button onClick={() => applyTextEffect('color', '#dca1bf')} className="px-2 py-1 border rounded bg-[#dca1bf]">Pink</button>
                <button onClick={() => applyTextEffect('color', '#333')} className="px-2 py-1 border rounded bg-[#333] text-white">Black</button>
              </div>
            </div>
          )}
          {selectedId && (
            <button className="mt-4 text-red-600 underline px-2" onClick={() => deleteElement(selectedId)}>Delete selected</button>
          )}
        </div>
        {/* Canvas area */}
        <div
          ref={canvasRef}
          onMouseMove={onDrag}
          onMouseUp={endDrag}
          className="relative border rounded-lg bg-white shadow-lg w-[730px] h-[520px] overflow-hidden flex-grow cursor-crosshair"
        >
          {elements.map(el => el.type === 'image' ? (
            <img
              key={el.id}
              src={el.src}
              alt="user image"
              style={{ left: el.x, top: el.y, width: el.width, height: el.height, position:'absolute', border: selectedId===el.id?'2px solid #464fc3':'2px solid transparent', cursor:'move' }}
              onMouseDown={e => startDrag(e, el.id)}
              onClick={() => setSelectedId(el.id)}
            />
          ) : (
            <span
              key={el.id}
              style={{ left: el.x, top: el.y, position:'absolute', fontSize: (el as TextElement).fontSize, color: (el as TextElement).color, background: selectedId===el.id?'#f2eafa':'transparent', cursor: 'move', padding:'2px 6px', borderRadius: '4px', border: selectedId===el.id?'1.5px solid #464fc3':'none', userSelect:'none' }}
              onMouseDown={e => startDrag(e, el.id)}
              onClick={() => setSelectedId(el.id)}
            >{(el as TextElement).text}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
