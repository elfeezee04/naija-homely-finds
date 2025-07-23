import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import PostProperty from "./pages/PostProperty";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public routes with navigation */}
            <Route path="/" element={
              <>
                <Navigation />
                <Home />
              </>
            } />
            <Route path="/properties" element={
              <>
                <Navigation />
                <Properties />
              </>
            } />
            <Route path="/property/:id" element={
              <>
                <Navigation />
                <PropertyDetail />
              </>
            } />
            <Route path="/post-property" element={
              <>
                <Navigation />
                <PostProperty />
              </>
            } />
            <Route path="/messages" element={
              <>
                <Navigation />
                <Messages />
              </>
            } />
            
            {/* Auth routes without navigation */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
