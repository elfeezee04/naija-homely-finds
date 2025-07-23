import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  MapPin, 
  Home, 
  DollarSign,
  Bed,
  Bath,
  Square,
  Car,
  Shield,
  Wifi,
  Zap,
  Droplets,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PostProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: '',
    listingType: '',
    price: '',
    location: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    parking: '',
    furnished: false,
    amenities: [] as string[],
    images: [] as File[],
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const propertyTypes = [
    'Apartment', 'House', 'Duplex', 'Bungalow', 'Mansion',
    'Office Space', 'Shop', 'Warehouse', 'Land'
  ];

  const locations = [
    'Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan',
    'Benin City', 'Kaduna', 'Jos', 'Warri', 'Enugu'
  ];

  const amenitiesList = [
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'electricity', label: '24/7 Electricity', icon: Zap },
    { id: 'water', label: 'Water Supply', icon: Droplets },
    { id: 'parking', label: 'Parking Space', icon: Car },
    { id: 'gym', label: 'Gym', icon: Home },
    { id: 'pool', label: 'Swimming Pool', icon: Droplets },
    { id: 'generator', label: 'Generator', icon: Zap },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.includes(amenityId)
        ? formData.amenities.filter(id => id !== amenityId)
        : [...formData.amenities, amenityId],
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({
      ...formData,
      images: [...formData.images, ...files].slice(0, 10), // Max 10 images
    });
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Property Listed Successfully!",
        description: "Your property has been submitted for review and will be live soon.",
      });
      // Reset form or redirect
      window.location.href = '/properties';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-secondary/20 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">List Your Property</h1>
          <p className="text-muted-foreground">
            Reach thousands of potential buyers and tenants
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Provide the essential details about your property
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Luxury 3 Bedroom Apartment..."
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select 
                    value={formData.propertyType} 
                    onValueChange={(value) => handleSelectChange('propertyType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your property in detail..."
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Location & Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">City/State</Label>
                  <Select 
                    value={formData.location} 
                    onValueChange={(value) => handleSelectChange('location', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location.toLowerCase()}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="listingType">Listing Type</Label>
                  <Select 
                    value={formData.listingType} 
                    onValueChange={(value) => handleSelectChange('listingType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="For Rent or Sale" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="sale">For Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="e.g., 123 Victoria Island, Lagos"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price (₦)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Property Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Square className="h-5 w-5 text-primary" />
                Property Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms" className="flex items-center gap-2">
                    <Bed className="h-4 w-4" />
                    Bedrooms
                  </Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    min="0"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms" className="flex items-center gap-2">
                    <Bath className="h-4 w-4" />
                    Bathrooms
                  </Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    min="0"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area (sqm)</Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    min="0"
                    value={formData.area}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parking" className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Parking
                  </Label>
                  <Input
                    id="parking"
                    name="parking"
                    type="number"
                    min="0"
                    placeholder="Spaces"
                    value={formData.parking}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="furnished"
                  name="furnished"
                  checked={formData.furnished}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, furnished: checked as boolean })
                  }
                />
                <Label htmlFor="furnished">Furnished</Label>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
              <CardDescription>Select all available amenities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amenitiesList.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <div
                      key={amenity.id}
                      className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.amenities.includes(amenity.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleAmenityToggle(amenity.id)}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{amenity.label}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Property Images
              </CardTitle>
              <CardDescription>
                Upload up to 10 high-quality images of your property
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop images here, or click to browse
                </p>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  Choose Images
                </Button>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Property ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="hero" 
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Publishing...' : 'Publish Property'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostProperty;