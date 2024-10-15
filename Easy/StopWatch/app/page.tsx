"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer } from 'lucide-react';

export default function Home() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <Timer className="mr-2" />
            Stopwatch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-6xl font-mono text-center mb-8">
            {formatTime(time)}
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={startStop}
              variant={isRunning ? "destructive" : "default"}
            >
              {isRunning ? 'Stop' : 'Start'}
            </Button>
            <Button onClick={reset} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}