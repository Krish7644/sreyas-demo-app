import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';


const CommunityFeedPreview = ({ posts, onViewAll }) => {
  const handleLike = (postId) => {
    console.log('Like post:', postId);
  };

  const handleComment = (postId) => {
    console.log('Comment on post:', postId);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Community Feed
        </h3>
        <Button variant="ghost" size="sm" iconName="ArrowRight" onClick={onViewAll}>
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {posts?.map((post) => (
          <div key={post.id} className="p-4 rounded-lg border border-border bg-muted/20">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="User" size={20} className="text-primary" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading font-semibold text-foreground text-sm">
                    {post.author}
                  </h4>
                  <span className="text-xs text-muted-foreground font-caption">
                    {post.time}
                  </span>
                </div>
                
                <p className="text-sm text-foreground font-body mb-3">
                  {post.content}
                </p>
                
                {post.image && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <Image 
                      src={post.image} 
                      alt="Post image"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-gentle"
                  >
                    <Icon name="Heart" size={16} />
                    <span className="text-xs font-caption">{post.likes}</span>
                  </button>
                  
                  <button 
                    onClick={() => handleComment(post.id)}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-gentle"
                  >
                    <Icon name="MessageCircle" size={16} />
                    <span className="text-xs font-caption">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-gentle">
                    <Icon name="Share" size={16} />
                    <span className="text-xs font-caption">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="MessageCircle" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="font-body">No recent posts</p>
          <p className="text-xs font-caption">Be the first to share something inspiring!</p>
        </div>
      )}
    </div>
  );
};

export default CommunityFeedPreview;