import React, { useEffect, useRef } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { useAppContext } from '../context/AppContext';
import { Loader } from 'lucide-react';

// Simulated note data for visualization
const generateSimulatedNoteData = (instrument: string, startTime: number, endTime: number) => {
  const data = [];
  const duration = endTime - startTime;
  const noteCount = Math.floor(Math.random() * 10) + 5; // 5-15 notes
  
  for (let i = 0; i < noteCount; i++) {
    const startOffset = Math.random() * duration;
    const frequency = 220 + Math.random() * 440; // Random frequency between 220Hz and 660Hz
    const amplitude = 0.5 + Math.random() * 0.5; // Random amplitude between 0.5 and 1.0
    const noteDuration = 0.5 + Math.random() * 2; // Random duration between 0.5 and 2.5 seconds
    
    // For chords, add additional frequencies
    const isChord = Math.random() > 0.7;
    const frequencies = [frequency];
    
    if (isChord) {
      frequencies.push(frequency * 1.25); // Major third
      frequencies.push(frequency * 1.5);  // Perfect fifth
    }
    
    data.push({
      startTime: startTime + startOffset,
      frequencies,
      amplitude,
      duration: noteDuration
    });
  }
  
  return data;
};

export const SinusoidalVisualization: React.FC = () => {
  const { 
    instruments, 
    startTime, 
    endTime, 
    backgroundType, 
    customAlbumCover,
    isProcessed,
    isProcessing
  } = useAppContext();
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const albumImageRef = useRef<p5Types.Image | null>(null);
  const customAlbumImageRef = useRef<p5Types.Image | null>(null);
  const placeholderAlbumUrl = 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg';
  
  // Generate simulated note data for each selected instrument
  const selectedInstruments = instruments.filter(instrument => instrument.selected);
  const noteData = selectedInstruments.map(instrument => ({
    instrument: instrument.name,
    color: instrument.color,
    notes: generateSimulatedNoteData(instrument.name, startTime, endTime)
  }));

  useEffect(() => {
    // If we had real data, we would update it when these parameters change
  }, [startTime, endTime, instruments]);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const width = canvasParentRef.clientWidth;
    const height = 400;
    p5.createCanvas(width, height).parent(canvasParentRef);
    
    // Load the placeholder album image
    albumImageRef.current = p5.loadImage(placeholderAlbumUrl);
    
    // If there's a custom album cover, load it
    if (customAlbumCover) {
      const objectUrl = URL.createObjectURL(customAlbumCover);
      customAlbumImageRef.current = p5.loadImage(objectUrl, () => {
        // Clean up object URL when image is loaded
        URL.revokeObjectURL(objectUrl);
      });
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(255);
    
    if (!isProcessed) {
      return;
    }
    
    // Draw background based on selected option
    if (backgroundType === 'albumCover' && (customAlbumImageRef.current || albumImageRef.current)) {
      const img = customAlbumImageRef.current || albumImageRef.current;
      if (img) {
        p5.image(img, 0, 0, p5.width, p5.height);
        p5.fill(255, 255, 255, 150);
        p5.rect(0, 0, p5.width, p5.height);
      }
    }
    
    // Calculate dimensions for each instrument's plot
    const plotHeight = p5.height / selectedInstruments.length;
    const plotPadding = 10;
    const actualPlotHeight = plotHeight - plotPadding * 2;
    const duration = endTime - startTime;
    
    // Draw the plots for each instrument
    selectedInstruments.forEach((instrument, index) => {
      const yStart = index * plotHeight + plotPadding;
      
      // Draw separator lines between plots
      p5.stroke(200);
      p5.strokeWeight(1);
      if (index > 0) {
        p5.line(0, yStart - plotPadding / 2, p5.width, yStart - plotPadding / 2);
      }
      
      // Draw instrument name
      p5.noStroke();
      p5.fill(50);
      p5.textSize(14);
      p5.textAlign(p5.LEFT, p5.TOP);
      p5.text(instrument.name, 10, yStart);
      
      // Draw the sine waves for this instrument
      const instrumentData = noteData.find(d => d.instrument === instrument.name);
      if (instrumentData) {
        p5.stroke(instrumentData.color);
        p5.noFill();
        
        // Draw each note as a sine wave
        instrumentData.notes.forEach(note => {
          const noteStartX = p5.map(note.startTime - startTime, 0, duration, 0, p5.width);
          const noteEndX = p5.map(
            Math.min(note.startTime - startTime + note.duration, duration),
            0, duration, 0, p5.width
          );
          
          // For each frequency in the note (chords have multiple)
          note.frequencies.forEach(frequency => {
            p5.strokeWeight(2);
            p5.beginShape();
            
            // Draw the sine wave points
            for (let x = noteStartX; x <= noteEndX; x++) {
              const progress = (x - noteStartX) / (noteEndX - noteStartX);
              const decay = 1 - progress * 0.5; // Gradual amplitude decay
              
              // Calculate y position based on frequency, amplitude, and time
              const timePassed = p5.map(x, 0, p5.width, 0, duration);
              const amplitude = note.amplitude * decay * (actualPlotHeight / 4);
              const yMiddle = yStart + actualPlotHeight / 2;
              const y = yMiddle + Math.sin(frequency * timePassed * 0.05) * amplitude;
              
              p5.vertex(x, y);
            }
            
            p5.endShape();
          });
        });
      }
    });
    
    // Draw time markers
    p5.stroke(100);
    p5.strokeWeight(1);
    for (let t = 0; t <= duration; t += duration / 10) {
      const x = p5.map(t, 0, duration, 0, p5.width);
      p5.line(x, 0, x, p5.height);
      
      p5.noStroke();
      p5.fill(50);
      p5.textSize(10);
      p5.textAlign(p5.CENTER);
      p5.text(`${(startTime + t).toFixed(1)}s`, x, p5.height - 15);
    }
    
    // Overlay effect for "Plots as Album Cover" mode
    if (backgroundType === 'overlay' && (customAlbumImageRef.current || albumImageRef.current)) {
      const img = customAlbumImageRef.current || albumImageRef.current;
      if (img) {
        p5.blendMode(p5.MULTIPLY);
        p5.image(img, 0, 0, p5.width, p5.height);
        p5.blendMode(p5.BLEND);
      }
    }
  };
  
  const windowResized = (p5: p5Types) => {
    if (canvasRef.current) {
      p5.resizeCanvas(canvasRef.current.clientWidth, 400);
    }
  };

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center h-80 bg-gray-100 rounded-lg border border-gray-200">
        <Loader className="animate-spin h-10 w-10 text-indigo-600 mb-4" />
        <p className="text-gray-600">Processing audio...</p>
      </div>
    );
  }

  if (!isProcessed) {
    return (
      <div className="flex flex-col items-center justify-center h-80 bg-gray-100 rounded-lg border border-gray-200">
        <div className="text-center px-4">
          <p className="text-gray-600 mb-2">Upload an audio file or enter a URL to visualize</p>
          <p className="text-sm text-gray-500">
            The visualization will show sinusoidal representations of the detected notes and chords.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={canvasRef} className="w-full">
      <Sketch setup={setup} draw={draw} windowResized={windowResized} />
    </div>
  );
};