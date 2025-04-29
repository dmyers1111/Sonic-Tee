import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { useAppContext } from '../context/AppContext';
import { Settings } from 'lucide-react';

export const InstrumentSelection: React.FC = () => {
  const { instruments, updateInstrument } = useAppContext();
  const [activeColorPicker, setActiveColorPicker] = React.useState<string | null>(null);

  const toggleColorPicker = (id: string) => {
    setActiveColorPicker(activeColorPicker === id ? null : id);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600 mb-2">
        Select which instruments to visualize and customize their colors.
      </p>
      
      {instruments.map((instrument) => (
        <div key={instrument.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
          <input
            type="checkbox"
            id={`instrument-${instrument.id}`}
            checked={instrument.selected}
            onChange={(e) => updateInstrument(instrument.id, { selected: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          
          <label
            htmlFor={`instrument-${instrument.id}`}
            className="flex-1 text-sm font-medium text-gray-700 cursor-pointer"
          >
            {instrument.name}
          </label>
          
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1 p-1 rounded-md hover:bg-gray-100"
              onClick={() => toggleColorPicker(instrument.id)}
              style={{ color: instrument.color }}
            >
              <div
                className="h-5 w-5 rounded-full border border-gray-300"
                style={{ backgroundColor: instrument.color }}
              />
              <Settings size={14} />
            </button>
            
            {activeColorPicker === instrument.id && (
              <div className="absolute right-0 top-8 z-10 shadow-xl rounded-md bg-white p-2">
                <HexColorPicker
                  color={instrument.color}
                  onChange={(color) => updateInstrument(instrument.id, { color })}
                />
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-500">{instrument.color}</span>
                  <button
                    className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setActiveColorPicker(null)}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};