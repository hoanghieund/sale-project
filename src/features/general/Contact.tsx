import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Contact form submitted:", data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <>
      {/* Hero: đồng nhất với SellerRegistration (Badge + tiêu đề + mô tả) */}
      <section className="bg-gradient-to-br from-background to-muted/30 rounded-lg p-8 md:p-12 text-center border border-border/50 shadow-sm">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <span className="inline-flex">
              <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-blue-600 text-white">
                Contact
              </span>
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            We're here to help! Get in touch with our team for any questions or
            support.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16" role="main" aria-label="Contact Eulotus">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="bg-white">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Send us a message</CardTitle>
                  <CardDescription className="text-xs">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted && (
                    <div
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                      role="status"
                      aria-live="polite"
                    >
                      <p className="text-green-800 font-medium">
                        Thank you for your message! We'll get back to you within
                        24 hours.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        {...register("name", { required: "Name is required" })}
                        className={`${
                          errors.name ? "border-destructive" : ""
                        } py-1 text-sm`}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="text-xs text-destructive mt-1"
                        >
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={`${
                          errors.email ? "border-destructive" : ""
                        } py-1 text-sm`}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="text-xs text-destructive mt-1"
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="category" className="text-sm">
                        Category
                      </Label>
                      <Select required>
                        <SelectTrigger
                          id="category"
                          className={`${
                            errors.category ? "border-destructive" : ""
                          } py-1 text-sm`}
                          aria-invalid={!!errors.category}
                          aria-describedby={
                            errors.category ? "category-error" : undefined
                          }
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="support">
                            Customer Support
                          </SelectItem>
                          <SelectItem value="billing">
                            Billing Question
                          </SelectItem>
                          <SelectItem value="vendor">
                            Vendor Application
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-sm">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        {...register("subject", {
                          required: "Subject is required",
                        })}
                        className={`${
                          errors.subject ? "border-destructive" : ""
                        } py-1 text-sm`}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={
                          errors.subject ? "subject-error" : undefined
                        }
                      />
                      {errors.subject && (
                        <p
                          id="subject-error"
                          className="text-xs text-destructive mt-1"
                        >
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        {...register("message", {
                          required: "Message is required",
                        })}
                        className={`${
                          errors.message ? "border-destructive" : ""
                        } py-1 text-sm`}
                        required
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? "message-error" : undefined
                        }
                        rows={4}
                      />
                      {errors.message && (
                        <p
                          id="message-error"
                          className="text-xs text-destructive mt-1"
                        >
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-1 text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2 h-3 w-3 animate-spin">●</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-3 w-3" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about our products, need help with an order, or
                  want to become a vendor? We're here to help! Choose the best
                  way to reach us below.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1 text-sm">
                          Email Support
                        </h3>
                        <p className="text-muted-foreground mb-1 text-xs">
                          We'll respond within 24 hours
                        </p>
                        <p className="font-medium text-sm">
                          contact.eulotus@gmail.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1 text-sm">
                          Office Address
                        </h3>
                        <p className="text-muted-foreground mb-1 text-xs">
                          Visit us at our headquarters
                        </p>
                        <p className="font-medium text-sm">Online</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1 text-sm">
                          Business Hours
                        </h3>
                        <p className="text-muted-foreground mb-1 text-xs">
                          When you can reach us
                        </p>
                        <div className="font-medium space-y-1 text-sm">
                          <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                          <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm">
              Quick answers to common questions. Can't find what you're looking
              for? Contact us!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              <h3 className="font-medium mb-1 text-sm">
                How do I know if a product is authentic?
              </h3>
              <p className="text-muted-foreground text-xs">
                Every product on DoneKick goes through our rigorous
                authentication process. We guarantee 100% authenticity or your
                money back.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-1 text-sm">
                What is your return policy?
              </h3>
              <p className="text-muted-foreground text-xs">
                We offer 30-day returns for unworn items in original packaging.
                See our Returns Policy page for full details.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-1 text-sm">
                How long does shipping take?
              </h3>
              <p className="text-muted-foreground text-xs">
                Standard shipping takes 5-8 business days. Express shipping
                options are available at checkout for faster delivery.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-1 text-sm">
                Can I become a vendor?
              </h3>
              <p className="text-muted-foreground text-xs">
                Yes! We're always looking for trusted vendors. Contact us with
                "Become a Vendor" in the category to learn more about our
                requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
