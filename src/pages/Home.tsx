import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SearchFilters from '@/components/SearchFilters';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';
import { 
  Home as HomeIcon, 
  Users, 
  MapPin, 
  Star,
  TrendingUp,
  Shield,
  HeadphonesIcon,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-bg.jpg';

const Home = () => {
  const [searchFilters, setSearchFilters] = useState({});

  // Sample featured properties
  const featuredProperties = [
    {
      id: '1',
      title: 'Luxury 3 Bedroom Apartment in Victoria Island',
      price: 2500000,
      location: 'Victoria Island, Lagos',
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      type: 'rent' as const,
      propertyType: 'Apartment',
      images: ['/placeholder.svg'],
      agent: { name: 'Adewale Johnson', phone: '+234 801 234 5678' },
      featured: true,
    },
    {
      id: '2',
      title: 'Modern 4 Bedroom Duplex in Lekki',
      price: 85000000,
      location: 'Lekki Phase 1, Lagos',
      bedrooms: 4,
      bathrooms: 3,
      area: 200,
      type: 'sale' as const,
      propertyType: 'Duplex',
      images: ['/placeholder.svg'],
      agent: { name: 'Funmi Okafor', phone: '+234 802 345 6789' },
      featured: true,
    },
    {
      id: '3',
      title: 'Executive 2 Bedroom Flat in Ikoyi',
      price: 1800000,
      location: 'Ikoyi, Lagos',
      bedrooms: 2,
      bathrooms: 2,
      area: 90,
      type: 'rent' as const,
      propertyType: 'Apartment',
      images: ['/placeholder.svg'],
      agent: { name: 'Emeka Chukwu', phone: '+234 803 456 7890' },
      featured: true,
    },
  ];

  const stats = [
    { icon: HomeIcon, label: 'Properties Listed', value: '2,500+' },
    { icon: Users, label: 'Happy Customers', value: '1,200+' },
    { icon: MapPin, label: 'Cities Covered', value: '15+' },
    { icon: Star, label: 'Average Rating', value: '4.9' },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Get real-time market data and property trends to make informed decisions.'
    },
    {
      icon: Shield,
      title: 'Verified Listings',
      description: 'All properties are verified by our team to ensure authenticity and quality.'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Our dedicated support team is available round the clock to assist you.'
    },
  ];

  const handleSearch = (filters: any) => {
    setSearchFilters(filters);
    // Navigate to properties page with filters as URL params
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) searchParams.append(key, value as string);
    });
    window.location.href = `/properties?${searchParams.toString()}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find Your Perfect Home in Nigeria
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover thousands of verified properties across Nigeria. From luxury apartments 
            to affordable homes, find your dream property with trusted agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/properties">
                Browse Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white hover:text-foreground">
              <Link to="/post-property">List Your Property</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4">
          <SearchFilters onSearch={handleSearch} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Properties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties across Nigeria's major cities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/properties">
                View All Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Naija Homely Finds?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the most comprehensive and reliable real estate platform in Nigeria.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied customers who found their perfect property through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/register">Get Started Today</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/properties">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;