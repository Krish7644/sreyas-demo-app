import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreatePostModal = ({ isOpen, onClose, onCreatePost }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [postType, setPostType] = useState('general');
  const [privacy, setPrivacy] = useState('center');
  const [selectedQuote, setSelectedQuote] = useState('');
  const [tags, setTags] = useState('');

  const postTypeOptions = [
    { value: 'general', label: 'General Post' },
    { value: 'inspiration', label: 'Spiritual Inspiration' },
    { value: 'achievement', label: 'Achievement' },
    { value: 'question', label: 'Question' },
    { value: 'announcement', label: 'Announcement' }
  ];

  const privacyOptions = [
    { value: 'center', label: 'My Center Only' },
    { value: 'global', label: 'All ISKCON Centers' }
  ];

  const spiritualQuotes = [
    {
      text: "Chant the holy name of the Lord and be happy.",
      source: "Srila Prabhupada"
    },
    {
      text: "The highest perfection of human life is to remember Krishna at the time of death.",
      source: "Bhagavad Gita"
    },
    {
      text: "A devotee is always in the mode of unalloyed goodness.",
      source: "Srimad Bhagavatam"
    }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!postContent.trim() && !selectedImage && !selectedQuote) return;

    const newPost = {
      id: Date.now(),
      content: postContent,
      image: selectedImage,
      quote: selectedQuote ? spiritualQuotes.find(q => q.text === selectedQuote) : null,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      type: postType,
      privacy,
      timestamp: new Date(),
      author: {
        id: 'current-user',
        name: 'Arjun Patel',
        role: 'Devotee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      center: 'ISKCON Mumbai',
      likes: 0,
      comments: [],
      isLiked: false
    };

    onCreatePost(newPost);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setPostContent('');
    setSelectedImage(null);
    setPostType('general');
    setPrivacy('center');
    setSelectedQuote('');
    setTags('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-floating w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-bold text-foreground">Create Post</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Author Info */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent">
              <Image 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                alt="Your avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-heading font-semibold text-foreground">Arjun Patel</p>
              <p className="text-sm text-muted-foreground">ISKCON Mumbai • Devotee</p>
            </div>
          </div>

          {/* Post Type and Privacy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Post Type"
              options={postTypeOptions}
              value={postType}
              onChange={setPostType}
            />
            <Select
              label="Privacy"
              options={privacyOptions}
              value={privacy}
              onChange={setPrivacy}
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-2">
              What's on your mind?
            </label>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share your thoughts, experiences, or spiritual insights..."
              className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input text-foreground"
            />
          </div>

          {/* Spiritual Quote Selection */}
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-2">
              Add Spiritual Quote (Optional)
            </label>
            <select
              value={selectedQuote}
              onChange={(e) => setSelectedQuote(e.target.value)}
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input text-foreground"
            >
              <option value="">Select a quote...</option>
              {spiritualQuotes.map((quote, index) => (
                <option key={index} value={quote.text}>
                  {quote.text.substring(0, 50)}...
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-2">
              Add Image (Optional)
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {selectedImage ? (
                <div className="relative">
                  <Image 
                    src={selectedImage} 
                    alt="Selected"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setSelectedImage(null)}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ) : (
                <div>
                  <Icon name="ImagePlus" size={48} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground mb-2">Click to upload an image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button variant="outline" asChild>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      Choose Image
                    </label>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <Input
            label="Tags (Optional)"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="spiritual, inspiration, krishna (comma separated)"
            description="Add relevant tags to help others discover your post"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Globe" size={16} />
              <span>{privacy === 'center' ? 'Center Only' : 'Global'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Type" size={16} />
              <span>{postTypeOptions.find(opt => opt.value === postType)?.label}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button 
              variant="default" 
              onClick={handleSubmit}
              disabled={!postContent.trim() && !selectedImage && !selectedQuote}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;