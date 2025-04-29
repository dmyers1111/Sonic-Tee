import React from 'react';
import { useAppContext } from '../context/AppContext';

export const SongSegment: React.FC = () => {
  const { startTime, setStartTime, endTime, setEndTime } = useAppContext();

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = parseFloat(e.target.value);
    if (newStartTime < endTime) {
      setStartTime(newStartTime);
    }
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = parseFloat(e.target.value);
    if (newEndTime > startTime) {
      setEndTime(newEndTime);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-2">
        Select the time segment of the song to visualize.
      </p>
      
      <div className="space-y-3">
        <div>
          <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-1">
            Start Time (seconds)
          </label>
          <input
            type="number"
            id="start-time"
            min="0"
            max={endTime - 1}
            step="1"
            value={startTime}
            onChange={handleStartTimeChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-1">
            End Time (seconds)
          </label>
          <input
            type="number"
            id="end-time"
            min={startTime + 1}
            step="1"
            value={endTime}
            onChange={handleEndTimeChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="relative mt-6 h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-indigo-500 rounded-full"
          style={{
            left: `${(startTime / 300) * 100}%`,
            right: `${100 - (endTime / 300) * 100}%`,
          }}
        ></div>
        <div
          className="absolute w-4 h-4 bg-white border-2 border-indigo-500 rounded-full -translate-x-1/2 -translate-y-1/4 cursor-pointer"
          style={{ left: `${(startTime / 300) * 100}%`, top: '50%' }}
        ></div>
        <div
          className="absolute w-4 h-4 bg-white border-2 border-indigo-500 rounded-full -translate-x-1/2 -translate-y-1/4 cursor-pointer"
          style={{ left: `${(endTime / 300) * 100}%`, top: '50%' }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 px-1">
        <span>0s</span>
        <span>5m</span>
      </div>
    </div>
  );
};