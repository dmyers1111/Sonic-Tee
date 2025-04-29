// Utility function to generate sinusoidal wave data points
export const generateSineWave = (
  frequency: number,
  amplitude: number,
  duration: number,
  sampleRate = 100
) => {
  const points = [];
  const totalSamples = duration * sampleRate;
  
  for (let i = 0; i < totalSamples; i++) {
    const time = i / sampleRate;
    const value = amplitude * Math.sin(2 * Math.PI * frequency * time);
    points.push({ time, value });
  }
  
  return points;
};

// Helper to generate mock note data for visualization
export const generateMockNoteData = (
  instrument: string,
  startTime: number,
  endTime: number,
  baseFrequency = 440
) => {
  const notes = [];
  const duration = endTime - startTime;
  const noteCount = instrument === 'Percussion' ? 20 : Math.floor(Math.random() * 10) + 5;
  
  // Different parameter settings for different instruments
  const params = {
    Guitar: {
      amplitudeRange: [0.5, 0.9],
      durationRange: [0.2, 1.5],
      frequencyMult: [0.5, 1.5],
      decayRate: 0.7
    },
    Piano: {
      amplitudeRange: [0.6, 1.0],
      durationRange: [0.5, 2.0],
      frequencyMult: [0.3, 2.0],
      decayRate: 0.5
    },
    Vocals: {
      amplitudeRange: [0.7, 1.0],
      durationRange: [0.3, 1.8],
      frequencyMult: [0.8, 1.2],
      decayRate: 0.3
    },
    Percussion: {
      amplitudeRange: [0.4, 0.8],
      durationRange: [0.1, 0.3],
      frequencyMult: [1.5, 2.5],
      decayRate: 0.9
    },
    Bass: {
      amplitudeRange: [0.7, 1.0],
      durationRange: [0.4, 1.5],
      frequencyMult: [0.2, 0.5],
      decayRate: 0.4
    }
  };
  
  const p = params[instrument as keyof typeof params] || params.Piano;
  
  for (let i = 0; i < noteCount; i++) {
    const startOffset = Math.random() * duration;
    const freqMult = p.frequencyMult[0] + Math.random() * (p.frequencyMult[1] - p.frequencyMult[0]);
    const frequency = baseFrequency * freqMult;
    const amplitude = p.amplitudeRange[0] + Math.random() * (p.amplitudeRange[1] - p.amplitudeRange[0]);
    const noteDuration = p.durationRange[0] + Math.random() * (p.durationRange[1] - p.durationRange[0]);
    
    // Generate frequencies (for chords)
    const frequencies = [frequency];
    
    // Add chord notes for some instruments with some probability
    if (instrument !== 'Percussion' && instrument !== 'Bass' && Math.random() > 0.6) {
      // Major chord
      frequencies.push(frequency * 1.26); // Major third
      frequencies.push(frequency * 1.5);  // Perfect fifth
    }
    
    notes.push({
      startTime: startTime + startOffset,
      frequencies,
      amplitude,
      duration: noteDuration,
      decayRate: p.decayRate
    });
  }
  
  return notes;
};

// Mock album covers for demonstration
export const mockAlbumCovers = [
  'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg',
  'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg',
  'https://images.pexels.com/photos/4200745/pexels-photo-4200745.jpeg',
  'https://images.pexels.com/photos/1670187/pexels-photo-1670187.jpeg'
];

// Font options for text boxes
export const fontOptions = [
  'Arial',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
  'Comic Sans MS',
  'Impact',
  'Tahoma',
  'Trebuchet MS',
  'Helvetica'
];