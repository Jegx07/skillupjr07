
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { GlobalWavesBackground } from '@/components/ui/GlobalWavesBackground';
// Firebase imports
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'linkedin' | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Fetch personal details from Firestore and store in localStorage
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          // Try to get personalDetails from nested field, fallback to root fields
          let personalDetails = data.personalDetails || {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            bio: data.bio || ''
          };
          localStorage.setItem('personalDetails', JSON.stringify(personalDetails));
        }
      } catch (fetchErr) {
        // Optionally handle error, but allow login to proceed
      }
      navigate('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('No user found with this email. Please sign up.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError('Sign in failed: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth 2.0 Redirect
  const handleGoogleSignIn = () => {
    setSocialLoading('google');
    const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // TODO: Replace with your real client ID
    const redirectUri = window.location.origin + '/oauth-callback';
    const scope = 'email profile openid';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}`;
    window.location.href = url;
  };

  // LinkedIn OAuth 2.0 Redirect
  const handleLinkedInSignIn = () => {
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
                  <radialGradient id="window" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.7" />
                  </radialGradient>
                  <linearGradient id="flame" x1="36" y1="60" x2="36" y2="72" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fbbf24" />
                    <stop offset="1" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
                {/* Rocket Body */}
                <path d="M36 8c6 0 12 12 12 24 0 6-3 12-12 12s-12-6-12-12c0-12 6-24 12-24z" fill="url(#rocketBody)" stroke="#fff" strokeWidth="2"/>
                {/* Window */}
                <circle cx="36" cy="24" r="5" fill="url(#window)" stroke="#fff" strokeWidth="1.5"/>
                {/* Fins */}
                <path d="M24 44c-4 2-8 8-8 12 2-2 8-4 12-4l-4-8z" fill="#6366f1" stroke="#fff" strokeWidth="1.5"/>
                <path d="M48 44c4 2 8 8 8 12-2-2-8-4-12-4l4-8z" fill="#f472b6" stroke="#fff" strokeWidth="1.5"/>
                {/* Flame */}
                <ellipse cx="36" cy="66" rx="6" ry="8" fill="url(#flame)" className="animate-bounce"/>
                {/* Trail (animated) */}
                <rect x="33" y="60" width="6" height="16" rx="3" fill="#fde68a" opacity="0.5" className="animate-pulse"/>
              </svg>
            </div>
            <div className="relative mt-2">
              <span className="text-4xl font-extrabold tracking-tight rounded px-2 py-1 bg-gradient-to-r from-pink-500 via-yellow-400 to-primary bg-clip-text text-transparent font-[Poppins,sans-serif] shadow-lg inline-block acoustic-wordmark">
                SkillsUp
                <span className="absolute left-0 top-0 w-full h-full pointer-events-none animate-shine" style={{background: 'linear-gradient(120deg, transparent 0%, #fff8 50%, transparent 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: 0.7}}></span>
              </span>
            </div>
            <p className="text-muted-foreground text-lg font-medium">
              AI-powered skill gap analysis platform
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-card border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-base">
              Sign in to continue your skill journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="text-red-600 text-sm font-semibold mb-2">{error}</div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
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
                  className="h-12 text-base"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-pink-500 via-yellow-400 to-primary shadow-xl border-0 text-white transition-all duration-200 hover:shadow-[0_0_16px_4px_rgba(255,0,128,0.4),0_0_32px_8px_rgba(255,255,0,0.2)] hover:scale-105 focus:shadow-[0_0_24px_8px_rgba(255,0,128,0.5)]"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground font-medium">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-12 border-2 border-pink-400 hover:border-primary/80 hover:bg-pink-50 text-pink-700 font-semibold flex items-center justify-center"
                onClick={handleGoogleSignIn}
                disabled={socialLoading === 'google'}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {socialLoading === 'google' ? 'Signing in...' : 'Google'}
              </Button>
              <Button
                variant="outline"
                className="h-12 border-2 border-blue-500 hover:border-primary/80 hover:bg-blue-50 text-blue-700 font-semibold flex items-center justify-center"
                onClick={handleLinkedInSignIn}
                disabled={socialLoading === 'linkedin'}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                {socialLoading === 'linkedin' ? 'Signing in...' : 'LinkedIn'}
              </Button>
            </div>

            <div className="text-center text-base mt-6">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/signup" className="text-primary hover:underline font-semibold">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
