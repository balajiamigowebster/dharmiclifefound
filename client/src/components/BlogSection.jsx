import React from 'react';
import { Calendar, User, MessageSquare, ArrowRight } from 'lucide-react';

export default function BlogSection({ posts = [] }) {
  const fallbackPosts = [
    {
      id: 1,
      title: 'Donation is Hope for Poor Childrens',
      excerpt: 'There are many variations of passages available, but the majority have suffered alteration in some form by injected humour.',
      author: 'admin',
      post_date: '19 Dec',
      comments_count: 0,
      image: '/images/blog-1.jpg'
    },
    {
      id: 2,
      title: 'A Place where Start New Life with Peace',
      excerpt: 'Discover how our skill centers and shelter support assist homeless families in regaining their independence and rebuilding their lives.',
      author: 'admin',
      post_date: '19 Dec',
      comments_count: 0,
      image: '/images/blog-2.jpg'
    },
    {
      id: 3,
      title: 'Why organic food may be good for you',
      excerpt: 'Traditional wholesome diets and satvic nutrition form a core pillar of wellness and community health advocated by our Foundation.',
      author: 'admin',
      post_date: '19 Dec',
      comments_count: 0,
      image: '/images/blog-3.jpg'
    }
  ];

  const blogItems = posts.length > 0 ? posts : fallbackPosts;

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2">
              <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
              <span>Latest news</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gray-900 leading-tight">
              Latest News and Articles from Welowe
            </h2>
          </div>

          <a
            href="#events"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#901C25] hover:text-[#E48A2D] transition shrink-0"
          >
            <span>View All Blog</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogItems.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Image & Date Badge */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#901C25] text-white px-3 py-1.5 rounded-lg shadow text-xs font-bold flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#E48A2D]" />
                  <span>{post.post_date}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <User size={13} className="text-[#901C25]" />
                      <span>{post.author || 'admin'}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={13} className="text-[#901C25]" />
                      <span>{post.comments_count || 0} Comments</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-gray-900 group-hover:text-[#901C25] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#901C25] group-hover:text-[#E48A2D] transition">
                  <span>Read Full Article</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
