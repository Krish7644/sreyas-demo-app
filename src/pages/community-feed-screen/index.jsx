import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PostCard from './components/PostCard';
import CreatePostModal from './components/CreatePostModal';
import FilterSidebar from './components/FilterSidebar';
import ProfileModal from './components/ProfileModal';
import SearchBar from './components/SearchBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommunityFeedScreen = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    postType: 'all',
    center: 'all',
    role: 'all'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for posts
  const mockPosts = [
    {
      id: 1,
      author: {
        id: 'user1',
        name: 'Radha Devi',
        role: 'Temple President',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      content: `Beautiful kirtan session today at the temple! The devotees were so absorbed in chanting the holy names. \n\nIt's amazing how the maha-mantra can transform our consciousness and bring us closer to Krishna. Hare Krishna everyone! 🙏`,
      image: 'https://images.pexels.com/photos/8636707/pexels-photo-8636707.jpeg?auto=compress&cs=tinysrgb&w=800',center: 'ISKCON Mumbai',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 45,
      comments: [
        {
          id: 1,
          author: {
            name: 'Krishna Das',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          },
          content: 'Hare Krishna! Wish I could have joined. The energy must have been divine!',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
        }
      ],
      tags: ['kirtan', 'temple', 'spiritual'],
      type: 'inspiration',
      isLiked: false
    },
    {
      id: 2,
      author: {
        id: 'user2',name: 'Arjun Patel',role: 'Devotee',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      content: `Completed my 16 rounds of japa today with full concentration! \n\nThe mind was trying to wander, but I kept bringing it back to the holy names. Each round felt like a step closer to Krishna. \n\nHow was your japa practice today, devotees?`,
      quote: {
        text: "Chant the holy name of the Lord and be happy.",
        source: "Srila Prabhupada"
      },
      center: 'ISKCON Delhi',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 28,
      comments: [
        {
          id: 1,
          author: {
            name: 'Gopi Devi',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
          },
          content: 'Inspiring! I managed 12 rounds today. Working towards 16 like you!',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)
        },
        {
          id: 2,
          author: {
            name: 'Bhakta Ram',avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
          },
          content: 'Hare Krishna! My japa was good today too. 14 rounds with focus.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
        }
      ],
      tags: ['japa', 'sadhana', 'meditation'],
      type: 'achievement',
      isLiked: true
    },
    {
      id: 3,
      author: {
        id: 'user3',name: 'Govinda Das',role: 'Counsellor',avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
      },
      content: `Question for the community: How do you maintain enthusiasm in your spiritual practice during challenging times? \n\nI've been counselling some devotees who are struggling with consistency in their sadhana. Would love to hear your experiences and tips!`,
      center: 'ISKCON Bangalore',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 67,
      comments: [
        {
          id: 1,
          author: {
            name: 'Sita Devi',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
          },
          content: 'Association with devotees always helps me. Also reading Srila Prabhupada\'s books daily.',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)
        }
      ],
      tags: ['question', 'counselling', 'sadhana'],
      type: 'question',
      isLiked: false
    },
    {
      id: 4,
      author: {
        id: 'user4',
        name: 'Vrinda Devi',
        role: 'HOD',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
      },
      content: `🎉 Exciting announcement! We're organizing a special Janmashtami celebration next month. \n\nWe need volunteers for:\n• Decoration team\n• Prasadam preparation\n• Cultural programs\n• Guest coordination\n\nPlease comment below if you'd like to participate. Let's make this celebration memorable!`,image: 'https://images.pexels.com/photos/6896379/pexels-photo-6896379.jpeg?auto=compress&cs=tinysrgb&w=800',center: 'ISKCON Vrindavan',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 89,
      comments: [
        {
          id: 1,
          author: {
            name: 'Madhav Das',avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face'
          },
          content: 'Count me in for the decoration team! Hare Krishna!',
          timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000)
        }
      ],
      tags: ['janmashtami', 'celebration', 'volunteer'],
      type: 'announcement',
      isLiked: true
    },
    {
      id: 5,
      author: {
        id: 'user5',name: 'Nitai Das',role: 'Inmate',avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
      },
      content: `Just finished reading Chapter 7 of Bhagavad Gita. The knowledge about Krishna's opulences is so profound! \n\nEvery verse reveals new depths of understanding. Grateful to Srila Prabhupada for his purports that make these teachings accessible to us.`,
      quote: {
        text: "I am the taste in water, the light in the moon and sun, the sound in ether and ability in man.",
        source: "Bhagavad Gita 7.8"
      },
      center: 'ISKCON Mayapur',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      likes: 34,
      comments: [],
      tags: ['bhagavad-gita', 'study', 'knowledge'],
      type: 'inspiration',
      isLiked: false
    }
  ];

  // Trending topics mock data
  const trendingTopics = [
    { tag: 'janmashtami', count: 156 },
    { tag: 'japa', count: 89 },
    { tag: 'kirtan', count: 67 },
    { tag: 'bhagavad-gita', count: 45 },
    { tag: 'temple-service', count: 34 },
    { tag: 'spiritual-growth', count: 28 }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = posts;

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.postType !== 'all') {
      filtered = filtered.filter(post => post.type === filters.postType);
    }
    if (filters.center !== 'all') {
      filtered = filtered.filter(post => post.center.toLowerCase().includes(filters.center));
    }
    if (filters.role !== 'all') {
      filtered = filtered.filter(post => post.author.role === filters.role);
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, filters]);

  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId, isLiked) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + (isLiked ? 1 : -1), isLiked }
        : post
    ));
  };

  const handleComment = (postId, comment) => {
    const newComment = {
      id: Date.now(),
      author: {
        name: 'You',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      content: comment,
      timestamp: new Date()
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
  };

  const handleShare = (post) => {
    // Mock share functionality
    console.log('Sharing post:', post);
  };

  const handleProfileView = (user) => {
    setSelectedUser(user);
    setIsProfileModalOpen(true);
  };

  const handleMessage = (user) => {
    navigate('/communication-hub-screen', { state: { startChat: user } });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'reset') {
      setFilters({
        postType: 'all',
        center: 'all',
        role: 'all'
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  const handleTopicClick = (topic) => {
    setSearchQuery(topic);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading community feed...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <SearchBar 
              onSearch={handleSearch}
              onCreatePost={() => setIsCreatePostModalOpen(true)}
            />

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="MessageCircle" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    No posts found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || filters.postType !== 'all' || filters.center !== 'all' || filters.role !== 'all' ?'Try adjusting your search or filters' :'Be the first to share something with the community!'
                    }
                  </p>
                  <Button 
                    variant="default" 
                    onClick={() => setIsCreatePostModalOpen(true)}
                  >
                    Create First Post
                  </Button>
                </div>
              ) : (
                filteredPosts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                    onProfileView={handleProfileView}
                  />
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              trendingTopics={trendingTopics}
              onTopicClick={handleTopicClick}
              className="sticky top-24"
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onCreatePost={handleCreatePost}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={selectedUser}
        onMessage={handleMessage}
      />

      {/* Floating Action Button for Mobile */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <Button
          variant="default"
          size="icon"
          className="w-14 h-14 rounded-full shadow-floating"
          onClick={() => setIsCreatePostModalOpen(true)}
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default CommunityFeedScreen;