"use client"

import { useState } from 'react';
import TweetForm from '@/components/TweetForm';
import TweetList from '@/components/TweetList';

export interface Tweet {
  id: number;
  author: string;
  content: string;
  avatar: string;
  likes: number;
  retweets: number;
  comments: number;
  replies: Tweet[];
}

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const addTweet = (content: string, parentId?: number) => {
    const newTweet: Tweet = {
      id: Date.now(),
      author: 'Current User',
      content,
      avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=CurrentUser',
      likes: 0,
      retweets: 0,
      comments: 0,
      replies: [],
    };

    if (parentId) {
      setTweets(prevTweets => addReply(prevTweets, parentId, newTweet));
    } else {
      setTweets(prevTweets => [newTweet, ...prevTweets]);
    }
  };

  const addReply = (tweets: Tweet[], parentId: number, reply: Tweet): Tweet[] => {
    return tweets.map(tweet => {
      if (tweet.id === parentId) {
        return {
          ...tweet,
          replies: [reply, ...tweet.replies],
          comments: tweet.comments + 1,
        };
      } else if (tweet.replies.length > 0) {
        return {
          ...tweet,
          replies: addReply(tweet.replies, parentId, reply),
        };
      }
      return tweet;
    });
  };

  return (
    <div className="space-y-8">
      <TweetForm onTweet={addTweet} />
      <TweetList tweets={tweets} setTweets={setTweets} onReply={addTweet} />
    </div>
  );
}