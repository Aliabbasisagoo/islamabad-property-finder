import { FormEvent, useState } from "react";

import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
import { Button } from "@/components/ui/button";
import { agency } from "@/lib/agency";

const intents = ["Buy", "Sell", "Rent"] as const;
const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-ring";

export function WhatsAppInquiryForm({ className }: { className?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [intent, setIntent] = useState<(typeof intents)[number]>("Buy");
  const [area, setArea] = useState("Anywhere / Not sure");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const lines = [
      "Assalam o Alaikum!",
      `I'm ${name.trim()}.`,
      `Looking to: ${intent} a property`,
      `Area: ${area}`,
      budget.trim() ? `Budget: ${budget.trim()}` : "",
      message.trim(),
      `My number: ${phone.trim()}`,
      "(Sent from your website)",
    ].filter(Boolean);
    const url = `https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} className={className} aria-label="Send an inquiry on WhatsApp">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block text-primary-foreground/70">Name *</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-primary-foreground/70">Phone / WhatsApp *</span>
          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="03xx xxxxxxx" className={inputClass} />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-primary-foreground/70">I want to</span>
          <select value={intent} onChange={(e) => setIntent(e.target.value as (typeof intents)[number])} className={inputClass}>
            {intents.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-primary-foreground/70">Area</span>
          <select value={area} onChange={(e) => setArea(e.target.value)} className={inputClass}>
            <option value="Anywhere / Not sure">Anywhere / Not sure</option>
            {agency.areas.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-primary-foreground/70">Budget (optional)</span>
          <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. PKR 1–2 Crore" className={inputClass} />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-primary-foreground/70">Message (optional)</span>
          <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Anything else we should know?" className={inputClass} />
        </label>
      </div>
      <Button variant="whatsapp" type="submit" className="mt-4 w-full sm:w-auto">
        <WhatsAppGlyph size={18} />
        Send on WhatsApp
      </Button>
      <p className="mt-3 text-xs text-primary-foreground/50">Opens WhatsApp with your details filled in — nothing is stored on this site.</p>
    </form>
  );
}
