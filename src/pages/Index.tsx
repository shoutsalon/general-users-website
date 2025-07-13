import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Clock, Instagram, Facebook, ArrowRight, Crown, Check } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import allServices from '../data/allServices.json';
import reviews from '../data/reviews.json';
import locations from '../data/locations.json';
import subscriptionPlans from '../data/subscriptionPlans.json';

const Index = () => {
  const heroRef = useScrollAnimation<HTMLElement>();
  const servicesRef = useScrollAnimation<HTMLElement>();
  const membershipsRef = useScrollAnimation<HTMLElement>();
  const reviewsRef = useScrollAnimation<HTMLElement>();
  const contactRef = useScrollAnimation<HTMLElement>();

  const heroTitleRef = useStaggeredAnimation<HTMLHeadingElement>(200);
  const heroSubtitleRef = useStaggeredAnimation<HTMLParagraphElement>(400);
  const heroButtonRef = useStaggeredAnimation<HTMLAnchorElement>(600);

  const handleLogoClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Soft scroll for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cream-50 to-gold-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-gold-200 shadow-lg">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="./content-uploads/logo_final_2_remove_bg.png"
                alt="SHOUT"
                className="w-28 h-10 sm:w-32 sm:h-10 md:w-40 md:h-12 object-contain scale-110 sm:scale-100 cursor-pointer"
                style={{ maxWidth: '160px' }}
                onClick={handleLogoClick}
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-cream-100 hover:text-gold-400 font-medium transition-colors" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</Link>
              <a href="#services" className="text-cream-100 hover:text-gold-400 font-medium transition-colors" onClick={e => handleAnchorClick(e, 'services')}>Services</a>
              <Link to="/services" className="text-cream-100 hover:text-gold-400 font-medium transition-colors">All Services</Link>
              <a href="#memberships" className="text-cream-100 hover:text-gold-400 font-medium transition-colors" onClick={e => handleAnchorClick(e, 'memberships')}>Exclusive Memberships</a>
              <a href="#contact" className="text-cream-100 hover:text-gold-400 font-medium transition-colors" onClick={e => handleAnchorClick(e, 'contact')}>Contact</a>
            </div>
            <a
              href="tel:8293957099"
              className="inline-flex items-center justify-center bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold shadow-lg rounded-md px-6 py-2 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              Book Now
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 via-navy-800/50 to-navy-900/70 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transform transition-transform duration-10000 hover:scale-110"
          style={{
            backgroundImage: `url('./content-uploads/72c64973-74b6-4dfb-8b5f-b0145483e0af.png')`
          }}
        ></div>
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" ref={heroTitleRef}>
            Where Luxury
            <span className="block text-transparent bg-gradient-to-r from-gold-400 to-cream-300 bg-clip-text pb-2">
              Meets Elegance
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 font-light text-cream-100" ref={heroSubtitleRef}>
            Experience premium grooming in our sophisticated unisex salon designed for discerning clients
          </p>
          <a
            href="tel:8293957099"
            className="inline-flex items-center justify-center bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 px-5 py-2 text-lg font-semibold shadow-2xl rounded-md transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
            ref={heroButtonRef}
          >
            Reserve Your Experience
          </a>
        </div>
      </section>

      {/* Featured Services Carousel */}
      <section id="services" className="py-20 bg-gradient-to-b from-cream-50 to-white" ref={servicesRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">Featured Services</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover our most popular treatments with exclusive offers
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {allServices.filter(service => service.featured).map((service, index) => (
                  <CarouselItem key={service.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white overflow-hidden">
                      <div className="relative">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-gold-500 text-white border-0">
                            {service.tag}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="destructive" className="bg-red-500 text-white border-0">
                            {service.discount}% OFF
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">
                          {service.name}
                        </CardTitle>
                        <CardDescription className="text-slate-600">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gold-600"><span style={{ fontFamily: 'Arial' }}>₹</span>{service.price}</span>
                            <span className="text-lg text-slate-400 line-through"><span style={{ fontFamily: 'Arial' }}>₹</span>{service.originalPrice}</span>
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
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-gold-200" />
              <CarouselNext className="right-4 bg-white/90 hover:bg-white border-gold-200" />
            </Carousel>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-gold-600 text-gold-600 hover:bg-gold-600 hover:text-white">
              <Link to="/services" className="flex items-center space-x-2">
                <span>See All Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Subscription Plans Section */}
      <section id="memberships" className="py-20 bg-navy-900" ref={membershipsRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-cream-100 mb-4">Exclusive Memberships</h2>
            <p className="text-xl text-cream-200">Unlock unlimited luxury with our premium subscription plans</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {subscriptionPlans.map((plan, idx) => (
              <div key={plan.id} className={`relative border-2 ${plan.borderColor} bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col h-full`}>
                {plan.popular && (
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
                    <Badge className="bg-gold-500 text-white px-4 py-1 text-sm font-semibold shadow-lg mb-5">Most Popular</Badge>
                  </div>
                )}
                <div className="pt-10 pb-4 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-4 shadow-lg ${plan.name === 'Bronze' ? 'border-orange-400 bg-orange-50' : plan.name === 'Silver' ? 'border-slate-400 bg-slate-50' : 'border-gold-400 bg-yellow-50'} mt-4`}>
                    <Crown className={`w-8 h-8 ${plan.name === 'Bronze' ? 'text-orange-500' : plan.name === 'Silver' ? 'text-slate-500' : 'text-gold-500'}`} />
                  </div>
                  <h3 className={`text-3xl font-bold ${plan.name === 'Bronze' ? 'text-orange-600' : plan.name === 'Silver' ? 'text-slate-600' : 'bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent'}`}>{plan.name}</h3>
                </div>

                {/* Carousel content with flex-grow to push button to bottom */}
                <div className="flex-grow flex flex-col relative">
                  <Carousel
                    opts={{ align: "start", loop: true, startIndex: 0 }}
                    plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
                    className="w-full flex-grow"
                  >
                    <CarouselContent>
                      {plan.plans.map((period, pidx) => (
                        <CarouselItem key={period.period} className="px-2">
                          <div className="p-6 flex flex-col h-full">
                            <div className="mb-4 text-center relative">
                              <div className="flex items-center justify-center gap-2">
                                <h4 className="text-xl font-semibold text-navy-900">{period.label}</h4>
                              </div>
                              {/* {period.male.discount > 0 || period.female.discount > 0 ? (
                                <Badge className="bg-red-500 text-white px-3 py-1 text-xs font-semibold animate-pulse mt-1">
                                  {period.male.discount > 0 ? `${period.male.discount}% OFF (Men)` : ''}
                                  {period.male.discount > 0 && period.female.discount > 0 ? ' | ' : ''}
                                  {period.female.discount > 0 ? `${period.female.discount}% OFF (Women)` : ''}
                                </Badge>
                              ) : null} */}
                            </div>

                            {/* Content area with flex-grow */}
                            <div className="flex-grow">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* For Men */}
                                <div>
                                  <h5 className="font-semibold text-navy-900 mb-2 flex items-center">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>For Men
                                  </h5>
                                  <ul className="space-y-2 mb-2">
                                    {period.male.services.map((service, i) => (
                                      <li key={i} className="flex items-center text-slate-600">
                                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                        <span className="text-sm">{service}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <div className="font-bold text-lg text-gold-600 mb-1">
                                    {period.male.discount > 0 ? (
                                      <>
                                        <span className="line-through text-slate-400 mr-2"><span style={{ fontFamily: 'Arial' }}>₹</span>{period.male.price}</span>
                                        <span style={{ fontFamily: 'Arial' }}>₹</span>{Math.round(period.male.price * (1 - period.male.discount / 100))}
                                      </>
                                    ) : (
                                      <><span style={{ fontFamily: 'Arial' }}>₹</span>{period.male.price}</>
                                    )}
                                  </div>
                                </div>
                                {/* For Women */}
                                <div>
                                  <h5 className="font-semibold text-navy-900 mb-2 flex items-center">
                                    <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>For Women
                                  </h5>
                                  <ul className="space-y-2 mb-2">
                                    {period.female.services.map((service, i) => (
                                      <li key={i} className="flex items-center text-slate-600">
                                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                        <span className="text-sm">{service}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <div className="font-bold text-lg text-gold-600 mb-1">
                                    {period.female.discount > 0 ? (
                                      <>
                                        <span className="line-through text-slate-400 mr-2"><span style={{ fontFamily: 'Arial' }}>₹</span>{period.female.price}</span>
                                        <span style={{ fontFamily: 'Arial' }}>₹</span>{Math.round(period.female.price * (1 - period.female.discount / 100))}
                                      </>
                                    ) : (
                                      <><span style={{ fontFamily: 'Arial' }}>₹</span>{period.female.price}</>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    {/* Repositioned carousel controls to be next to month labels */}
                    <CarouselPrevious className="absolute left-2 top-4 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 z-10" />
                    <CarouselNext className="absolute right-2 top-4 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 z-10" />
                  </Carousel>
                </div>

                {/* Button positioned at the bottom with consistent spacing */}
                <div className="p-6 pt-2 mt-auto">
                  <div className="text-center">
                    <a
                      href="tel:8293957099"
                      className={`w-full inline-flex items-center justify-center ${plan.name === 'Bronze' ? 'bg-orange-500 hover:bg-orange-600' : plan.name === 'Silver' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700'} text-white font-semibold shadow-lg rounded-md px-6 py-3 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400`}
                    >
                      Choose {plan.name}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-gold-50" ref={reviewsRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">Client Testimonials</h2>
            <p className="text-xl text-slate-600">Exceptional experiences from our valued clients</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 border-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <CardTitle className="text-lg font-semibold text-navy-900">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 italic">"{review.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white" ref={contactRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">Visit Our Locations</h2>
            <p className="text-xl text-slate-600">Our prestigious locations to serve you with excellence</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {locations.map((location, index) => (
              <Card key={index} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-navy-900 flex items-center">
                    <MapPin className="w-6 h-6 text-gold-600 mr-2" />
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-100 h-48 rounded-lg overflow-hidden">
                    <iframe
                      src={location.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${location.name}`}
                    ></iframe>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-5 h-5 text-gold-600 mr-3" />
                      {location.address}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Phone className="w-5 h-5 text-gold-600 mr-3" />
                      {location.phone}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Clock className="w-5 h-5 text-gold-600 mr-3" />
                      {location.hours}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <img
                  src="/content-uploads/logo_final_2_remove_bg.png"
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
                <Link to="/" className="text-cream-200 hover:text-gold-400 transition-colors block" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</Link>
                <Link to="/services" className="text-cream-200 hover:text-gold-400 transition-colors block">All Services</Link>
                <a href="tel:8293957099" className="text-cream-200 hover:text-gold-400 transition-colors block">Book Appointment</a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-cream-100">Our Locations</h3>
              <div className="space-y-4">
                {locations.map((location, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="text-cream-100 font-medium">{location.name}</h4>
                    <p className="text-cream-200 text-sm">{location.address}</p>
                    <p className="text-cream-200 text-sm">{location.phone}</p>
                  </div>
                ))}
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
            <p className="text-cream-200">© {new Date().getFullYear()} SHOUT. All rights reserved. | <a href="./content-uploads/terms_of_use.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400">Terms of Use</a> | <a href="./content-uploads/privacy_policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400">Privacy Policy</a> | Created and maintained by <a href="https://www.linkedin.com/in/rupamsau0010/" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-600 font-semibold">Rupam</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
