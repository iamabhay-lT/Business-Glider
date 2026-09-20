'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Store, Search, MapPin, Star, ShieldCheck, 
  MessageCircle, ExternalLink, Filter, ArrowUpRight, 
  CheckCircle2, X, Plus, Sparkles, DollarSign, Mail, Phone 
} from 'lucide-react';
import LightNav from '@/components/explore-light/LightNav';
import WhatsAppFloat from '@/components/explore-light/WhatsAppFloat';
import { Vendor } from '@/lib/types';
import { useVendors, PlatformStore } from '@/lib/services/platform-store';
import { POPULAR_VENDOR_CATEGORIES } from '@/lib/data/categories';

function VendorsContent() {
  const searchParams = useSearchParams();

  const paramQ = searchParams ? (searchParams.get('q') || '') : '';
  const paramLocation = searchParams ? (searchParams.get('location') || '') : '';
  const paramCategory = searchParams ? (searchParams.get('category') || '') : '';

  const vendors = useVendors();
  const [userQuery, setUserQuery] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [userCategory, setUserCategory] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number>(0);

  const searchQuery = userQuery !== null ? userQuery : paramQ;
  const locationFilter = userLocation !== null ? userLocation : paramLocation;
  const categoryFilter = userCategory !== null ? userCategory : paramCategory;

  const setSearchQuery = (val: string) => setUserQuery(val);
  const setLocationFilter = (val: string) => setUserLocation(val);
  const setCategoryFilter = (val: string) => setUserCategory(val);

  // Quote Request Modal
  const [selectedVendorForQuote, setSelectedVendorForQuote] = useState<Vendor | null>(null);
  const [quoteSenderName, setQuoteSenderName] = useState('');
  const [quoteSenderEmail, setQuoteSenderEmail] = useState('');
  const [quoteSenderPhone, setQuoteSenderPhone] = useState('+91 89793 93003');
  const [quoteDetails, setQuoteDetails] = useState('');
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      if (!v) return false;

      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = (v.name || '').toLowerCase().includes(q);
        const matchDesc = ((v as any).description || v.about || '').toLowerCase().includes(q);
        const services = Array.isArray(v.services) ? v.services : [];
        const matchService = services.some(s => typeof s === 'string' && s.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchService) return false;
      }

      if (locationFilter && locationFilter.trim()) {
        const loc = locationFilter.toLowerCase().trim();
        const vLoc = (v.location || '').toLowerCase();
        if (!vLoc.includes(loc)) return false;
      }

      if (categoryFilter && categoryFilter.trim()) {
        const cat = categoryFilter.toLowerCase().trim();
        const vCat = (v.category || '').toLowerCase();
        if (!vCat.includes(cat)) return false;
      }

      if (minRating > 0 && typeof v.rating === 'number' && v.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [vendors, searchQuery, locationFilter, categoryFilter, minRating]);

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSuccess(true);
    setTimeout(() => {
      setQuoteSuccess(false);
      setSelectedVendorForQuote(null);
      setQuoteDetails('');
    }, 2000);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setCategoryFilter('');
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-indigo-100 relative">
      <LightNav />

      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Store className="w-3.5 h-3.5" />
              <span>B2B Business Services</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-950">
              Verified Business Vendors
            </h1>
            <p className="text-sm md:text-base text-slate-500 mt-2 max-w-2xl">
              Source top-rated IT providers, marketing agencies, consultants, and contractors vetted by Business Glider.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/register-vendor"
              className="px-5 py-3 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register as Vendor</span>
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 bg-white rounded-3xl p-5 shadow-sm border border-slate-200/70 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-4 flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200/60 focus-within:border-indigo-400 focus-within:bg-white transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service or vendor are you looking for?"
                className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Location Input */}
            <div className="md:col-span-3 flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200/60 focus-within:border-indigo-400 focus-within:bg-white transition-all">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                placeholder="City or State (e.g. Delhi, Mumbai)"
                className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>

            {/* Category Select */}
            <div className="md:col-span-3 flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-3 border border-slate-200/60 focus-within:border-indigo-400 focus-within:bg-white transition-all">
              <Store className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-900 outline-none cursor-pointer"
              >
                <option value="">All Vendor Sectors</option>
                {POPULAR_VENDOR_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="md:col-span-2 flex items-center">
              {searchQuery || locationFilter || categoryFilter || minRating > 0 ? (
                <button
                  onClick={clearAllFilters}
                  className="w-full py-3 px-4 rounded-2xl bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" /> Reset
                </button>
              ) : (
                <div className="w-full text-center py-3 text-xs text-slate-400 font-medium">
                  {filteredVendors.length} Verified Vendors
                </div>
              )}
            </div>
          </div>

          {/* Category Filter Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-semibold tracking-wider uppercase text-[10px] mr-1">Popular:</span>
            {['All', 'Web Development', 'Digital Marketing', 'Corporate Legal', 'Logistics', 'Security'].map((cat) => {
              const active = (cat === 'All' && !categoryFilter) || categoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat === 'All' ? '' : cat)}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    active
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}

            <span className="text-slate-400 font-semibold tracking-wider uppercase text-[10px] ml-4 mr-1">Rating:</span>
            {[
              { label: 'Any Rating', val: 0 },
              { label: '4.5+ ★', val: 4.5 },
              { label: '4.8+ ★', val: 4.8 },
            ].map((r) => {
              const active = minRating === r.val;
              return (
                <button
                  key={r.label}
                  onClick={() => setMinRating(r.val)}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    active
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-slate-900">
              Verified Partners ({filteredVendors.length})
            </h2>
            {categoryFilter && (
              <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-semibold">
                Filtering: {categoryFilter}
              </span>
            )}
          </div>

          {filteredVendors.length === 0 ? (
            vendors.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/70 max-w-xl mx-auto my-12 shadow-sm">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Store className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No vendors available yet</h3>
                <p className="text-xs md:text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
                  Verified suppliers, agencies, and professional services will appear here once registered.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/register-vendor"
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                  >
                    Register as Vendor
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/70 max-w-xl mx-auto my-12">
                <Store className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900">No matching vendors found</h3>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                  Try searching for other keywords, location names, or reset filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => {
                const whatsappChatUrl = `https://wa.me/${vendor.phone.replace(/[^0-9]/g, '') || '918979393003'}?text=${encodeURIComponent(
                  `Hello ${vendor.name}, I found your listing on Business Glider and would like to inquire about your ${vendor.category} services.`
                )}`;

                return (
                  <div
                    key={vendor.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200/70 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-950/5 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                          {vendor.category}
                        </span>
                        {vendor.verified && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            Verified Partner
                          </span>
                        )}
                      </div>

                      {/* Business Name */}
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                        {vendor.name}
                      </h3>

                      {/* Rating & Location */}
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                        <div className="flex items-center gap-1 text-amber-600 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{(vendor.rating || 5).toFixed(1)}</span>
                          <span className="text-slate-400 font-normal">({vendor.reviewCount ?? vendor.reviewsCount ?? 0})</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1 truncate">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{vendor.location}</span>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Starting from {vendor.startingPrice || '₹25,000'}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                        {vendor.description || vendor.about}
                      </p>

                      {/* Services Chips */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {vendor.services.slice(0, 3).map((serv) => (
                          <span
                            key={serv}
                            className="text-[10px] font-medium bg-slate-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-100"
                          >
                            {serv}
                          </span>
                        ))}
                        {vendor.services.length > 3 && (
                          <span className="text-[10px] text-slate-400 px-1 py-0.5">
                            +{vendor.services.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedVendorForQuote(vendor)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors text-center"
                      >
                        Request Quote
                      </button>

                      <a
                        href={whatsappChatUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-sm"
                        title="Direct WhatsApp Chat"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* REQUEST QUOTE MODAL */}
      {selectedVendorForQuote && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 relative text-slate-900">
            <button
              onClick={() => setSelectedVendorForQuote(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {quoteSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Quote Request Delivered!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedVendorForQuote.name} has received your inquiry and will respond within 2-4 business hours.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-600 uppercase">
                  Service Inquiry
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Request Quote from {selectedVendorForQuote.name}
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Direct B2B connection managed via Business Glider.
                </p>

                <form onSubmit={handleSendQuote} className="space-y-3.5 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={quoteSenderName}
                      onChange={(e) => setQuoteSenderName(e.target.value)}
                      placeholder="e.g. Abhay Sharma"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={quoteSenderEmail}
                        onChange={(e) => setQuoteSenderEmail(e.target.value)}
                        placeholder="abhay@example.com"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={quoteSenderPhone}
                        onChange={(e) => setQuoteSenderPhone(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Project Details / Scope *</label>
                    <textarea
                      rows={3}
                      required
                      value={quoteDetails}
                      onChange={(e) => setQuoteDetails(e.target.value)}
                      placeholder="Describe what you need, deliverables, and estimated timeline..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>SUBMIT QUOTE INQUIRY</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <WhatsAppFloat />
    </div>
  );
}

export default function VendorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center text-slate-400 text-xs">Loading verified partners...</div>}>
      <VendorsContent />
    </Suspense>
  );
}
