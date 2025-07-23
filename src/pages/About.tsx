import { Users, Target, Award, Heart } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-sport-dark to-sport-dark/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About DoneKick</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Your ultimate destination for authentic sneakers and premium athletic footwear
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
              <div className="prose prose-lg mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong>DoneKick</strong> was born from a passion for authentic sneakers and the culture that surrounds them. 
                  Founded in 2020, we started as a small marketplace with a simple mission: to connect sneaker enthusiasts 
                  with genuine, high-quality footwear from trusted vendors around the world.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  What began as a passion project has evolved into a comprehensive platform where sneakerheads, athletes, 
                  and fashion enthusiasts can discover, buy, and sell sought-after sneakers, new releases, and limited 
                  edition footwear. Every product on our platform is guaranteed to be 100% authentic or your money back.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, DoneKick serves thousands of customers worldwide, offering everything from classic Air Jordans 
                  to the latest Nike releases, from vintage Adidas to exclusive collaborations. We're not just a marketplace 
                  – we're a community of people who share a love for great footwear and the stories they tell.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-sport-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
                <p className="text-muted-foreground">
                  Every product is verified for authenticity by our expert team. We guarantee 100% genuine products or your money back.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-sport-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-muted-foreground">
                  We're building a global community of sneaker enthusiasts, connecting buyers and sellers worldwide.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-sport-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in every aspect of our service, from product quality to customer experience.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-sport-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Passion</h3>
                <p className="text-muted-foreground">
                  Our love for sneakers and street culture drives everything we do. It's not just business – it's personal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-sport-dark to-sport-dark/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JD</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                <p className="text-muted-foreground mb-2">Founder & CEO</p>
                <p className="text-sm text-muted-foreground">
                  Sneaker enthusiast with 15+ years in the industry
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-sport-dark to-sport-dark/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JS</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
                <p className="text-muted-foreground mb-2">Head of Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Expert authenticator with an eye for detail
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-sport-dark to-sport-dark/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">MJ</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Mike Johnson</h3>
                <p className="text-muted-foreground mb-2">Customer Experience Lead</p>
                <p className="text-sm text-muted-foreground">
                  Dedicated to providing exceptional customer service
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-sport-dark text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">DoneKick by the Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-white/80">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100K+</div>
                <div className="text-white/80">Products Sold</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-white/80">Trusted Vendors</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-white/80">Authenticity Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To create the world's most trusted marketplace for authentic sneakers, 
                where passion meets authenticity, and every step tells a story. We're committed 
                to building a community that celebrates sneaker culture while ensuring every 
                transaction is safe, secure, and satisfying.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
