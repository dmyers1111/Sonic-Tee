import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Download, Loader } from 'lucide-react';

export const ExportDesign: React.FC = () => {
  const { isProcessed, isProcessing } = useAppContext();

  const handleExport = () => {
    // In a real app, this would trigger the export functionality
    alert('Exporting design as PNG. In a real application, this would save a high-resolution image file.');
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        disabled={!isProcessed || isProcessing}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-colors ${
          !isProcessed || isProcessing
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
        onClick={handleExport}
      >
        {isProcessing ? (
          <>
            <Loader className="animate-spin" size={18} />
            <span>Processing Audio...</span>
          </>
        ) : (
          <>
            <Download size={18} />
            <span>Export as PNG</span>
          </>
        )}
      </button>
      
      <div className="flex justify-center">
        <button
          type="button"
          disabled={!isProcessed || isProcessing}
          className={`text-sm px-3 py-1 rounded ${
            !isProcessed || isProcessing
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-indigo-600 hover:bg-indigo-50'
          }`}
          onClick={() => alert('Would export as SVG in a real application')}
        >
          Export as SVG
        </button>
      </div>
      
      {!isProcessed && !isProcessing && (
        <p className="text-sm text-gray-500 text-center">
          Upload and analyze a song to enable export options
        </p>
      )}
    </div>
  );
};