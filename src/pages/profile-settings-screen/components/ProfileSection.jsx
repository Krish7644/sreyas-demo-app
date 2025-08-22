import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const ProfileSection = ({ profile, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile || {});
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    onUpdate(formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditMode(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        handleInputChange('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Personal Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your profile details and spiritual information
          </p>
        </div>
        {!editMode ? (
          <Button
            onClick={() => setEditMode(true)}
            iconName="Edit"
            variant="outline"
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              iconName="Save"
              size="sm"
            >
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Avatar Section */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Profile Picture
        </h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
              <Image 
                src={avatarPreview || formData?.avatar} 
                alt={formData?.spiritualName}
                className="w-full h-full object-cover"
              />
            </div>
            {editMode && (
              <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-gentle">
                <Icon name="Camera" size={16} className="text-primary-foreground" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{formData?.spiritualName}</h4>
            <p className="text-sm text-muted-foreground">{formData?.center}</p>
            {editMode && (
              <p className="text-xs text-muted-foreground mt-1">
                Click the camera icon to upload a new photo
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Spiritual Name *
            </label>
            {editMode ? (
              <Input
                value={formData?.spiritualName || ''}
                onChange={(e) => handleInputChange('spiritualName', e.target.value)}
                placeholder="Enter spiritual name"
              />
            ) : (
              <p className="text-muted-foreground">{formData?.spiritualName || 'Not provided'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Legal Name
            </label>
            {editMode ? (
              <Input
                value={formData?.legalName || ''}
                onChange={(e) => handleInputChange('legalName', e.target.value)}
                placeholder="Enter legal name"
              />
            ) : (
              <p className="text-muted-foreground">{formData?.legalName || 'Not provided'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date of Birth
            </label>
            {editMode ? (
              <Input
                type="date"
                value={formData?.dateOfBirth || ''}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            ) : (
              <p className="text-muted-foreground">
                {formData?.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : 'Not provided'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Gender
            </label>
            {editMode ? (
              <select
                value={formData?.gender || ''}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : (
              <p className="text-muted-foreground capitalize">
                {formData?.gender || 'Not provided'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              ISKCON Center
            </label>
            {editMode ? (
              <Input
                value={formData?.center || ''}
                onChange={(e) => handleInputChange('center', e.target.value)}
                placeholder="Enter ISKCON center"
              />
            ) : (
              <p className="text-muted-foreground">{formData?.center || 'Not provided'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Spiritual Information */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Spiritual Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Initiation Date
            </label>
            {editMode ? (
              <Input
                type="date"
                value={formData?.initiationDate || ''}
                onChange={(e) => handleInputChange('initiationDate', e.target.value)}
              />
            ) : (
              <p className="text-muted-foreground">
                {formData?.initiationDate ? new Date(formData.initiationDate).toLocaleDateString() : 'Not initiated'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Initiating Guru
            </label>
            {editMode ? (
              <Input
                value={formData?.initiatingGuru || ''}
                onChange={(e) => handleInputChange('initiatingGuru', e.target.value)}
                placeholder="Enter guru name"
              />
            ) : (
              <p className="text-muted-foreground">{formData?.initiatingGuru || 'Not provided'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Contact Information
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Street Address
              </label>
              {editMode ? (
                <Input
                  value={formData?.address?.street || ''}
                  onChange={(e) => handleInputChange('address.street', e.target.value)}
                  placeholder="Street address"
                />
              ) : (
                <p className="text-muted-foreground">{formData?.address?.street || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                City
              </label>
              {editMode ? (
                <Input
                  value={formData?.address?.city || ''}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                  placeholder="City"
                />
              ) : (
                <p className="text-muted-foreground">{formData?.address?.city || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                State
              </label>
              {editMode ? (
                <Input
                  value={formData?.address?.state || ''}
                  onChange={(e) => handleInputChange('address.state', e.target.value)}
                  placeholder="State"
                />
              ) : (
                <p className="text-muted-foreground">{formData?.address?.state || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                PIN Code
              </label>
              {editMode ? (
                <Input
                  value={formData?.address?.pincode || ''}
                  onChange={(e) => handleInputChange('address.pincode', e.target.value)}
                  placeholder="PIN code"
                />
              ) : (
                <p className="text-muted-foreground">{formData?.address?.pincode || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-soft">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Contact Name
            </label>
            {editMode ? (
              <Input
                value={formData?.emergencyContact?.name || ''}
                onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                placeholder="Contact name"
              />
            ) : (
              <p className="text-muted-foreground">{formData?.emergencyContact?.name || 'Not provided'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Relationship
            </label>
            {editMode ? (
              <Input
                value={formData?.emergencyContact?.relationship || ''}
                onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                placeholder="Relationship"
              />
            ) : (
              <p className="text-muted-foreground">{formData?.emergencyContact?.relationship || 'Not provided'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Phone Number
            </label>
            {editMode ? (
              <Input
                value={formData?.emergencyContact?.phone || ''}
                onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                placeholder="Phone number"
              />
            ) : (
              <p className="text-muted-foreground">{formData?.emergencyContact?.phone || 'Not provided'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;