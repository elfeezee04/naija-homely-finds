import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Car,
  Shield,
  Wifi,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Sample property data - in real app, fetch based on ID
  const property = {
    id: '1',
    title: 'Luxury 3 Bedroom Apartment in Victoria Island',
    price: 2500000,
    location: 'Victoria Island, Lagos',
    address: '45 Ahmadu Bello Way, Victoria Island, Lagos',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    parking: 2,
    type: 'rent' as const,
    propertyType: 'Apartment',
    furnished: true,
    yearBuilt: 2020,
    description: `This stunning luxury apartment offers modern living in the heart of Victoria Island. 
    The spacious 3-bedroom unit features contemporary finishes, panoramic city views, and access to 
    premium amenities including a swimming pool, gym, and 24/7 security. Perfect for professionals 
    and families seeking comfort and convenience in Lagos' business district.`,
    features: [
      'Air Conditioning in all rooms',
      'Fitted Kitchen with modern appliances',
      'Swimming Pool access',
      'Gym and Fitness Center',
      '24/7 Security',
      'Power backup generator',
      'High-speed internet ready',
      'Covered parking spaces',
      'Elevator access',
      'Laundry facilities'
    ],
    amenities: [
      { icon: Shield, label: 'Security' },
      { icon: Wifi, label: 'WiFi' },
      { icon: Zap, label: '24/7 Electricity' },
      { icon: Car, label: 'Parking' }
    ],
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
    ],
    agent: {
      name: 'Adewale Johnson',
      phone: '+234 801 234 5678',
      email: 'adewale@example.com',
      company: 'Premium Properties Ltd',
      verified: true,
      rating: 4.8,
      properties: 45
    },
    posted: '2024-01-15',
    views: 1250,
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link to="/properties">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative h-96">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/80 hover:bg-white"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className={`w-20 h-16 object-cover rounded cursor-pointer border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={property.type === 'rent' ? 'default' : 'secondary'}>
                        {property.type === 'rent' ? 'For Rent' : 'For Sale'}
                      </Badge>
                      <Badge variant="outline">{property.propertyType}</Badge>
                      {property.furnished && (
                        <Badge variant="secondary">Furnished</Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl mb-2">{property.title}</CardTitle>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.address}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(property.price)}
                    </div>
                    {property.type === 'rent' && (
                      <div className="text-sm text-muted-foreground">/month</div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Bed className="h-5 w-5 text-muted-foreground" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bath className="h-5 w-5 text-muted-foreground" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Square className="h-5 w-5 text-muted-foreground" />
                    <span>{property.area} sqm</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <span>{property.parking} Parking</span>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </div>

                <Separator />

                {/* Features */}
                <div>
                  <h3 className="font-semibold mb-3">Features & Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Property Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Year Built:</span>
                    <div className="font-medium">{property.yearBuilt}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Posted:</span>
                    <div className="font-medium">{property.posted}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Views:</span>
                    <div className="font-medium">{property.views.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {property.agent.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {property.agent.name}
                      {property.agent.verified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {property.agent.company}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ⭐ {property.agent.rating} • {property.agent.properties} properties
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" variant="hero">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Agent
                  </Button>
                  <Button className="w-full" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>📞 {property.agent.phone}</p>
                  <p>✉️ {property.agent.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  Schedule Viewing
                </Button>
                <Button variant="outline" className="w-full">
                  Request Info
                </Button>
                <Button variant="outline" className="w-full">
                  Calculate Mortgage
                </Button>
              </CardContent>
            </Card>

            {/* Property Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Property Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Listed:</span>
                  <span>{property.posted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Views:</span>
                  <span>{property.views.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property ID:</span>
                  <span>#{property.id}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;