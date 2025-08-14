import { Award, Heart, Target, Users } from "lucide-react";

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
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Eulotus</h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
            An e-commerce platform that connects sellers and buyers, delivering
            safe, fast, and transparent shopping experiences.
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
                <strong>Eulotus</strong> was created to help businesses and
                individuals sell online with ease. From a simple idea of
                transparently connecting sellers and buyers, we have evolved
                into a full‑stack e‑commerce platform that supports the entire
                commerce journey.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                On Eulotus, merchants can publish products, manage orders,
                integrate secure payments, and track operations efficiently.
                Buyers can discover millions of items with clear information,
                verified reviews, and caring post‑purchase support.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, Eulotus serves customers across, focusing on convenient,
                fast shopping with friendly and effective customer care.
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
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Trust & Transparency
              </h3>
              <p className="text-muted-foreground">
                Clear product information, transparent policies, and secure
                payments. Building trust is our top priority.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-muted-foreground">
                We connect sellers and buyers and foster a sustainable
                e‑commerce ecosystem.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Efficiency</h3>
              <p className="text-muted-foreground">
                We optimize the journey from listing to delivery to improve
                operations and experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer‑first</h3>
              <p className="text-muted-foreground">
                We listen and act, providing fast and professional support in
                every situation.
              </p>
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

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Build a trusted marketplace that connects sellers and buyers,
              ensures secure payments, efficient logistics, and caring
              after‑sales service. We strive to deliver transparent, convenient,
              and sustainable shopping for everyone.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
