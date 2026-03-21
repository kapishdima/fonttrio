// "use client";

// import { useState } from "react";
// import {
//   type BillingCycle,
//   BILLING_OPTIONS,
//   DEFAULT_BILLING_CYCLE,
//   SPONSOR_TIERS,
// } from "@/lib/sponsors";

// export function SponsorTiers() {
//   const [billing, setBilling] = useState<BillingCycle>(DEFAULT_BILLING_CYCLE);

//   const activeBilling = BILLING_OPTIONS.find((o) => o.key === billing)!;

//   return (
//     <div>
//       {/* Billing toggle */}
//       <div className="flex justify-center mb-10">
//         <div className="inline-flex border border-border">
//           {BILLING_OPTIONS.map((option) => (
//             <button
//               key={option.key}
//               onClick={() => setBilling(option.key)}
//               className={`px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors min-h-[44px] ${
//                 billing === option.key
//                   ? "bg-foreground text-background"
//                   : "bg-transparent text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               {option.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Tier cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
//         {SPONSOR_TIERS.map((tier) => (
//           <div
//             key={tier.key}
//             className="border border-border bg-surface/50 p-6 flex flex-col"
//           >
//             <div className="mb-4">
//               <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
//               <div className="text-3xl font-bold">
//                 ${tier.price}
//                 {activeBilling.suffix && (
//                   <span className="text-sm font-normal text-muted-foreground">
//                     {activeBilling.suffix}
//                   </span>
//                 )}
//               </div>
//             </div>

//             <p className="text-sm text-muted-foreground mb-6">
//               {tier.description}
//             </p>

//             <ul className="space-y-2 mb-6 flex-1">
//               {tier.benefits.map((benefit, index) => (
//                 <li key={index} className="flex items-start gap-2 text-sm">
//                   <span className="text-foreground mt-0.5">✓</span>
//                   <span>{benefit}</span>
//                 </li>
//               ))}
//             </ul>

//             <a
//               href={tier.paymentUrls[billing]}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-full py-3 px-4 bg-foreground text-background text-center text-sm uppercase tracking-wider font-medium hover:opacity-90 transition-opacity"
//             >
//               Become a {tier.name} Sponsor
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
