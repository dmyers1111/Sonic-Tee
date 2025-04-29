import React, { useRef } from 'react';
import { FileAudio, Link } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const AudioInput: React.FC = () => {
  const { 
    inputType, 
    setInputType, 
    audioFile, 
    setAudioFile,
    audioUrl,
    setAudioUrl,
    setIsProcessing,
    setIsProcessed
  } = useAppContext();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setAudioFile(file);
      simulateProcessing();
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioUrl(e.target.value);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (audioUrl.trim() !== '') {
      simulateProcessing();
    }
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    setIsProcessed(false);
    
    // Simulate audio processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex rounded-md overflow-hidden border border-gray-300">
        <button
          className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 transition-colors ${
            inputType === 'file'
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setInputType('file')}
        >
          <FileAudio size={18} />
          <span>Upload File</span>
        </button>
        <button
          className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 transition-colors ${
            inputType === 'url'
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setInputType('url')}
        >
          <Link size={18} />
          <span>Enter URL</span>
        </button>
      </div>

      {inputType === 'file' ? (
        <div className="space-y-2">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileAudio className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-1 text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">MP3 or WAV up to 10MB</p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".mp3,.wav"
              onChange={handleFileChange}
            />
          </div>
          {audioFile && (
            <div className="text-sm text-gray-700 p-2 bg-gray-100 rounded flex items-center">
              <FileAudio size={16} className="mr-2 flex-shrink-0" />
              <span className="truncate">{audioFile.name}</span>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleUrlSubmit} className="space-y-2">
          <div className="flex">
            <input
              type="text"
              placeholder="Enter YouTube or Spotify URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={audioUrl}
              onChange={handleUrlChange}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors"
            >
              Analyze
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Supports YouTube videos and Spotify tracks
          </p>
        </form>
      )}
    </div>
  );
};