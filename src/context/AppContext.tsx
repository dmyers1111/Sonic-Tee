import React, { createContext, useContext, useState } from 'react';

export interface Instrument {
  id: string;
  name: string;
  color: string;
  selected: boolean;
}

export interface TextBox {
  id: string;
  text: string;
  font: string;
  position: { x: number; y: number };
}

interface AppContextType {
  // Audio Input
  inputType: 'file' | 'url';
  setInputType: (type: 'file' | 'url') => void;
  audioFile: File | null;
  setAudioFile: (file: File | null) => void;
  audioUrl: string;
  setAudioUrl: (url: string) => void;
  
  // Song Segment
  startTime: number;
  setStartTime: (time: number) => void;
  endTime: number;
  setEndTime: (time: number) => void;
  
  // Instruments
  instruments: Instrument[];
  setInstruments: (instruments: Instrument[]) => void;
  updateInstrument: (id: string, updates: Partial<Instrument>) => void;
  
  // Plot Background
  backgroundType: 'none' | 'albumCover' | 'overlay';
  setBackgroundType: (type: 'none' | 'albumCover' | 'overlay') => void;
  customAlbumCover: File | null;
  setCustomAlbumCover: (file: File | null) => void;
  
  // T-Shirt Customization
  tshirtColor: string;
  setTshirtColor: (color: string) => void;
  tshirtBackgroundImage: File | null;
  setTshirtBackgroundImage: (file: File | null) => void;
  textBoxes: TextBox[];
  addTextBox: (textBox: Omit<TextBox, 'id'>) => void;
  updateTextBox: (id: string, updates: Partial<Omit<TextBox, 'id'>>) => void;
  removeTextBox: (id: string) => void;
  
  // Audio processing state (simulated)
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  isProcessed: boolean;
  setIsProcessed: (isProcessed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inputType, setInputType] = useState<'file' | 'url'>('file');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(60);
  
  const [instruments, setInstruments] = useState<Instrument[]>([
    { id: '1', name: 'Guitar', color: '#3B82F6', selected: true },
    { id: '2', name: 'Piano', color: '#10B981', selected: true },
    { id: '3', name: 'Vocals', color: '#EC4899', selected: true },
    { id: '4', name: 'Percussion', color: '#F59E0B', selected: true },
    { id: '5', name: 'Bass', color: '#6366F1', selected: false },
  ]);
  
  const [backgroundType, setBackgroundType] = useState<'none' | 'albumCover' | 'overlay'>('none');
  const [customAlbumCover, setCustomAlbumCover] = useState<File | null>(null);
  
  const [tshirtColor, setTshirtColor] = useState<string>('#FFFFFF');
  const [tshirtBackgroundImage, setTshirtBackgroundImage] = useState<File | null>(null);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isProcessed, setIsProcessed] = useState<boolean>(false);
  
  const updateInstrument = (id: string, updates: Partial<Instrument>) => {
    setInstruments(instruments.map(instrument => 
      instrument.id === id ? { ...instrument, ...updates } : instrument
    ));
  };
  
  const addTextBox = (textBox: Omit<TextBox, 'id'>) => {
    setTextBoxes([...textBoxes, { ...textBox, id: Date.now().toString() }]);
  };
  
  const updateTextBox = (id: string, updates: Partial<Omit<TextBox, 'id'>>) => {
    setTextBoxes(textBoxes.map(textBox => 
      textBox.id === id ? { ...textBox, ...updates } : textBox
    ));
  };
  
  const removeTextBox = (id: string) => {
    setTextBoxes(textBoxes.filter(textBox => textBox.id !== id));
  };
  
  const value = {
    inputType,
    setInputType,
    audioFile,
    setAudioFile,
    audioUrl,
    setAudioUrl,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    instruments,
    setInstruments,
    updateInstrument,
    backgroundType,
    setBackgroundType,
    customAlbumCover,
    setCustomAlbumCover,
    tshirtColor,
    setTshirtColor,
    tshirtBackgroundImage,
    setTshirtBackgroundImage,
    textBoxes,
    addTextBox,
    updateTextBox,
    removeTextBox,
    isProcessing,
    setIsProcessing,
    isProcessed,
    setIsProcessed,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};