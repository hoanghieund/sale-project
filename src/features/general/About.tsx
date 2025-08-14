import { Award, Heart, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * Trang "Giới thiệu" cho Eulotus - sàn thương mại điện tử bán hàng
 * - Mục tiêu: củng cố thương hiệu, minh bạch giá trị & sứ mệnh, tăng niềm tin người dùng
 * - Lý do: nội dung cũ thuộc DoneKick (sneakers marketplace) không đúng với Eulotus
 *
 * About page for Eulotus - the e-commerce platform
 * - Goal: strengthen brand trust by stating story, values and mission clearly
 * - Note: replaces legacy DoneKick copy with Eulotus messaging
 */
const About = () => {
  return (
    <>
      {/* Hero: đồng nhất với SellerRegistration (Badge + tiêu đề + mô tả) */}
      <section className="bg-gradient-to-br from-background to-muted/30 rounded-lg p-8 md:p-12 text-center border border-border/50 shadow-sm">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <span className="inline-flex">
              <span className="px-3 py-1 rounded-md text-xs font-medium bg-blue-600 text-white">About</span>
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">About Eulotus</h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            An e-commerce platform that connects sellers and buyers for safe, fast, and transparent shopping.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16" role="main" aria-label="About Eulotus - Our Story">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Our Story</h2>
            <p className="text-center text-lg text-muted-foreground mb-12">Online marketplace of fairness and affection</p>
            <div className="prose prose-lg mx-auto space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Eulotus is an online marketplace for unique collectibles and creative products that you might not find anywhere else. From beautifully handcrafted accessories to soulful artwork, to amazing collectible items and well-preserved fashion pieces, and more, Eulotus is where passionate souls come together to share their unique items.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Eulotus is a place where people connect over cherished goods. We want every vendor on Eulotus to have the opportunity to turn their passions and collections into a career, and every buyer to find unique, meaningful items to gift to their loved ones.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We strive to build a friendly Eulotus community where people work together to protect the environment and promote sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-medium mb-4">How We Work</p>
            <h2 className="text-3xl font-bold mb-4">We give you "The online space" to create great value for the community.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Simple to sell</h3>
              <p className="text-muted-foreground mb-6">
                With low fees, powerful social media tools, and 1:1 support, we help entrepreneurs start, manage, and scale their businesses. Want to become a vendor on Eulotus?
              </p>
              <Button asChild variant="outline">
                <Link to="/seller-registration">Become a Vendor</Link>
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Buy faster, better</h3>
              <p className="text-muted-foreground mb-6">
                Easily search and discover great products on our platform with powerful search and personalization. Quickly "find" what you want!
              </p>
              <Button asChild variant="outline">
                <Link to="/">Start Shopping</Link>
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Buy with confidence, Sell safely</h3>
              <p className="text-muted-foreground mb-6">
                We control the quality of sellers and the security technology behind Eulotus, making it safe, fun and secure for buyers and vendors to connect and exchange on the marketplace.
              </p>
              <Button asChild variant="outline">
                <Link to="/buyer-protection">View our Policy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-medium mb-4">Milestones</p>
            <h2 className="text-3xl font-bold">Eulotus Fun Journey</h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2022</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Small Local "Market" (2022)</h3>
                <p className="text-muted-foreground">
                  3 small booths held on weekends displaying unique items and collectibles by local entrepreneurs passionate about sharing their crafted goods with the community.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2023</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Community Building (2023)</h3>
                <p className="text-muted-foreground">
                  People love to gather and exchange their collected items, and the newly established marketplace became a place for passionate collectors and creators to connect.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2024</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">The idea of an online marketplace (2024)</h3>
                <p className="text-muted-foreground">
                  When collectors always complained about unique items being sold out and couldn't find more. An idea was formed to combine the power of online technology to connect many passionate people.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2025</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Eulotus Marketplace was born (2025)</h3>
                <p className="text-muted-foreground">
                  A fun online marketplace behind the engaging community lies a very emotional and engaging Eulotus. Connecting passionate sellers with buyers looking for unique, meaningful items.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            The Eulotus Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">MH</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Matthew Henderson</h3>
              <p className="text-muted-foreground mb-2">Founder & CEO</p>
              <p className="text-sm text-muted-foreground">
                Product direction and growth strategy
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">LA</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lauren Anderson</h3>
              <p className="text-muted-foreground mb-2">
                Head of Merchant Success
              </p>
              <p className="text-sm text-muted-foreground">
                Partnering with merchants for sustainable growth
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">QM</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quentin Miller</h3>
              <p className="text-muted-foreground mb-2">
                Head of Customer Experience
              </p>
              <p className="text-sm text-muted-foreground">
                Elevating customer experience with fast, friendly support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Eulotus by the Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500K+</div>
              <div className="text-white">Trusted users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-white">Products listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-white">Sellers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.95%</div>
              <div className="text-white">System uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                We invite you to continue writing interesting and new things with passion for business and creative startups. Eulotus welcomes you with kindness and sincerity!
              </p>
              <p className="font-semibold text-lg mb-4">We are here</p>
              <p className="font-medium mb-2">EULOTUS OFFICE</p>
              <p className="text-muted-foreground mb-2">
                <span className="font-medium">Address:</span> Online Marketplace Platform
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:eulotus.com@gmail.com" className="text-primary hover:underline">
                  eulotus.com@gmail.com
                </a>
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">E</span>
                </div>
                <h3 className="text-xl font-semibold">Eulotus Team</h3>
                <p className="text-muted-foreground">Connecting passionate souls</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
