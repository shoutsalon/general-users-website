import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Filter, X } from 'lucide-react';

const Services = () => {
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [discountFilter, setDiscountFilter] = useState('all');
  const [allServices, setAllServices] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [lowerPrice, setLowerPrice] = useState(0);
  const [upperPrice, setUpperPrice] = useState(300);

  useEffect(() => {
    fetch('https://young-unit-f3c4.rajlm10bar.workers.dev/allProducts')
      .then(res => res.json())
      .then(data => {
        setAllServices(data);
        const prices = data.map((s: any) => s.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setMinPrice(min);
        setMaxPrice(max);
        setLowerPrice(min);
        setUpperPrice(max);
      });
  }, []);

  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const categoryMatch = categoryFilter === 'all' || service.category === categoryFilter;
      const priceMatch = service.price >= lowerPrice && service.price <= upperPrice;
      const discountMatch = discountFilter === 'all' || 
        (discountFilter === 'with-discount' && service.discount > 0) ||
        (discountFilter === 'no-discount' && service.discount === 0);
      
      return categoryMatch && priceMatch && discountMatch;
    });
  }, [categoryFilter, lowerPrice, upperPrice, discountFilter]);

  const clearFilters = () => {
    setCategoryFilter('all');
    setLowerPrice(minPrice);
    setUpperPrice(maxPrice);
    setDiscountFilter('all');
  };

  const handleBookService = (service: any) => {
    navigate('/book-appointment', { 
      state: { 
        prefilledService: service.name,
        prefilledGender: service.gender
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cream-50 to-gold-50">
      {/* Header - Fixed for mobile */}
      <header className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-gold-200 shadow-lg">
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
              <Button asChild variant="ghost" size="sm" className="text-cream-100 hover:text-gold-400 flex-shrink-0">
                <Link to="/" className="flex items-center space-x-1 sm:space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden xs:inline">Back to Home</span>
                  <span className="xs:hidden">Back</span>
                </Link>
              </Button>
              <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-gold-400 to-cream-300 bg-clip-text text-transparent truncate">
                LuxeSalon
              </div>
            </div>
            <Button asChild className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold shadow-lg flex-shrink-0 text-sm sm:text-base px-3 sm:px-4 py-2">
              <Link to="/book-appointment">
                <span className="hidden sm:inline">Book Now</span>
                <span className="sm:hidden">Book</span>
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-4">All Services</h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Explore our complete range of luxury treatments and services
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-navy-900 flex items-center">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gold-600" />
              Filters
            </h3>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-slate-600 hover:text-navy-900">
              <X className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Clear All</span>
              <span className="sm:hidden">Clear</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Hair">Hair</SelectItem>
                  <SelectItem value="Skincare">Skincare</SelectItem>
                  <SelectItem value="Nails">Nails</SelectItem>
                  <SelectItem value="Grooming">Grooming</SelectItem>
                  <SelectItem value="Spa">Spa</SelectItem>
                  <SelectItem value="Beauty">Beauty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Price Range: ${lowerPrice} - ${upperPrice}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={lowerPrice}
                  onChange={e => setLowerPrice(Math.min(Number(e.target.value), upperPrice))}
                  className="w-full accent-gold-500"
                  style={{ maxWidth: 120 }}
                />
                <span>-</span>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={upperPrice}
                  onChange={e => setUpperPrice(Math.max(Number(e.target.value), lowerPrice))}
                  className="w-full accent-gold-500"
                  style={{ maxWidth: 120 }}
                />
              </div>
            </div>

            {/* Discount Filter */}
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">Offers</label>
              <Select value={discountFilter} onValueChange={setDiscountFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by offers" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="with-discount">With Discount</SelectItem>
                  <SelectItem value="no-discount">Regular Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <Card key={service.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white overflow-hidden">
              <div className="relative">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-navy-500 text-white border-0">
                    {service.tag}
                  </Badge>
                </div>
                {service.discount > 0 && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="destructive" className="bg-red-500 text-white border-0">
                      {service.discount}% OFF
                    </Badge>
                  </div>
                )}
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">
                  {service.name}
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl font-bold text-gold-600">${service.price}</span>
                    {service.originalPrice > 0 && (
                      <span className="text-base sm:text-lg text-slate-400 line-through">${service.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-navy-200 text-navy-800 text-xs">
                      {service.category}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${service.gender === 'Men' ? 'border-blue-300 text-blue-700' : 'border-pink-300 text-pink-700'}`}>
                      {service.gender}
                    </Badge>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold"
                  onClick={() => handleBookService(service)}
                >
                  Book This Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">No services match your current filters.</p>
            <Button onClick={clearFilters} className="mt-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
