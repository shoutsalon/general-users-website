import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Filter, X, Instagram, Facebook } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import allServicesData from '../data/allServices.json';
import locations from '../data/locations.json';

const Services = () => {
  // Always scroll to top when navigating to this page
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const filtersRef = useScrollAnimation<HTMLDivElement>();
  const servicesGridRef = useScrollAnimation<HTMLDivElement>();
  
  const handleLogoClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const navigate = useNavigate();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [discountFilter, setDiscountFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');

  const allServices = allServicesData;
  const minPrice = Math.min(...allServices.map(s => s.price));
  const maxPrice = Math.max(...allServices.map(s => s.price));
  const [lowerPrice, setLowerPrice] = useState(minPrice);
  const [upperPrice, setUpperPrice] = useState(maxPrice);

  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const categoryMatch = categoryFilter === 'all' || service.category === categoryFilter;
      const priceMatch = service.price >= lowerPrice && service.price <= upperPrice;
      const discountMatch = discountFilter === 'all' || 
        (discountFilter === 'with-discount' && service.discount > 0) ||
        (discountFilter === 'no-discount' && service.discount === 0);
      const genderMatch = genderFilter === 'all' || service.gender === genderFilter;

      return categoryMatch && priceMatch && discountMatch && genderMatch;
    });
  }, [categoryFilter, lowerPrice, upperPrice, discountFilter, genderFilter]);

  const clearFilters = () => {
    setCategoryFilter('all');
    setLowerPrice(minPrice);
    setUpperPrice(maxPrice);
    setDiscountFilter('all');
    setGenderFilter('all');
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
              <div className="flex items-center flex-shrink-0">
                <img 
                  src="./content-uploads/logo_final_2_remove_bg.png" 
                  alt="SHOUT" 
                  className="w-20 h-7 sm:w-24 sm:h-8 md:w-32 md:h-10 object-contain scale-110 sm:scale-100 cursor-pointer"
                  style={{ maxWidth: '160px' }}
                  onClick={handleLogoClick}
                />
              </div>
            </div>
            <a
              href="tel:8293957099"
              className="inline-flex items-center justify-center bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold shadow-lg flex-shrink-0 text-sm sm:text-base px-3 sm:px-4 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
              style={{ textDecoration: 'none' }}
            >
              <span className="hidden sm:inline">Book Now</span>
              <span className="sm:hidden">Book</span>
            </a>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12" ref={headerRef}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-4">All Services</h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Explore our complete range of luxury treatments and services
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8" ref={filtersRef}>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Unique Gender Toggle Switch */}
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">Gender</label>
              <div className="flex justify-center items-center">
                <div className="relative w-80 h-9 bg-slate-100 rounded-full flex items-center shadow-inner">
                  {/* All */}
                  <button
                    type="button"
                    className={`absolute left-0 top-0 h-full w-1/3 rounded-full z-10 transition-all duration-300 font-semibold border-2 border-gold-500 ${genderFilter === 'all' ? 'bg-gradient-to-r from-gold-500 to-gold-600 shadow-lg scale-105 text-white' : 'bg-slate-100 text-black'}`}
                    onClick={() => setGenderFilter('all')}
                  >
                    All
                  </button>
                  {/* Men */}
                  <button
                    type="button"
                    className={`absolute left-1/3 top-0 h-full w-1/3 rounded-full z-10 transition-all duration-300 font-semibold border-2 border-gold-500 ${genderFilter === 'Men' ? 'bg-gradient-to-r from-gold-500 to-gold-600 shadow-lg scale-105 text-white' : 'bg-slate-100 text-black'}`}
                    onClick={() => setGenderFilter('Men')}
                  >
                    Men
                  </button>
                  {/* Women */}
                  <button
                    type="button"
                    className={`absolute left-2/3 top-0 h-full w-1/3 rounded-full z-10 transition-all duration-300 font-semibold border-2 border-gold-500 ${genderFilter === 'Women' ? 'bg-gradient-to-r from-gold-500 to-gold-600 shadow-lg scale-105 text-white' : 'bg-slate-100 text-black'}`}
                    onClick={() => setGenderFilter('Women')}
                  >
                    Women
                  </button>
                  {/* Animated slider */}
                  <span
                    className={`absolute top-1 left-1 transition-all duration-300 h-7 w-1/3 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 shadow-md z-0 ${genderFilter === 'all' ? 'translate-x-0' : genderFilter === 'Men' ? 'translate-x-full' : 'translate-x-[200%]'} opacity-40`}
                  ></span>
                </div>
              </div>
            </div>
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
                  <SelectItem value="Face">Face</SelectItem>
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
                Price Range:
                <span className="ml-2 font-semibold text-gold-600"><span style={{fontFamily: 'Arial'}}>₹</span>{lowerPrice}</span>
                <span className="mx-1 text-slate-400">-</span>
                <span className="font-semibold text-gold-600"><span style={{fontFamily: 'Arial'}}>₹</span>{upperPrice}</span>
              </label>
              <div className="flex items-center space-x-4 bg-white rounded-lg px-4 py-3 shadow-inner border border-slate-200">
                <div className="flex flex-col items-center w-full">
                  <span className="mb-1 text-xs text-gold-700 font-semibold"><span style={{fontFamily: 'Arial'}}>₹</span>{lowerPrice}</span>
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={lowerPrice}
                    onChange={e => setLowerPrice(Math.min(Number(e.target.value), upperPrice))}
                    className="w-full h-2 rounded-lg appearance-none bg-slate-100 outline-none accent-gold-500 shadow-md"
                    style={{ accentColor: '#FFD700', maxWidth: 140 }}
                  />
                </div>
                <span className="mx-2 text-navy-400 font-bold">-</span>
                <div className="flex flex-col items-center w-full">
                  <span className="mb-1 text-xs text-gold-700 font-semibold"><span style={{fontFamily: 'Arial'}}>₹</span>{upperPrice}</span>
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={upperPrice}
                    onChange={e => setUpperPrice(Math.max(Number(e.target.value), lowerPrice))}
                    className="w-full h-2 rounded-lg appearance-none bg-slate-100 outline-none accent-gold-500 shadow-md"
                    style={{ accentColor: '#FFD700', maxWidth: 140 }}
                  />
                </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" ref={servicesGridRef}>
          {filteredServices.map((service, index) => (
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
                    <span className="text-xl sm:text-2xl font-bold text-gold-600"><span style={{fontFamily: 'Arial'}}>₹</span>{service.price}</span>
                    {service.originalPrice > 0 && (
                      <span className="text-base sm:text-lg text-slate-400 line-through"><span style={{fontFamily: 'Arial'}}>₹</span>{service.originalPrice}</span>
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
                  onClick={() => { window.location.href = 'tel:8293957099'; }}
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold"
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

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <img 
                  src="./content-uploads/logo_final_2_remove_bg.png" 
                  alt="SHOUT" 
                  className="w-20 h-6 sm:w-24 sm:h-8 object-contain cursor-pointer"
                  onClick={handleLogoClick}
                />
              </div>
              <p className="text-cream-200">Where luxury meets elegance in our sophisticated unisex salon experience.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-cream-100">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="text-cream-200 hover:text-gold-400 transition-colors block">Home</Link>
                <Link to="/services" className="text-cream-200 hover:text-gold-400 transition-colors block" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>All Services</Link>
                <a href="tel:8293957099" className="text-cream-200 hover:text-gold-400 transition-colors block">Book Appointment</a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibive mb-4 text-cream-100">Our Locations</h3>
              <div className="space-y-4">
                {locations && locations.length > 0 ? (
                  locations.map((location, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="text-cream-100 font-medium">{location.name}</h4>
                      <p className="text-cream-200 text-sm">{location.address}</p>
                      <p className="text-cream-200 text-sm">{location.phone}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-cream-200 text-sm">See our locations on the home page.</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-cream-100">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/shout_unisex_saloon" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-6 h-6 text-cream-200 hover:text-gold-400 cursor-pointer transition-colors" />
                </a>
                <a href="https://www.facebook.com/people/Shout-Unisex-Saloon/61578223404980/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-6 h-6 text-cream-200 hover:text-gold-400 cursor-pointer transition-colors" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-cream-200">© {new Date().getFullYear()} SHOUT. All rights reserved. | <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400">Terms of Use</a> | <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400">Privacy Policy</a> | Created and maintained by <a href="https://www.linkedin.com/in/rupamsau0010/" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-600 font-semibold">Rupam</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;
