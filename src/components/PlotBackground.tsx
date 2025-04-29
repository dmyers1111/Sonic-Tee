import React, { useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { Upload, Image as ImageIcon } from 'lucide-react';

export const PlotBackground: React.FC = () => {
  const { 
    backgroundType, 
    setBackgroundType, 
    customAlbumCover, 
    setCustomAlbumCover 
  } = useAppContext();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setCustomAlbumCover(file);
    }
  };

  const handleBackgroundTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBackgroundType(e.target.value as 'none' | 'albumCover' | 'overlay');
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="background-type" className="block text-sm font-medium text-gray-700 mb-1">
          Plot Background
        </label>
        <select
          id="background-type"
          value={backgroundType}
          onChange={handleBackgroundTypeChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="none">None (White Background)</option>
          <option value="albumCover">Album Cover</option>
          <option value="overlay">Plots as Album Cover</option>
        </select>
      </div>

      {(backgroundType === 'albumCover' || backgroundType === 'overlay') && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            {backgroundType === 'albumCover' 
              ? 'Use album cover as background' 
              : 'Overlay plots on album cover'}
          </p>
          
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-1 text-sm text-gray-600">
              Click to upload custom album cover
            </p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          
          {customAlbumCover && (
            <div className="text-sm text-gray-700 p-2 bg-gray-100 rounded flex items-center">
              <ImageIcon size={16} className="mr-2 flex-shrink-0" />
              <span className="truncate">{customAlbumCover.name}</span>
            </div>
          )}
          
          {!customAlbumCover && (
            <p className="text-xs text-gray-500 italic">
              If no custom image is provided, we'll use the detected album art from the audio source.
            </p>
          )}
        </div>
      )}
    </div>
  );
};