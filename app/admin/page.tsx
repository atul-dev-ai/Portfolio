'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// সুপাবেস কানেকশন
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // ডিফল্ট ট্যাব 'pending'
  const [loading, setLoading] = useState(true);

  // পেজ লোড হলেই ডাটা আনবে (কোনো চেক বা রিডাইরেক্ট নেই)
  useEffect(() => {
    fetchPosts(activeTab);
  }, [activeTab]);

  const fetchPosts = async (status) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) console.log(error);
    else setPosts(data || []);
    setLoading(false);
  };

  // অ্যাপ্রুভ বাটন ফাংশন
  const handleApprove = async (id) => {
    await supabase.from('posts').update({ status: 'approved' }).eq('id', id);
    fetchPosts(activeTab); // রিফ্রেশ
    alert("Post Approved!");
  };

  // ডিলিট বাটন ফাংশন
  const handleDelete = async (id) => {
    if(!confirm("Are you sure you want to delete?")) return;
    await supabase.from('posts').delete().eq('id', id);
    fetchPosts(activeTab); // রিফ্রেশ
    alert("Post Deleted!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Admin Dashboard</h1>

        {/* --- Tabs (Pending & Approved) --- */}
        <div className="flex space-x-6 mb-8 border-b border-gray-700">
          <button 
            onClick={() => setActiveTab('pending')}
            className={`pb-2 px-4 font-bold text-lg transition ${activeTab === 'pending' ? 'border-b-4 border-yellow-500 text-yellow-400' : 'text-gray-400 hover:text-white'}`}
          >
            Pending Requests
          </button>
          <button 
            onClick={() => setActiveTab('approved')}
            className={`pb-2 px-4 font-bold text-lg transition ${activeTab === 'approved' ? 'border-b-4 border-green-500 text-green-400' : 'text-gray-400 hover:text-white'}`}
          >
            Published Posts
          </button>
        </div>

        {/* --- Post List --- */}
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-gray-500 py-10 text-center bg-gray-800 rounded">
                No posts found in {activeTab}.
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-gray-800 p-5 rounded-lg border border-gray-700 flex justify-between items-center shadow-lg">
                  <div>
                    <h3 className="text-xl font-bold text-white">{post.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{new Date(post.created_at).toDateString()}</p>
                    <span className={`text-xs px-2 py-1 rounded mt-2 inline-block font-bold ${post.status === 'approved' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                      {post.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    {/* Approve Button (Only in Pending Tab) */}
                    {activeTab === 'pending' && (
                      <button 
                        onClick={() => handleApprove(post.id)} 
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
                      >
                        Approve
                      </button>
                    )}

                    {/* Delete Button (Always Visible) */}
                    <button 
                      onClick={() => handleDelete(post.id)} 
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}