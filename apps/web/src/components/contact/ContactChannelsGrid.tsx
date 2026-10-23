import React from "react";
import { Card } from "@/components/ui/Card";
import { Mail, Phone, Calendar, Linkedin, MapPin, ExternalLink } from "lucide-react";

interface ContactChannelsGridProps {
  bookingUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export function ContactChannelsGrid({
  bookingUrl = "https://cal.com/oderinde/free",
  email = "Contact@oderindestephen.com",
  phone = "+44 7848 149224",
  location = "London, United Kingdom & Worldwide Remote",
}: ContactChannelsGridProps) {
  const channels = [
    {
      icon: Mail,
      title: "Direct Email",
      value: email,
      actionText: "Send Email",
      href: `mailto:${email}`,
      isExternal: false,
    },
    {
      icon: Phone,
      title: "Phone & WhatsApp",
      value: phone,
      actionText: "Call or Message",
      href: `tel:${phone.replace(/\s+/g, "")}`,
      isExternal: false,
    },
    {
      icon: Calendar,
      title: "Strategy Video Call",
      value: "20-Min Discovery Session",
      actionText: "Book on Cal.com",
      href: bookingUrl,
      isExternal: true,
    },
    {
      icon: Linkedin,
      title: "LinkedIn Profile",
      value: "Stephen Oderinde",
      actionText: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/pythonhero/",
      isExternal: true,
    },
    {
      icon: MapPin,
      title: "Base & Remote Delivery",
      value: location,
      actionText: "View Google Business",
      href: "https://share.google/vDGgZ0FrAHvVTa31h",
      isExternal: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {channels.map((ch, idx) => {
        const Icon = ch.icon;
        return (
          <Card key={idx} className="p-6 border-slate-800 bg-slate-900/40 hover:border-blue-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-slate-400 block mb-1 uppercase">
                {ch.title}
              </span>
              <h3 className="text-sm font-bold text-white mb-4 line-clamp-1">
                {ch.value}
              </h3>
            </div>

            <a
              href={ch.href}
              target={ch.isExternal ? "_blank" : undefined}
              rel={ch.isExternal ? "noopener noreferrer" : undefined}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5 pt-3 border-t border-slate-800"
            >
              {ch.actionText} {ch.isExternal && <ExternalLink className="w-3.5 h-3.5" />}
            </a>
          </Card>
        );
      })}
    </div>
  );
}
