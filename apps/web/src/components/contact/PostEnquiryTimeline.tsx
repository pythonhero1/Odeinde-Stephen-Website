import React from "react";
import { Card } from "@/components/ui/Card";

export function PostEnquiryTimeline() {
  const steps = [
    {
      step: "01",
      title: "Share Project Context",
      description: "Submit the 7-field form or book a call. Tell me what your business does, your ideal timeline, and what success looks like.",
    },
    {
      step: "02",
      title: "Review & Technical Scoping",
      description: "I review your requirements within 24 business hours to evaluate platform fit (WordPress, WooCommerce, Next.js) and architecture.",
    },
    {
      step: "03",
      title: "Fixed Proposal & Action Plan",
      description: "We discuss the recommended solution and you receive a clear, fixed-price quotation with milestones before any commitment.",
    },
  ];

  return (
    <div className="py-12 border-t border-slate-800">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-blue-400 font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
          AFTER YOU REACH OUT
        </span>
        <h3 className="text-2xl font-bold text-white">What Happens After You Contact Me?</h3>
        <p className="text-slate-400 text-xs mt-2">
          Clear communication from the very first message. No high-pressure sales tactics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((st, idx) => (
          <Card key={idx} className="p-6 border-slate-800 bg-slate-900/50">
            <span className="text-2xl font-mono font-extrabold text-blue-500 block mb-2">
              {st.step}
            </span>
            <h4 className="text-base font-bold text-white mb-2">{st.title}</h4>
            <p className="text-slate-400 text-xs leading-relaxed">{st.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
