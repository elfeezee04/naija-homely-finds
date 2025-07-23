import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SearchFilters from '@/components/SearchFilters';
import PropertyCard from '@/components/PropertyCard';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

const Properties = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [activeFilters, setActiveFilters] = useState<any>(null);
  
  // Sample properties data
  const [allProperties] = useState([
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
    },
    {
      id: '4',
      title: 'Spacious 5 Bedroom House in Maitama',
      price: 120000000,
      location: 'Maitama, Abuja',
      bedrooms: 5,
      bathrooms: 4,
      area: 350,
      type: 'sale' as const,
      propertyType: 'House',
      images: ['/placeholder.svg'],
      agent: { name: 'Aisha Abdullahi', phone: '+234 804 567 8901' },
    },
    {
      id: '5',
      title: 'Affordable 1 Bedroom Apartment in Surulere',
      price: 800000,
      location: 'Surulere, Lagos',
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      type: 'rent' as const,
      propertyType: 'Apartment',
      images: ['/placeholder.svg'],
      agent: { name: 'Kemi Adebayo', phone: '+234 805 678 9012' },
    },
    {
      id: '6',
      title: 'Commercial Office Space in Central Business District',
      price: 15000000,
      location: 'CBD, Abuja',
      bedrooms: 0,
      bathrooms: 2,
      area: 200,
      type: 'rent' as const,
      propertyType: 'Office Space',
      images: ['/placeholder.svg'],
      agent: { name: 'Tunde Oladele', phone: '+234 806 789 0123' },
    },
  ]);

  // Initialize filtered properties
  useEffect(() => {
    setFilteredProperties(allProperties);
  }, []);

  // Apply sorting
  useEffect(() => {
    let sorted = [...(activeFilters ? filteredProperties : allProperties)];
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'bedrooms':
        sorted.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case 'oldest':
        sorted.reverse();
        break;
      default: // newest
        break;
    }
    
    setFilteredProperties(sorted);
  }, [sortBy, activeFilters, allProperties]);

  const handleSearch = (filters: any) => {
    setActiveFilters(filters);
    
    let filtered = allProperties.filter(property => {
      // Location filter
      if (filters.location && !property.location.toLowerCase().includes(filters.location)) {
        return false;
      }
      
      // Property type filter
      if (filters.propertyType && property.propertyType.toLowerCase() !== filters.propertyType) {
        return false;
      }
      
      // Listing type filter (rent/sale)
      if (filters.listingType && property.type !== filters.listingType) {
        return false;
      }
      
      // Price filters
      if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
        return false;
      }
      
      // Bedrooms filter
      if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) {
        return false;
      }
      
      // Bathrooms filter
      if (filters.bathrooms && property.bathrooms < parseInt(filters.bathrooms)) {
        return false;
      }
      
      return true;
    });
    
    setFilteredProperties(filtered);
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'bedrooms', label: 'Most Bedrooms' },
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Properties</h1>
              <p className="text-muted-foreground">
                Showing {filteredProperties.length} of {allProperties.length} properties
                {activeFilters && (
                  <span className="ml-2 text-primary">
                    (filtered)
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filter Toggle (Mobile) */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <SearchFilters onSearch={handleSearch} />
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-white overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    Close
                  </Button>
                </div>
                <SearchFilters onSearch={handleSearch} />
              </div>
            </div>
          )}

          {/* Properties Grid/List */}
          <div className="flex-1">
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-6'
            }>
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;