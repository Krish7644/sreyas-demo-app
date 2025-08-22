import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-card rounded-2xl shadow-floating max-w-md w-full animate-slide-up">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground">
                  Reset Password
                </h2>
                <p className="text-sm text-muted-foreground">
                  We'll send you a reset link
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-gentle"
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                required
              />

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  Enter the email address associated with your SREYAS account and we'll send you a link to reset your password.
                </p>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="Check" size={32} className="text-success" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Reset Link Sent!
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
              <div className="bg-success/10 rounded-lg p-4">
                <p className="text-sm text-success">
                  Please check your email (including spam folder) and follow the instructions to reset your password.
                </p>
              </div>
              <Button
                onClick={onClose}
                className="w-full"
              >
                Got it, thanks!
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;