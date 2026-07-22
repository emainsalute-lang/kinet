"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { subscribeToUserPosts, type FeedPost } from "@/lib/posts";

export default function EmbeddedHighlightsContent() {
  const params = useParams<{ uid: string }>();
  const uid = params.uid;
  const [posts, setPosts] = useState<FeedPost[]>([]);

  useEffect(() => {
    if (!uid) return;
    return subscribeToUserPosts(uid, (nextPosts) => setPosts(nextPosts.slice(0, 6)));
  }, [uid]);

  return (
    <div className="grid h-full w-full grid-cols-1 gap-3 bg-background p-3 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <div key={post.id} className="overflow-hidden rounded-xl border">
          {post.mediaType === "video" ? (
            <video src={post.mediaUrl} controls className="aspect-video w-full bg-black object-cover" />
          ) : (
            <img src={post.mediaUrl} alt={post.caption || "Highlight"} className="aspect-video w-full object-cover" />
          )}
          <div className="p-2 text-xs">{post.caption}</div>
        </div>
      ))}
    </div>
  );
}
