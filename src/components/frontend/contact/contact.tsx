"use client";

import Container from "@/components/custom/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="py-16">
      <Container>
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Contact <span className="text-emerald-500">Us</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Have questions or feedback? We’d love to hear from you.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-10">
          {/* LEFT: Contact Info */}
          <div className="space-y-6">
            <div className="flex gap-3">
              <Mail className="text-emerald-500" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  support@eventora.com
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone className="text-emerald-500" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">
                  +880 1234-567890
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <MapPin className="text-emerald-500" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <form className="space-y-4 rounded-xl border p-6 shadow-sm">
            <Input placeholder="Your Name" />
            <Input placeholder="Your Email" type="email" />
            <Input placeholder="Subject" />
            <Textarea placeholder="Your Message" rows={5} />

            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Contact;