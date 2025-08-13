
import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Bell, Settings, User, LogOut, Menu, X, LayoutDashboard, PencilLine, Target, Brain, Gift, Calendar, UserCircle, Home, Activity, BarChart3, Briefcase, TrendingUp, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useTheme } from './ui/ThemeProvider';
import Switch from './ui/switch';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobalWavesBackground } from './ui/GlobalWavesBackground';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'IoT Dashboard', href: '/iot-dashboard', icon: <Activity className="h-5 w-5" /> },
    { name: 'Skills', href: '/skills', icon: <Target className="h-5 w-5" /> },
    { name: 'Gap Analysis', href: '/gap-analysis', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Career Goals', href: '/career-goals', icon: <Briefcase className="h-5 w-5" /> },
    { name: 'Profile', href: '/profile', icon: <Settings className="h-5 w-5" /> },
    { name: 'Progress', href: '/progress', icon: <TrendingUp className="h-5 w-5" /> },
    { name: 'Recommendations', href: '/recommendations', icon: <Lightbulb className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    // Simulate logout and redirect to login
    console.log('Logging out...');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Global Waves Background */}
      <GlobalWavesBackground />
      
      {/* Header */}
      <header className="border-b border-border/50 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="mr-3 p-2 hover:bg-accent/50 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-lg font-black text-primary-foreground">S</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight">
                <span className="text-foreground">
                  SkillsUp
                </span>
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse"></span>
            </Button>
            {/* Theme Switcher in Settings Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium">Dark Mode</span>
                  <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
                </div>
              </PopoverContent>
            </Popover>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/profile')}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 relative">
        {/* Backdrop Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 z-30"
              onClick={toggleSidebar}
            />
          )}
        </AnimatePresence>

        {/* Sidebar - Completely Hidden by Default, now with solid background */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-y-0 left-0 z-40 w-72 bg-card/95 backdrop-blur-sm border-r border-border/50 shadow-xl"
            >
              <div className="flex flex-col h-full bg-card/95 backdrop-blur-sm"> {/* Added backdrop blur */}
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/30 bg-card/95 backdrop-blur-sm"> {/* Added backdrop blur */}
                  <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSidebar}
                    className="p-1 hover:bg-accent/50 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4 space-y-2 mt-4 bg-card/95 backdrop-blur-sm"> {/* Added backdrop blur */}
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium relative overflow-hidden
                        ${isActive
                          ? 'bg-primary/20 border border-primary/30 text-primary shadow-lg sidebar-active-glow scale-[1.04]'
                          : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground hover:scale-[1.02]'}
                        `
                      }
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-semibold">{item.name}</span>
                    </NavLink>
                  ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-border/30 bg-card/95 backdrop-blur-sm"> {/* Added backdrop blur */}
                  <div className="text-xs text-muted-foreground text-center">SkillUp © 2024</div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 content-transition relative z-10">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

