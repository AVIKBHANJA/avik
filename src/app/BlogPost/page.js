"use client";
import { useState, useMemo } from 'react';
import { Search, Calendar, Clock, ChevronRight, Bookmark, ExternalLink } from 'lucide-react';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const posts = [
    {
      id: 1,
      title: "Data Persistence in Docker 🐳 Container",
      date: "Aug 20, 2023",
      author: "Rajdeep Sengupta",
      readTime: "8 min read",
      tags: ["Docker", "DevOps", "Containers"],
      hashnodeUrl: "https://hashnode.com/post/data-persistence-docker"
    },
    {
      id: 2,
      title: "Building a custom GCP architecture for Firebase TTL",
      date: "Aug 13, 2023",
      author: "Rajdeep Sengupta",
      readTime: "12 min read",
      tags: ["GCP", "Firebase", "Architecture"],
      hashnodeUrl: "https://hashnode.com/post/gcp-firebase-ttl"
    },
    {
      id: 3,
      title: ".this Explained in the most Simple Way!! (JavaScript) ✨",
      date: "Aug 12, 2023",
      author: "Rajdeep Sengupta",
      readTime: "6 min read",
      tags: ["JavaScript", "Programming"],
      hashnodeUrl: "https://hashnode.com/post/javascript-this"
    }
  ];

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    // Get unique searchable terms
    const searchTerms = new Set(
      posts.flatMap(post => [
        post.title,
        ...post.tags,
        post.author,
        ...post.title.split(' ').filter(word => word.length > 2) // Add individual words from title
      ])
    );
    
    return Array.from(searchTerms)
      .filter(term => term.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        // Prioritize exact matches and starts-with matches
        const query = searchQuery.toLowerCase();
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        if (aLower === query) return -1;
        if (bLower === query) return 1;
        if (aLower.startsWith(query) && !bLower.startsWith(query)) return -1;
        if (!aLower.startsWith(query) && bLower.startsWith(query)) return 1;
        return 0;
      })
      .slice(0, 5);
  }, [searchQuery, posts]);
  
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return posts;
    
    return posts.filter(post => {
      const searchableText = `
        ${post.title} 
        ${post.tags.join(' ')} 
        ${post.author} 
      `.toLowerCase();
      
      return searchableText.includes(query);
    });
  }, [searchQuery, posts]);
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const SearchInput = () => (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search for blogs"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-12 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div 
          className="absolute w-full mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50"
          onMouseDown={(e) => e.preventDefault()} // Prevents blur event from firing before click
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
           <div className='h-10'></div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
       
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold">All articles</h1>
            <button 
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
          <div className="hidden md:block w-96">
            <SearchInput />
          </div>
        </div>

        {showMobileSearch && (
          <div className="mb-4 md:hidden">
            <SearchInput />
          </div>
        )}

        <div className="space-y-6">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="group relative bg-gray-900 rounded-xl p-4 md:p-6 hover:bg-gray-800 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                </div>
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

          

              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <a
                    href={post.hashnodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors text-sm md:text-base"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden md:inline">View on Hashnode</span>
                    <span className="md:hidden">Hashnode</span>
                  </a>
                  <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                    <span className="hidden md:inline">Read post</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}