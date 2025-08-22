import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSuccess }) => {
  const [activeRole, setActiveRole] = useState('devotee');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    batch: '',
    counsellorName: '',
    templeName: '',
    centerName: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { id: 'devotee', label: 'Devotee', icon: 'User', description: 'General community member' },
    { id: 'counsellor', label: 'Counsellor', icon: 'Users', description: 'Spiritual guidance provider' },
    { id: 'inmate', label: 'Inmate', icon: 'GraduationCap', description: 'Residential student' },
    { id: 'hod', label: 'HOD', icon: 'Crown', description: 'Head of Department' },
    { id: 'temple-president', label: 'Temple President', icon: 'Building', description: 'Temple authority' }
  ];

  const batches = [
    'Nakula',
    'Arjuna', 
    'Bhima',
    'Yudhishthir',
    'Passed Out'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if ((activeRole === 'inmate' || activeRole === 'counsellor') && !formData.batch) {
      newErrors.batch = 'Batch selection is required for this role';
    }

    // New validation fields
    if (!formData.counsellorName) {
      newErrors.counsellorName = 'Counsellor name is required';
    }

    if (!formData.templeName) {
      newErrors.templeName = 'Temple name is required';
    }

    if (!formData.centerName) {
      newErrors.centerName = 'Center name is required';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      onSuccess(activeRole);
    } catch (error) {
      setErrors({
        submit: 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Role Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Select Your Role <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-1 gap-2">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => setActiveRole(role.id)}
              className={`p-3 rounded-lg border transition-gentle text-left ${
                activeRole === role.id
                  ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={role.icon} size={16} />
                <div>
                  <div className="font-medium text-sm">{role.label}</div>
                  <div className="text-xs text-muted-foreground">{role.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Basic Information</h3>
        
        <Input
          type="text"
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          required
        />

        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="your.email@example.com"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
        />

        <Input
          type="tel"
          name="phone"
          label="Phone Number"
          placeholder="+91 9876543210"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          required
        />
      </div>

      {/* Community Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Community Information</h3>
        
        <Input
          type="text"
          name="counsellorName"
          label="Counsellor Name"
          placeholder="Enter your counsellor's name"
          value={formData.counsellorName}
          onChange={handleInputChange}
          error={errors.counsellorName}
          required
        />

        <Input
          type="text"
          name="templeName"
          label="Temple Name"
          placeholder="Enter your temple name"
          value={formData.templeName}
          onChange={handleInputChange}
          error={errors.templeName}
          required
        />

        <Input
          type="text"
          name="centerName"
          label="Center Name"
          placeholder="Enter your center name"
          value={formData.centerName}
          onChange={handleInputChange}
          error={errors.centerName}
          required
        />
      </div>

      {/* Password Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-foreground">Security</h3>
        
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
        />

        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          required
        />
      </div>

      {/* Role-Specific Fields */}
      {(activeRole === 'inmate' || activeRole === 'counsellor') && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Batch <span className="text-destructive">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {batches.map((batch) => (
              <button
                key={batch}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, batch }))}
                className={`p-3 text-sm rounded-lg border transition-gentle ${
                  formData.batch === batch
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground hover:bg-muted/50'
                }`}
              >
                {batch}
              </button>
            ))}
          </div>
          {errors.batch && (
            <p className="text-sm text-destructive">{errors.batch}</p>
          )}
        </div>
      )}

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-2">
        <Input
          type="checkbox"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleInputChange}
          className="w-4 h-4 mt-1"
        />
        <label className="text-sm text-muted-foreground">
          I accept the{' '}
          <a href="#" className="text-primary hover:text-primary/80">
            Terms and Conditions
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:text-primary/80">
            Privacy Policy
          </a>{' '}
          of SREYAS platform
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="text-sm text-destructive">{errors.acceptTerms}</p>
      )}

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-sm text-destructive">{errors.submit}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      {/* Devotional Message */}
      <div className="text-center p-4 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-lg border border-secondary/10">
        <p className="text-sm text-muted-foreground">
          "Welcome to our spiritual family! May Krishna bless your journey."
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;