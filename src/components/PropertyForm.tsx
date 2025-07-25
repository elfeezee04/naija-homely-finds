import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface PropertyFormProps {
  onSubmit: (data: any) => void;
}

const PropertyForm = ({ onSubmit }: PropertyFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: '',
    listing_type: '',
    price: '',
    location: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    area_sqm: '',
    features: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      bedrooms: parseInt(formData.bedrooms) || null,
      bathrooms: parseInt(formData.bathrooms) || null,
      area_sqm: parseInt(formData.area_sqm) || null,
      features: formData.features ? formData.features.split(',').map(f => f.trim()) : []
    };
    
    onSubmit(submitData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New Property</DialogTitle>
        <DialogDescription>
          Create a new property listing for the platform.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Property Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Modern 3-bedroom apartment"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="property_type">Property Type</Label>
            <Select value={formData.property_type} onValueChange={(value) => handleChange('property_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="duplex">Duplex</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="listing_type">Listing Type</Label>
            <Select value={formData.listing_type} onValueChange={(value) => handleChange('listing_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select listing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price (₦)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="1500000"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Lagos, Nigeria"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="123 Main Street"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={(e) => handleChange('bedrooms', e.target.value)}
              placeholder="3"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={(e) => handleChange('bathrooms', e.target.value)}
              placeholder="2"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="area_sqm">Area (sqm)</Label>
            <Input
              id="area_sqm"
              type="number"
              value={formData.area_sqm}
              onChange={(e) => handleChange('area_sqm', e.target.value)}
              placeholder="120"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Beautiful property with modern amenities..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="features">Features (comma-separated)</Label>
          <Input
            id="features"
            value={formData.features}
            onChange={(e) => handleChange('features', e.target.value)}
            placeholder="Swimming pool, Gym, Parking, Security"
          />
        </div>

        <DialogFooter>
          <Button type="submit">Add Property</Button>
        </DialogFooter>
      </form>
    </>
  );
};

export default PropertyForm;