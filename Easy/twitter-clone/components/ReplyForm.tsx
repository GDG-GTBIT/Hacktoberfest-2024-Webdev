"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ReplyFormProps {
  onReply: (content: string) => void;
}

export default function ReplyForm({ onReply }: ReplyFormProps) {
  const [reply, setReply] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reply.trim()) {
      onReply(reply);
      setReply('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <Textarea
        placeholder="Tweet your reply"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="w-full"
      />
      <Button type="submit" disabled={reply.trim().length === 0}>
        Reply
      </Button>
    </form>
  );
}