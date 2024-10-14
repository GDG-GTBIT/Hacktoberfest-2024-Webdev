"use client"

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Repeat2 } from 'lucide-react';
import { Tweet } from '@/app/page';
import ReplyForm from './ReplyForm';

interface TweetListProps {
  tweets: Tweet[];
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>;
  onReply: (content: string, parentId: number) => void;
}

export default function TweetList({ tweets, setTweets, onReply }: TweetListProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleLike = (id: number) => {
    setTweets(prevTweets => updateTweet(prevTweets, id, tweet => ({ ...tweet, likes: tweet.likes + 1 })));
  };

  const handleRetweet = (id: number) => {
    setTweets(prevTweets => updateTweet(prevTweets, id, tweet => ({ ...tweet, retweets: tweet.retweets + 1 })));
  };

  const updateTweet = (tweets: Tweet[], id: number, updateFn: (tweet: Tweet) => Tweet): Tweet[] => {
    return tweets.map(tweet => {
      if (tweet.id === id) {
        return updateFn(tweet);
      } else if (tweet.replies.length > 0) {
        return {
          ...tweet,
          replies: updateTweet(tweet.replies, id, updateFn),
        };
      }
      return tweet;
    });
  };

  const renderTweet = (tweet: Tweet, level: number = 0) => (
    <Card key={tweet.id} className={`ml-${level * 4}`}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={tweet.avatar} alt={tweet.author} />
            <AvatarFallback>{tweet.author[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{tweet.author}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{tweet.content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button variant="ghost" size="sm" onClick={() => handleLike(tweet.id)}>
            <Heart className="w-4 h-4 mr-2" />
            {tweet.likes}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleRetweet(tweet.id)}>
            <Repeat2 className="w-4 h-4 mr-2" />
            {tweet.retweets}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setReplyingTo(tweet.id)}>
            <MessageCircle className="w-4 h-4 mr-2" />
            {tweet.comments}
          </Button>
        </div>
      </CardFooter>
      {replyingTo === tweet.id && (
        <ReplyForm onReply={(content) => {
          onReply(content, tweet.id);
          setReplyingTo(null);
        }} />
      )}
      {tweet.replies.map(reply => renderTweet(reply, level + 1))}
    </Card>
  );

  return (
    <div className="space-y-4">
      {tweets.map(tweet => renderTweet(tweet))}
    </div>
  );
}