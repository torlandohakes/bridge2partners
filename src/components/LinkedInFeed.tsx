'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ThumbsUp, MessageSquare, Share2, CheckCircle2, Loader2, ArrowUpRight, X } from 'lucide-react';

interface LinkedInPost {
  id: string;
  author: string;
  authorSub: string;
  date: string;
  text: string;
  likes: number;
  comments: number;
  shares?: number;
  imageUrl?: string;
  link: string;
  isArticle?: boolean;
}

export default function LinkedInFeed({ theme, tag, initialCount = 50 }: { theme: 'light' | 'medium' | 'dark', tag?: string, initialCount?: number }) {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [activeModalPost, setActiveModalPost] = useState<LinkedInPost | null>(null);
  const [verticalImages, setVerticalImages] = useState<Record<string, boolean>>({});
  const [fetchTrigger, setFetchTrigger] = useState(0);

  // Independent pagination limits
  const [articlesLimit, setArticlesLimit] = useState(2);
  const [updatesLimit, setUpdatesLimit] = useState(21);

  // Reset pagination state when the tag parameter changes
  useEffect(() => {
    setPosts([]);
    setHasMore(true);
    setFetchTrigger(0);
    setArticlesLimit(2);
    setUpdatesLimit(21);
  }, [tag]);

  useEffect(() => {
    async function fetchPosts() {
      const start = posts.length;
      if (start === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      try {
        const url = tag 
          ? `/api/linkedin?tag=${encodeURIComponent(tag)}&start=${start}&count=50&t=${Date.now()}` 
          : `/api/linkedin?start=${start}&count=50&t=${Date.now()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('API down');
        const data = await res.json();
        
        const newPosts: LinkedInPost[] = data.posts || [];
        setPosts(prev => {
          const combined: LinkedInPost[] = [...prev, ...newPosts];
          return Array.from(new Map<string, LinkedInPost>(combined.map(p => [p.id, p])).values());
        });
        
        // Hide the server fetch pagination if the new batch is less than the count limit (50)
        if (newPosts.length < 50) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (err) {
        console.error('LinkedIn render crash:', err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }
    
    // Only fetch if first page or there are more items to retrieve
    if (posts.length === 0 || hasMore) {
      fetchPosts();
    }
  }, [tag, fetchTrigger]);

  const allArticles = posts.filter((p) => p.isArticle);
  const allUpdates = posts.filter((p) => !p.isArticle);

  const handleLoadMoreArticles = () => {
    const nextLimit = articlesLimit + 4;
    setArticlesLimit(nextLimit);
    if (nextLimit > allArticles.length && hasMore) {
      setFetchTrigger(prev => prev + 1);
    }
  };

  const handleLoadMoreUpdates = () => {
    const nextLimit = updatesLimit + 9;
    setUpdatesLimit(nextLimit);
    if (nextLimit > allUpdates.length && hasMore) {
      setFetchTrigger(prev => prev + 1);
    }
  };

  const toggleExpand = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

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

  const displayedArticles = allArticles.slice(0, articlesLimit);
  const displayedUpdates = allUpdates.slice(0, updatesLimit);

  return (
    <div className="flex flex-col gap-16">
      {/* Featured Articles Section */}
      {allArticles.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
              Featured Articles
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayedArticles.map((post) => (
              <a 
                key={post.id} 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex flex-col border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group cursor-pointer ${cardBgStyle}`}
              >
                {/* Top: Visual/Media */}
                {post.imageUrl && (
                  <div className="w-full aspect-[16/9] relative border-b border-white/10 flex-shrink-0 overflow-hidden bg-[#050e0c] flex items-center justify-center">
                    <img 
                      src={post.imageUrl} 
                      alt="LinkedIn Article Attach" 
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700" 
                    />
                  </div>
                )}

                {/* Bottom: Post Details */}
                <div className="flex-1 flex flex-col p-6">
                  {/* LinkedIn Header */}
                  <div className="flex items-start gap-4 mb-4">
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
                      <p className={`text-xs mt-0.5 ${textMutedStyle}`}>
                         <span className="px-2 py-0.5 rounded bg-[#98cc67]/15 text-[#98cc67] font-bold tracking-wider text-[9px] uppercase mr-2 inline-block">Article</span>
                         {post.date}
                      </p>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="pb-4 flex-1 flex flex-col">
                      <p className={`font-reading text-sm sm:text-base leading-relaxed whitespace-pre-wrap ${expandedPosts.has(post.id) ? '' : 'line-clamp-6'} ${textPrimaryStyle}`}>
                        {post.text}
                      </p>
                      {(post.text.split('\n').length > 6 || post.text.length > 260) && (
                        <button 
                          onClick={(e) => toggleExpand(e, post.id)}
                          className="mt-2 text-xs font-bold text-blue-400 hover:text-blue-500 transition-colors w-fit pointer-events-auto text-left"
                        >
                          {expandedPosts.has(post.id) ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                  </div>

                  {/* LinkedIn Stats Row */}
                  <div className={`py-2 px-1 flex items-center justify-between text-[11px] font-semibold border-t ${theme === 'light' ? 'border-[#001b15]/5 text-slate-500' : 'border-white/5 text-white/50'}`}>
                     <div className="flex items-center gap-1">
                       <span className="flex -space-x-1 items-center">
                         <span className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center border border-[#050e0c] shadow-sm"><ThumbsUp className="w-2 h-2 text-white fill-white" /></span>
                       </span>
                       <span className="ml-1">{post.likes}</span>
                     </div>
                     <div className="flex items-center gap-2 text-[10px] opacity-80">
                       {post.comments > 0 && (
                         <span>{post.comments} comment{post.comments !== 1 ? 's' : ''}</span>
                       )}
                       {post.shares !== undefined && post.shares > 0 && (
                         <>
                           <span className="opacity-40">•</span>
                           <span>{post.shares} share{post.shares !== 1 ? 's' : ''}</span>
                         </>
                       )}
                     </div>
                  </div>

                  {/* LinkedIn Interaction Bar */}
                  <div className={`mt-auto pt-3 border-t flex items-center justify-between font-ui text-xs font-semibold ${theme === 'light' ? 'border-[#001b15]/10' : 'border-white/10'}`}>
                      <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded transition-colors ${buttonHoverStyle}`}>
                        <ThumbsUp className="w-4 h-4" />
                        <span className="opacity-80">Like</span>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded transition-colors ${buttonHoverStyle}`}>
                        <MessageSquare className="w-4 h-4" />
                        <span className="opacity-80">Comment</span>
                      </div>
                      <div className={`hidden lg:flex items-center gap-1.5 px-2 py-1.5 rounded transition-colors ${buttonHoverStyle}`}>
                        <Share2 className="w-4 h-4" />
                        <span className="opacity-80">Share</span>
                      </div>
                      <div className="px-2 py-1.5 ml-auto text-blue-400 group-hover:text-blue-500 transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Load More Articles Button */}
          {(articlesLimit < allArticles.length || hasMore) && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMoreArticles}
                disabled={loadingMore}
                className={`px-6 py-2.5 rounded-full font-ui text-xs font-bold tracking-wider uppercase border transition-all duration-300 flex items-center gap-2 ${
                  theme === 'light'
                    ? 'bg-[#001b15] hover:bg-[#003326] text-white border-transparent shadow-sm'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#98cc67]" />
                    <span>Loading Articles...</span>
                  </>
                ) : (
                  <>
                    <span>Load More Articles</span>
                    <ArrowUpRight className="w-3.5 h-3.5 rotate-45" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Latest Updates Section */}
      {allUpdates.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">
              Latest Updates
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedUpdates.map((post) => {
              const limitLines = post.imageUrl ? 3 : 14;
              const limitLength = post.imageUrl ? 130 : 650;
              const hasOverflow = post.text.split('\n').length > limitLines || post.text.length > limitLength;
              const lineClampClass = post.imageUrl ? 'line-clamp-3' : 'line-clamp-[14]';

              return (
                <div 
                  key={post.id} 
                  onClick={() => setActiveModalPost(post)}
                  className={`flex flex-col border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group cursor-pointer h-full ${cardBgStyle}`}
                >
                  {/* LinkedIn Header */}
                  <div className="p-5 flex items-start gap-4 flex-shrink-0">
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
                  <div className="px-5 pb-4 flex-shrink-0">
                     <p className={`font-reading text-sm leading-relaxed whitespace-pre-wrap ${lineClampClass} ${textPrimaryStyle}`}>
                       {post.text}
                     </p>
                     
                     {hasOverflow && (
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           setActiveModalPost(post);
                         }}
                         className="mt-1.5 text-xs font-bold text-blue-400 hover:text-blue-500 transition-colors pointer-events-auto"
                       >
                         Read More
                       </button>
                     )}
                  </div>

                  {/* Display Media if attached - dynamic square-cropping for portrait images, auto for landscape */}
                  {post.imageUrl && (
                     <div className={`border-t border-white/5 bg-[#050e0c] overflow-hidden flex-shrink-0 ${
                       verticalImages[post.id]
                         ? "w-full aspect-square relative flex items-center justify-center"
                         : "w-full"
                     }`}>
                        <img 
                          src={post.imageUrl} 
                          alt="LinkedIn Attach" 
                          onLoad={(e) => {
                            const img = e.currentTarget;
                            if (img.naturalHeight > img.naturalWidth) {
                              setVerticalImages(prev => ({ ...prev, [post.id]: true }));
                            }
                          }}
                          className={verticalImages[post.id]
                            ? "w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
                            : "w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-700"
                          }
                        />
                     </div>
                   )}

                  {/* Bottom Stats & Buttons (Always Anchored to bottom) */}
                  <div className="mt-auto flex-shrink-0 flex flex-col">
                    {/* LinkedIn Stats Row */}
                    <div className={`px-5 py-2 flex items-center justify-between text-[11px] font-semibold border-t ${theme === 'light' ? 'border-[#001b15]/5 text-slate-500' : 'border-white/5 text-white/50'}`}>
                       <div className="flex items-center gap-1">
                         <span className="flex -space-x-1 items-center">
                           <span className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center border border-[#050e0c] shadow-sm"><ThumbsUp className="w-2 h-2 text-white fill-white" /></span>
                         </span>
                         <span className="ml-1">{post.likes}</span>
                       </div>
                       <div className="flex items-center gap-2 text-[10px] opacity-80">
                         {post.comments > 0 && (
                           <span>{post.comments} comment{post.comments !== 1 ? 's' : ''}</span>
                         )}
                         {post.shares !== undefined && post.shares > 0 && (
                           <>
                             <span className="opacity-40">•</span>
                             <span>{post.shares} share{post.shares !== 1 ? 's' : ''}</span>
                           </>
                         )}
                       </div>
                    </div>

                    {/* LinkedIn Interaction Bar */}
                    <div className={`px-5 py-3 border-t flex items-center justify-between font-ui text-xs font-semibold ${theme === 'light' ? 'border-[#001b15]/10' : 'border-white/10'}`}>
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           window.open(post.link, '_blank', 'noopener,noreferrer');
                         }}
                         className={`flex items-center gap-1.5 px-2 py-1.5 rounded transition-colors cursor-pointer pointer-events-auto ${buttonHoverStyle}`}
                       >
                         <ThumbsUp className="w-4 h-4" />
                         <span className="opacity-80">Like</span>
                       </button>
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           window.open(post.link, '_blank', 'noopener,noreferrer');
                         }}
                         className={`flex items-center gap-1.5 px-2 py-1.5 rounded transition-colors cursor-pointer pointer-events-auto ${buttonHoverStyle}`}
                       >
                         <MessageSquare className="w-4 h-4" />
                         <span className="opacity-80">Comment</span>
                       </button>
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           window.open(post.link, '_blank', 'noopener,noreferrer');
                         }}
                         className="px-2 py-1.5 ml-auto text-blue-400 group-hover:text-blue-500 transition-colors cursor-pointer pointer-events-auto"
                       >
                         <ArrowUpRight className="w-5 h-5" />
                       </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          {(updatesLimit < allUpdates.length || hasMore) && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMoreUpdates}
                disabled={loadingMore}
                className={`px-8 py-3 rounded-full font-ui text-sm font-bold tracking-wider uppercase border transition-all duration-300 flex items-center gap-2 ${
                  theme === 'light'
                    ? 'bg-[#001b15] hover:bg-[#003326] text-white border-transparent shadow-sm'
                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#98cc67]" />
                    <span>Loading Updates...</span>
                  </>
                ) : (
                  <>
                    <span>Load More Updates</span>
                    <ArrowUpRight className="w-4 h-4 rotate-45" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Premium Glassmorphic Modal Overlay */}
      {activeModalPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300"
          onClick={() => setActiveModalPost(null)}
        >
          <div 
            className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border flex flex-col shadow-2xl p-6 sm:p-8 ${theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#000d0a]/95 border-white/10 text-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveModalPost(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-6 flex-shrink-0">
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
                <h4 className="font-ui font-bold text-base leading-tight flex items-center gap-1">
                   {activeModalPost.author} 
                   <span className="text-white bg-blue-600 rounded-full w-3 h-3 flex items-center justify-center"><CheckCircle2 className="w-2 h-2" /></span>
                </h4>
                <p className="text-xs text-white/60 mt-1">{activeModalPost.authorSub}</p>
                <p className="text-xs text-white/55 mt-0.5">
                   {activeModalPost.isArticle && <span className="px-2 py-0.5 rounded bg-[#98cc67]/15 text-[#98cc67] font-bold tracking-wider text-[9px] uppercase mr-2 inline-block">Article</span>}
                   {activeModalPost.date}
                </p>
              </div>
            </div>

            {/* Full Image if attached */}
            {activeModalPost.imageUrl && (
              <div className="w-full rounded-lg overflow-hidden bg-black/20 mb-6 border border-white/5 flex items-center justify-center max-h-[360px] flex-shrink-0">
                <img 
                  src={activeModalPost.imageUrl} 
                  alt="LinkedIn Post Visual" 
                  className="max-h-[360px] w-auto object-contain" 
                />
              </div>
            )}

            {/* Full Text Content */}
            <div className="font-reading text-sm sm:text-base leading-relaxed whitespace-pre-wrap flex-1 overflow-y-auto mb-6 text-white/90 pr-2 custom-scrollbar">
              {activeModalPost.text}
            </div>

            {/* Interaction & View on LinkedIn Button */}
            <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between font-ui text-xs font-semibold flex-shrink-0">
              <div className="flex items-center gap-4 text-white/70">
                <span className="flex items-center gap-1.5"><ThumbsUp className="w-4 h-4 text-[#98cc67]" /> {activeModalPost.likes} Likes</span>
                {activeModalPost.comments > 0 && <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4 text-[#98cc67]" /> {activeModalPost.comments} Comments</span>}
              </div>
              <a 
                href={activeModalPost.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#98cc67] text-[#001b15] rounded-full hover:bg-[#83b054] transition-all"
              >
                <span>View on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
