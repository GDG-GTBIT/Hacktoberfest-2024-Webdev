"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface TweetFormProps {
  onTweet: (content: string) => void;
}

export default function TweetForm({ onTweet }: TweetFormProps) {
  const [tweet, setTweet] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tweet.trim()) {
      onTweet(tweet);
      setTweet('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="What's happening?"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full"
      />
      <Button type="submit" disabled={tweet.trim().length === 0}>
        Tweet
      </Button>
    </form>
  );
}