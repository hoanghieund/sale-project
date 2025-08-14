import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Shield, Filter, Grid, List, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Mock vendor data - theo mẫu bazatify.com
const mockVendors = [
  {
    id: 1,
    name: "Alpha Shop LLC",
    location: "1817 Milo Ave, Redding, California, United States (US)",
    avatar: "AS",
    storeUrl: "/store/alpha-shop",
  },
  {
    id: 2,
    name: "DavidKornely",
    location: "2410 Pine Terrace Dr, Kingwood, Texas, United States (US)",
    avatar: "DK",
    storeUrl: "/store/davidkornely",
  },
  {
    id: 3,
    name: "PatriciaMusburger",
    location: "2410 Pine Terrace Dr, Kingwood, Texas, United States (US)",
    avatar: "PM",
    storeUrl: "/store/patriciamusburger",
  },
  {
    id: 4,
    name: "ElissaMaden",
    location: "119a Hawkins Street, Plainville, Oklahoma, United States (US)",
    avatar: "EM",
    storeUrl: "/store/elissamaden",
  },
  {
    id: 5,
    name: "EnriqueSalas",
    location: "124 Oakwell Farms Pkwy, San Antonio, Texas, United States (US)",
    avatar: "ES",
    storeUrl: "/store/enriquesalas",
  },
  {
    id: 6,
    name: "MelissaKimberlin",
    location: "7211 Walnut Street, Dallas, Texas, United States (US)",
    avatar: "MK",
    storeUrl: "/store/melissakimberlin",
  },
];

/**
 * Vendors directory page - theo mẫu bazatify.com vendor-list
 * Brief: Hiển thị danh sách vendors với filter, sort và pagination
 */
const Vendors = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">»</span>
        <span>Vendor List</span>
      </nav>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="random">Random</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Vendors Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {mockVendors.map((vendor) => (
          <Card key={vendor.id} className="bg-white border-border/60 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Vendor Avatar */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-lg">{vendor.avatar}</span>
                </div>
                
                {/* Vendor Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-2 truncate">
                    <Link 
                      to={vendor.storeUrl} 
                      className="text-primary hover:underline"
                    >
                      {vendor.name}
                    </Link>
                  </h3>
                  <div className="flex items-start gap-1 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{vendor.location}</span>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to={vendor.storeUrl}>
                      Visit Store
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <nav className="flex items-center gap-2">
          <span className="px-3 py-2 bg-primary text-primary-foreground rounded">1</span>
          <Link to="/vendors?page=2" className="px-3 py-2 hover:bg-muted rounded">2</Link>
          <Link to="/vendors?page=3" className="px-3 py-2 hover:bg-muted rounded">3</Link>
          <span className="px-2">…</span>
          <Link to="/vendors?page=9" className="px-3 py-2 hover:bg-muted rounded">9</Link>
          <Link to="/vendors?page=2" className="px-3 py-2 hover:bg-muted rounded">Next →</Link>
        </nav>
      </div>

      {/* Bottom info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Questions about vendors? Contact us at{" "}
          <a 
            href="mailto:eulotus.com@gmail.com" 
            className="text-primary hover:underline"
          >
            eulotus.com@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Vendors;
