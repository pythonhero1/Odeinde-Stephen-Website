import React from "react";
import { Card } from "@/components/ui/Card";
import { Globe2, Clock, ShieldCheck } from "lucide-react";

export function GlobalDeliverySection() {
  return (
    <div className="py-12 border-t border-slate-800">
      <Card className="p-8 border-slate-800 bg-slate-950/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">UK Base & Global Delivery</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Based in London, UK, collaborating seamlessly with clients across the UK, Europe, North America, Australia, and worldwide.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Timezone Alignment</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Operating across GMT / BST hours with flexible overlapping availability for US Eastern, European, and international teams.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Direct Developer Access</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                You communicate directly with the engineer designing and coding your system. No account managers or outsourced intermediaries.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
