"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Twitter } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto max-w-2xl flex justify-between items-center py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Twitter className="h-6 w-6" />
          <span className="font-bold text-xl">Twitter Clone</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/profile">Profile</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}