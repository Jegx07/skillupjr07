import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Switch from '@/components/ui/switch';
import { User, Mail, Phone, MapPin, Upload, Settings, Shield } from 'lucide-react';
import { auth, db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

console.log('Profile page loaded');
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    company: '',
    role: '',
    gender: '',
    dob: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      const user = auth.currentUser;
      if (!user) {
        setError('You must be logged in to view your profile.');
        setLoading(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          const personalDetails = data.personalDetails || data;
          setProfile(prev => ({
            ...prev,
            firstName: personalDetails.firstName || '',
            lastName: personalDetails.lastName || '',
            email: personalDetails.email || '',
            phone: personalDetails.phone || '',
            location: personalDetails.address || '',
            bio: personalDetails.bio || '',
            company: personalDetails.company || '',
            role: personalDetails.role || '',
            gender: personalDetails.gender || '',
            dob: personalDetails.dob || ''
          }));
        } else {
          setError('User data not found in database.');
        }
      } catch (e) {
        setError('Error fetching user data. Check console for details.');
        console.error('Error fetching user data:', e);
      } finally {
        setLoading(false);
      }
    };
    // If user is not immediately available, listen for auth state
    if (!auth.currentUser) {
      const unsubscribe = auth.onAuthStateChanged(() => {
        fetchProfile();
        unsubscribe();
      });
    } else {
      fetchProfile();
    }
  }, []);

  const skills = ['JavaScript', 'React', 'Python', 'Node.js', 'AWS', 'SQL'];

  // Add handler for input changes in edit mode
  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Add handler for saving changes
  const handleSave = async () => {
    setLoading(true);
    setError('');
    const user = auth.currentUser;
    if (!user) {
      setError('You must be logged in to update your profile.');
      setLoading(false);
      return;
    }
    try {
      const personalDetails = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        address: profile.location,
        bio: profile.bio,
        company: profile.company,
        role: profile.role,
        gender: profile.gender,
        dob: profile.dob
      };
      await setDoc(doc(db, 'users', user.uid), { personalDetails }, { merge: true });
      setIsEditing(false);
    } catch (e) {
      setError('Error saving profile. Check console for details.');
      console.error('Error saving profile:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600 font-semibold text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass p-6 rounded-2xl border border-border/50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chrome bg-clip-text text-transparent mb-2">
          Your Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and personal information
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card className="glass glow-hover">
            <CardHeader className="text-center">
              <div className="w-24 h-24 chrome-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-background" />
              </div>
              <CardTitle>{profile.firstName} {profile.lastName}</CardTitle>
              <CardDescription>{profile.role} at {profile.company}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full glow-hover">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4" />
                  {profile.phone}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Your Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="glass">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="glass glass-hover"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    value={profile.firstName}
                    disabled={!isEditing}
                    className="glass"
                    onChange={e => isEditing && handleProfileChange('firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    value={profile.lastName}
                    disabled={!isEditing}
                    className="glass"
                    onChange={e => isEditing && handleProfileChange('lastName', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  value={profile.email}
                  disabled={!isEditing}
                  className="glass"
                  onChange={e => isEditing && handleProfileChange('email', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={profile.phone}
                    disabled={!isEditing}
                    className="glass"
                    onChange={e => isEditing && handleProfileChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    value={profile.location}
                    disabled={!isEditing}
                    className="glass"
                    onChange={e => isEditing && handleProfileChange('location', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <Input
                    value={profile.gender || ''}
                    disabled={!isEditing}
                    className="glass"
                    onChange={e => isEditing && handleProfileChange('gender', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <Input
                    value={profile.dob || ''}
                    disabled={!isEditing}
                    className="glass"
                    onChange={e => isEditing && handleProfileChange('dob', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  value={profile.bio}
                  disabled={!isEditing}
                  className="glass min-h-[100px]"
                  onChange={e => isEditing && handleProfileChange('bio', e.target.value)}
                />
              </div>
              {isEditing && (
                <Button className="w-full glow-hover" onClick={handleSave}>
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive updates about your progress</div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weekly Reports</div>
                  <div className="text-sm text-muted-foreground">Get weekly learning summaries</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Course Recommendations</div>
                  <div className="text-sm text-muted-foreground">AI-powered course suggestions</div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full glass glass-hover">
                Change Password
              </Button>
              <Button variant="outline" className="w-full glass glass-hover">
                Two-Factor Authentication
              </Button>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
