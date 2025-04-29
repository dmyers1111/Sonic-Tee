import React, { useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useAppContext } from '../context/AppContext';
import { Upload, Type, Check, X } from 'lucide-react';

export const TShirtCustomization: React.FC = () => {
  const { 
    tshirtColor, 
    setTshirtColor, 
    tshirtBackgroundImage, 
    setTshirtBackgroundImage,
    addTextBox
  } = useAppContext();
  
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [text, setText] = useState('');
  const [font, setFont] = useState('Arial');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setTshirtBackgroundImage(file);
    }
  };

  const handleAddText = () => {
    if (text.trim()) {
      addTextBox({
        text,
        font,
        position: { x: 100, y: 100 }
      });
      setText('');
    }
  };

  const fonts = [
    'Arial',
    'Verdana',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Palatino',
    'Garamond',
    'Comic Sans MS',
    'Impact'
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          T-Shirt Color
        </label>
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md w-full text-left"
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            <div 
              className="w-6 h-6 rounded-full border border-gray-300" 
              style={{ backgroundColor: tshirtColor }}
            />
            <span className="text-sm">{tshirtColor}</span>
          </button>
          
          {showColorPicker && (
            <div className="absolute left-0 top-full mt-2 z-10 bg-white p-3 rounded-md shadow-xl border border-gray-200">
              <HexColorPicker color={tshirtColor} onChange={setTshirtColor} />
              <div className="mt-2 flex justify-between">
                <button
                  className="text-xs text-gray-500 hover:text-gray-700"
                  onClick={() => setTshirtColor('#FFFFFF')}
                >
                  Reset
                </button>
                <button
                  className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                  onClick={() => setShowColorPicker(false)}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Background Image (Optional)
        </label>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-1 text-sm text-gray-600">
            Click to upload a background image
          </p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        
        {tshirtBackgroundImage && (
          <div className="text-sm text-gray-700 p-2 bg-gray-100 rounded flex items-center">
            <img 
              src={URL.createObjectURL(tshirtBackgroundImage)}
              alt="Background preview"
              className="w-10 h-10 object-cover mr-2 rounded"
            />
            <span className="truncate">{tshirtBackgroundImage.name}</span>
            <button 
              className="ml-auto text-gray-500 hover:text-red-500"
              onClick={() => setTshirtBackgroundImage(null)}
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Add Text
        </label>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {fonts.map((f) => (
              <option key={f} value={f} style={{ fontFamily: f }}>
                {f}
              </option>
            ))}
          </select>
          
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            onClick={handleAddText}
          >
            <Type size={16} />
            <span>Add Text</span>
          </button>
        </div>
      </div>
    </div>
  );
};