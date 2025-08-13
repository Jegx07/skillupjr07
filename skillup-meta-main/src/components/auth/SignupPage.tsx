
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { GlobalWavesBackground } from '@/components/ui/GlobalWavesBackground';
// Firebase imports
import { auth } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'linkedin' | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store user data in Firestore
      const userData = {
        firstName,
        lastName,
        email,
        createdAt: new Date(),
        personalDetails: {
          firstName,
          lastName,
          email,
          phone: '',
          address: '',
          bio: ''
        }
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      
      // Store in localStorage for immediate access
      localStorage.setItem('personalDetails', JSON.stringify(userData.personalDetails));
      
      navigate('/personal-details');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError('Sign up failed: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth 2.0 Redirect
  const handleGoogleSignUp = () => {
    setSocialLoading('google');
    const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // TODO: Replace with your real client ID
    const redirectUri = window.location.origin + '/oauth-callback';
    const scope = 'email profile openid';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}`;
    window.location.href = url;
  };

  // LinkedIn OAuth 2.0 Redirect
  const handleLinkedInSignUp = () => {
    setSocialLoading('linkedin');
    const clientId = 'YOUR_LINKEDIN_CLIENT_ID'; // TODO: Replace with your real client ID
    const redirectUri = window.location.origin + '/oauth-callback';
    const scope = 'r_liteprofile r_emailaddress';
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-accent/10 relative">
      {/* Global Waves Background */}
      <GlobalWavesBackground />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Glowing Aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-yellow-200 to-blue-400 blur-2xl opacity-60 animate-pulse" />
              {/* Rich Rocket SVG */}
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-xl">
                <defs>
                  <linearGradient id="rocketBody" x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f472b6" />
                    <stop offset="0.5" stopColor="#fde68a" />
                    <stop offset="1" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <path d="M36 72C16.1 72 0 55.9 0 36S16.1 0 36 0s36 16.1 36 36-16.1 36-36 36zm0-64C20.6 8 8 20.6 8 36s12.6 28 28 28 28-12.6 28-28S51.4 8 36 8z" fill="url(#rocketBody)" />
                <path d="M36 48c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12zm0-20c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" fill="url(#rocketBody)" />
                <path d="M36 24c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12zm0-20c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" fill="url(#rocketBody)" />
              </svg>
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-2">
              <span className="bg-gradient-to-r from-white via-primary to-primary bg-clip-text text-transparent">
                SkillsUp
              </span>
            </h1>
            <p className="text-muted-foreground text-lg font-medium">
              Start your AI-powered skill journey today
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <Card className="bg-card border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-base">
              Join thousands improving their skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="text-red-600 text-sm font-semibold mb-2">{error}</div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">First Name</label>
                  <Input
                    placeholder=""
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Last Name</label>
                  <Input
                    placeholder=""
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 py-2">
                <input type="checkbox" id="terms" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                <label htmlFor="terms" className="text-sm font-medium">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <Button type="submit" className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center text-base mt-6">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
