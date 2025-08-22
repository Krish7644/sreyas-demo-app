import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PostCard = ({ post, onLike, onComment, onShare, onProfileView }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(post.isLiked || false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id, !isLiked);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      onComment(post.id, newComment);
      setNewComment('');
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Temple President': return 'bg-purple-100 text-purple-800';
      case 'HOD': return 'bg-blue-100 text-blue-800';
      case 'Counsellor': return 'bg-green-100 text-green-800';
      case 'Inmate': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-card border-2 border-primary/20 rounded-xl shadow-soft hover:shadow-raised transition-smooth mb-6">
      {/* Post Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start space-x-3">
          <button 
            onClick={() => onProfileView(post.author)}
            className="flex-shrink-0"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent">
              <Image 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            </div>
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <button 
                onClick={() => onProfileView(post.author)}
                className="font-heading font-semibold text-foreground hover:text-primary transition-gentle"
              >
                {post.author.name}
              </button>
              <span className={`px-2 py-1 rounded-full text-xs font-caption ${getRoleBadgeColor(post.author.role)}`}>
                {post.author.role}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{formatTimeAgo(post.timestamp)}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} />
                <span>{post.center}</span>
              </div>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Icon name="MoreHorizontal" size={20} />
          </Button>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        {post.content && (
          <p className="text-foreground mb-4 leading-relaxed">
            {post.content}
          </p>
        )}

        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <Image 
              src={post.image} 
              alt="Post content"
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        {post.quote && (
          <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg mb-4">
            <p className="text-foreground italic mb-2">"{post.quote.text}"</p>
            <p className="text-sm text-muted-foreground">— {post.quote.source}</p>
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-caption"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-gentle ${
                isLiked ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon name={isLiked ? "Heart" : "Heart"} size={20} fill={isLiked ? "currentColor" : "none"} />
              <span className="text-sm font-body">{post.likes + (isLiked && !post.isLiked ? 1 : 0)}</span>
            </button>

            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-gentle"
            >
              <Icon name="MessageCircle" size={20} />
              <span className="text-sm font-body">{post.comments.length}</span>
            </button>

            <button 
              onClick={() => onShare(post)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-gentle"
            >
              <Icon name="Share2" size={20} />
              <span className="text-sm font-body">Share</span>
            </button>
          </div>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Icon name="Bookmark" size={20} />
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-border flex-shrink-0">
                  <Image 
                    src={comment.author.avatar} 
                    alt={comment.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-body font-medium text-sm text-foreground">
                      {comment.author.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{comment.content}</p>
                </div>
              </div>
            ))}

            {/* Add Comment */}
            <div className="flex space-x-3 pt-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-border flex-shrink-0">
                <Image 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                  alt="Your avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                />
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;