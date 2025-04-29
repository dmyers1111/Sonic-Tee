import React, { useEffect, useRef } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { useAppContext } from '../context/AppContext';
import Draggable from 'react-draggable';

export const TShirtPreview: React.FC = () => {
  const { 
    instruments, 
    startTime, 
    endTime, 
    tshirtColor, 
    tshirtBackgroundImage,
    textBoxes,
    updateTextBox,
    isProcessed
  } = useAppContext();

  const canvasRef = useRef<HTMLDivElement>(null);
  const tshirtImageRef = useRef<p5Types.Image | null>(null);
  const customBackgroundImageRef = useRef<p5Types.Image | null>(null);
  const tshirtTemplateUrl = 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg';
  
  // Generate simulated note data for each selected instrument (same as SinusoidalVisualization)
  const selectedInstruments = instruments.filter(instrument => instrument.selected);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const width = canvasParentRef.clientWidth;
    const height = 500;
    p5.createCanvas(width, height).parent(canvasParentRef);
    
    // Load t-shirt template image
    tshirtImageRef.current = p5.loadImage(tshirtTemplateUrl);
    
    // If there's a custom background image, load it
    if (tshirtBackgroundImage) {
      const objectUrl = URL.createObjectURL(tshirtBackgroundImage);
      customBackgroundImageRef.current = p5.loadImage(objectUrl, () => {
        // Clean up object URL when image is loaded
        URL.revokeObjectURL(objectUrl);
      });
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(240);
    
    if (!isProcessed) {
      p5.fill(150);
      p5.textSize(16);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text('Process audio to see t-shirt preview', p5.width / 2, p5.height / 2);
      return;
    }
    
    // Draw the t-shirt outline
    if (tshirtImageRef.current) {
      // Draw t-shirt template
      p5.image(tshirtImageRef.current, 0, 0, p5.width, p5.height);
      
      // Overlay with custom color
      p5.fill(tshirtColor);
      p5.blendMode(p5.MULTIPLY);
      p5.rect(0, 0, p5.width, p5.height);
      p5.blendMode(p5.BLEND);
    } else {
      // Fallback if image isn't loaded
      p5.fill(tshirtColor);
      p5.rect(0, 0, p5.width, p5.height);
    }
    
    // Draw custom background image if present
    if (customBackgroundImageRef.current) {
      const img = customBackgroundImageRef.current;
      // Center the image on the t-shirt
      const tshirtCenter = { x: p5.width / 2, y: p5.height / 2.5 };
      const imgWidth = p5.width * 0.6;
      const imgHeight = (img.height / img.width) * imgWidth;
      p5.image(
        img, 
        tshirtCenter.x - imgWidth / 2, 
        tshirtCenter.y - imgHeight / 2, 
        imgWidth, 
        imgHeight
      );
    }
    
    // Draw the sinusoidal visualization on the t-shirt
    const visualizationWidth = p5.width * 0.8;
    const visualizationHeight = p5.height * 0.4;
    const centerX = p5.width / 2;
    const centerY = p5.height / 3;
    
    p5.fill(255, 255, 255, 200);
    p5.rect(
      centerX - visualizationWidth / 2,
      centerY - visualizationHeight / 2,
      visualizationWidth,
      visualizationHeight
    );
    
    // Calculate dimensions for each instrument's plot
    const plotHeight = visualizationHeight / selectedInstruments.length;
    const plotPadding = 5;
    const actualPlotHeight = plotHeight - plotPadding * 2;
    const duration = endTime - startTime;
    
    // Draw the plots for each instrument (simplified version)
    selectedInstruments.forEach((instrument, index) => {
      const yStart = (centerY - visualizationHeight / 2) + index * plotHeight + plotPadding;
      
      // Draw simple sine wave for preview
      p5.stroke(instrument.color);
      p5.strokeWeight(2);
      p5.noFill();
      p5.beginShape();
      
      const waveFrequency = 0.05 + (index * 0.02);
      const amplitude = actualPlotHeight / 3;
      const yMiddle = yStart + actualPlotHeight / 2;
      
      for (let x = centerX - visualizationWidth / 2; x <= centerX + visualizationWidth / 2; x++) {
        const normalizedX = p5.map(x, centerX - visualizationWidth / 2, centerX + visualizationWidth / 2, 0, 10);
        const y = yMiddle + Math.sin(normalizedX * waveFrequency * 10) * amplitude;
        p5.vertex(x, y);
      }
      
      p5.endShape();
      
      // Draw instrument name
      p5.noStroke();
      p5.fill(50);
      p5.textSize(10);
      p5.textAlign(p5.LEFT, p5.TOP);
      p5.text(instrument.name, centerX - visualizationWidth / 2 + 5, yStart);
    });
  };
  
  const windowResized = (p5: p5Types) => {
    if (canvasRef.current) {
      p5.resizeCanvas(canvasRef.current.clientWidth, 500);
    }
  };

  const handleDrag = (id: string, e: any, data: { x: number, y: number }) => {
    updateTextBox(id, { position: { x: data.x, y: data.y } });
  };

  return (
    <div className="relative">
      <div ref={canvasRef} className="w-full">
        <Sketch setup={setup} draw={draw} windowResized={windowResized} />
      </div>
      
      {/* Draggable text elements */}
      {textBoxes.map((textBox) => (
        <Draggable
          key={textBox.id}
          position={textBox.position}
          onDrag={(e, data) => handleDrag(textBox.id, e, data)}
          bounds="parent"
        >
          <div 
            className="absolute cursor-move" 
            style={{ 
              fontFamily: textBox.font,
              userSelect: 'none',
              padding: '4px',
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px dashed rgba(0, 0, 0, 0.2)',
            }}
          >
            {textBox.text}
          </div>
        </Draggable>
      ))}
      
      {!isProcessed && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <p className="text-gray-600 px-4 text-center">
            Upload and analyze a song to enable t-shirt customization
          </p>
        </div>
      )}
    </div>
  );
};