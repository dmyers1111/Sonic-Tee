import React, { useState } from 'react';
import { AudioInput } from './components/AudioInput';
import { InstrumentSelection } from './components/InstrumentSelection';
import { SongSegment } from './components/SongSegment';
import { PlotBackground } from './components/PlotBackground';
import { TShirtCustomization } from './components/TShirtCustomization';
import { ExportDesign } from './components/ExportDesign';
import { SinusoidalVisualization } from './components/SinusoidalVisualization';
import { TShirtPreview } from './components/TShirtPreview';
import { Music } from 'lucide-react';
import { AppProvider } from './context/AppContext';

function App() {
  const [activeTab, setActiveTab] = useState<'visualization' | 'tshirt'>('visualization');

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <div className="container mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Sinusoidal Song Visualizer</h1>
            </div>
            <nav className="hidden md:flex space-x-4">
              <button 
                className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'visualization' ? 'bg-white text-indigo-600' : 'text-white hover:bg-white/10'}`}
                onClick={() => setActiveTab('visualization')}
              >
                Visualization
              </button>
              <button 
                className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'tshirt' ? 'bg-white text-indigo-600' : 'text-white hover:bg-white/10'}`}
                onClick={() => setActiveTab('tshirt')}
              >
                T-Shirt Design
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
          {/* Control Panel */}
          <div className="lg:w-1/3 space-y-6">
            <div className="md:hidden flex space-x-2 mb-4">
              <button 
                className={`flex-1 px-4 py-2 rounded-md transition-colors ${activeTab === 'visualization' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('visualization')}
              >
                Visualization
              </button>
              <button 
                className={`flex-1 px-4 py-2 rounded-md transition-colors ${activeTab === 'tshirt' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setActiveTab('tshirt')}
              >
                T-Shirt Design
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">Audio Input</h2>
              <AudioInput />
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">Song Segment</h2>
              <SongSegment />
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">Instrument Selection</h2>
              <InstrumentSelection />
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">Plot Background</h2>
              <PlotBackground />
            </div>

            {activeTab === 'tshirt' && (
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-xl font-semibold mb-4">T-Shirt Customization</h2>
                <TShirtCustomization />
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">Export Design</h2>
              <ExportDesign />
            </div>
          </div>

          {/* Visualization Area */}
          <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4">
              {activeTab === 'visualization' ? 'Sinusoidal Visualization' : 'T-Shirt Preview'}
            </h2>
            
            {activeTab === 'visualization' ? (
              <SinusoidalVisualization />
            ) : (
              <TShirtPreview />
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 Sinusoidal Song Visualizer. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;