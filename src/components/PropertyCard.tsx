import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart,
  MessageCircle,
  Phone
} from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    type: 'rent' | 'sale';
    propertyType: string;
    images: string[];
    agent: {
      name: string;
      phone: string;
    };
    featured?: boolean;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0] || '/placeholder.svg'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge 
            variant={property.type === 'rent' ? 'default' : 'secondary'}
            className="bg-primary/90 text-primary-foreground"
          >
            {property.type === 'rent' ? 'For Rent' : 'For Sale'}
          </Badge>
          {property.featured && (
            <Badge variant="secondary" className="bg-accent/90 text-accent-foreground">
              Featured
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-foreground h-8 w-8"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Price */}
        <div className="mb-2">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(property.price)}
          </span>
          {property.type === 'rent' && (
            <span className="text-sm text-muted-foreground">/month</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-foreground">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Property Features */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.area} sqm</span>
          </div>
        </div>

        {/* Agent Info */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="text-sm">
            <p className="font-medium text-foreground">{property.agent.name}</p>
            <p className="text-muted-foreground">Agent</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="default" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;