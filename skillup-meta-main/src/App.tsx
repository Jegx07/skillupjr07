
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import Dashboard from "./components/dashboard/Dashboard";
import CareerGoals from "./components/career/CareerGoals";
import GapAnalysis from "./pages/GapAnalysis";
import Recommendations from "./pages/Recommendations";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import PersonalDetails from "./pages/PersonalDetails";
import SkillsPage from "./pages/SkillsPage";
import { UserSkillsProvider } from "./components/skills/UserSkillsContext";
import IoTDashboard from './pages/IoTDashboard';
import { ThemeProvider } from "./components/ui/ThemeProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <UserSkillsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="iot-dashboard" element={<IoTDashboard />} />
                  <Route path="skills" element={<SkillsPage />} />
                  <Route path="gap-analysis" element={<GapAnalysis />} />
                  <Route path="personal-details" element={<PersonalDetails />} />
                  <Route path="career-goals" element={<CareerGoals />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="progress" element={<Progress />} />
                  <Route path="recommendations" element={<Recommendations />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Routes>
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </UserSkillsProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
