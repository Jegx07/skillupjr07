import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
// Firestore and Auth imports
import { db, auth } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import FloatingLabelInput from '../components/ui/FloatingLabelInput';

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dob: '',
    bio: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Prefill from signup if available
  useEffect(() => {
    try {
      const prefill = localStorage.getItem('signupPrefill');
      if (prefill) {
        const { firstName, lastName, email } = JSON.parse(prefill);
        setFormData(prev => ({
          ...prev,
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || ''
        }));
      }
    } catch (e) {}
  }, []);

  // Listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Save personal details inside the user's document
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!user) {
      setError('You must be logged in to save your details.');
      return;
    }
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        { personalDetails: formData },
        { merge: true }
      );
      setSubmitted(true);
      setTimeout(() => navigate('/skills'), 1500);
    } catch (error) {
      setError('Error saving to Firestore: ' + error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-accent/10">
      <div className="w-full max-w-md">
        <Card className="glass glow-hover border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Personal Details</CardTitle>
            <CardDescription className="text-base">
              Please fill in your personal information to complete your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center text-green-600 font-semibold py-8">
                Details saved! Redirecting to dashboard...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="text-red-600 text-sm font-semibold mb-2">{error}</div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FloatingLabelInput
                      label="First Name"
                      value={formData.firstName}
                      onChange={e => handleChange('firstName', e.target.value)}
                      className="glass h-11"
                      required
                    />
                  </div>
                  <div>
                    <FloatingLabelInput
                      label="Last Name"
                      value={formData.lastName}
                      onChange={e => handleChange('lastName', e.target.value)}
                      className="glass h-11"
                      required
                    />
                  </div>
                </div>
                <div>
                  <FloatingLabelInput
                    label="Email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    className="glass h-11"
                    required
                  />
                </div>
                <div>
                  <FloatingLabelInput
                    label="Phone"
                    type="tel"
                    placeholder="+91-9876543210"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    className="glass h-11"
                    required
                  />
                </div>
                <div>
                  <FloatingLabelInput
                    label="Address"
                    value={formData.address}
                    onChange={e => handleChange('address', e.target.value)}
                    className="glass h-11"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <select
                      className="glass h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-6"
                      value={formData.gender}
                      onChange={e => handleChange('gender', e.target.value)}
                      required
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <FloatingLabelInput
                      label="Date of Birth"
                      type="date"
                      value={formData.dob}
                      onChange={e => handleChange('dob', e.target.value)}
                      className="glass h-11"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 text-base font-semibold glow-hover metallic-gradient text-white">
                  Save Details
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalDetails; 
