'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ThumbsUp, MessageSquare, Share2, Send, CheckCircle2, Loader2, ArrowUpRight } from 'lucide-react';

interface LinkedInPost {
  id: string;
  author: string;
  authorSub: string;
  date: string;
  text: string;
  likes: number;
  comments: number;
  imageUrl?: string;
  link: string;
}

export default function LinkedInFeed({ theme, tag }: { theme: 'light' | 'medium' | 'dark', tag?: string }) {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const url = tag ? `/api/linkedin?tag=${encodeURIComponent(tag)}` : '/api/linkedin';
        const res = await fetch(url);
        if (!res.ok) throw new Error('API down');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error('LinkedIn render crash:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [tag]);

  const cardBgStyle = theme === 'light' 
    ? 'bg-white border-[#001b15]/10 shadow-sm' 
    : 'bg-white/5 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)]';
    
  const textMutedStyle = theme === 'light' ? 'text-slate-500' : 'text-white/60';
  const textPrimaryStyle = theme === 'light' ? 'text-[#001b15]' : 'text-white/90';
  const buttonHoverStyle = theme === 'light' ? 'hover:bg-slate-100/80 text-slate-600' : 'hover:bg-white/10 text-white/70 hover:text-white';

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
         <Loader2 className={`w-10 h-10 animate-spin ${theme === 'dark' ? 'text-[#98cc67]' : 'text-[#00573f]'}`} />
         <p className={`mt-4 font-ui text-sm uppercase tracking-widest font-bold ${textMutedStyle}`}>Connecting to LinkedIn API...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {posts.map((post) => (
        <a 
          key={post.id} 
          href={post.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`flex flex-col border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group cursor-pointer ${cardBgStyle}`}
        >
          {/* LinkedIn Header */}
          <div className="p-5 flex items-start gap-4">
            <div className={`relative w-12 h-12 rounded bg-white overflow-hidden flex-shrink-0 border ${theme === 'light' ? 'border-slate-200' : 'border-white/20'}`}>
               <Image 
                 src="/images/B2P_LI_LOGO_Primary.webp" 
                 alt="Bridge2Partners LinkedIn Icon" 
                 fill 
                 sizes="48px"
                 className="object-cover" 
               />
            </div>
            <div>
              <h4 className={`font-ui font-bold text-[15px] leading-tight flex items-center gap-1 ${textPrimaryStyle}`}>
                {post.author} 
                <span className="text-white bg-blue-600 rounded-full w-3 h-3 flex items-center justify-center"><CheckCircle2 className="w-2 h-2" /></span>
              </h4>
              <p className={`text-xs mt-1 leading-snug line-clamp-1 ${textMutedStyle}`}>{post.authorSub}</p>
              <p className={`text-xs mt-0.5 ${textMutedStyle}`}>{post.date}</p>
            </div>
          </div>

          {/* Body Text */}
          <div className="px-5 pb-3">
             <p className={`font-reading text-sm leading-relaxed whitespace-pre-wrap line-clamp-6 ${textPrimaryStyle}`}>
               {post.text}
             </p>
          </div>

          {/* Display Media if attached */}
          {post.imageUrl && (
            <div className="relative w-full h-[200px] mt-auto border-y border-white/5 bg-black/10 overflow-hidden">
               <Image 
                 src={post.imageUrl} 
                 alt="LinkedIn Attach" 
                 fill 
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
               />
            </div>
          )}
          {!post.imageUrl && (
             <div className="mt-auto h-4 w-full"></div>
          )}

          {/* LinkedIn Interaction Bar */}
          <div className={`mt-auto px-5 py-3 border-t flex items-center justify-between font-ui text-xs font-semibold ${theme === 'light' ? 'border-[#001b15]/10' : 'border-white/10'}`}>
             <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded transition-colors ${buttonHoverStyle}`}>
               <ThumbsUp className="w-4 h-4" />
               <span className="opacity-80">Like</span>
               <span className="opacity-60 ml-0.5 font-normal">({post.likes})</span>
             </div>
             <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded transition-colors ${buttonHoverStyle}`}>
               <MessageSquare className="w-4 h-4" />
               <span className="opacity-80">Comment</span>
             </div>
             <div className={`hidden lg:flex items-center gap-1.5 px-2 py-1.5 rounded transition-colors ${buttonHoverStyle}`}>
               <Share2 className="w-4 h-4" />
               <span className="opacity-80">Share</span>
             </div>
             {/* External Link Indicator */}
             <div className="px-2 py-1.5 ml-auto text-blue-400 group-hover:text-blue-500 transition-colors">
               <ArrowUpRight className="w-5 h-5" />
             </div>
          </div>

        </a>
      ))}
    </div>
  );
}
