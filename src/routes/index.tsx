import { createFileRoute } from "@tanstack/react-router";
import {
  Bath,
  BedDouble,
  Building2,
  CheckCircle2,
  Clock3,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import apartmentImage from "@/assets/apartment.jpg";
import commercialImage from "@/assets/commercial-shop.jpg";
import heroImage from "@/assets/islamabad-hero.jpg";
import houseLargeImage from "@/assets/house-10-marla.jpg";
import houseSmallImage from "@/assets/house-5-marla.jpg";
import plotImage from "@/assets/plot.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ali Property Dealers | Property Dealer in Islamabad — Buy, Sell, Rent" },
      { name: "description", content: "Trusted property dealer serving Islamabad for 5 years. Explore houses, plots, flats, and commercial properties." },
      { property: "og:title", content: "Ali Property Dealers | Islamabad Property" },
      { property: "og:description", content: "Buy, sell, and rent property in Islamabad with experienced local guidance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const agency = {
  name: "Ali Property Dealers",
  city: "Islamabad",
  years: 5,
  phone: "+92 317 582104",
  whatsapp: "92317582104",
  whatsappMessage: "Hello! I found your website and I'm interested in a property.",
  address: "Office address coming soon",
  landmark: "Landmark coming soon",
  maps: "",
  hours: "Office hours coming soon",
};

const whatsappUrl = `https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(agency.whatsappMessage)}`;

const listings = [
  { name: "10 Marla House", area: "DHA Phase 5", size: "10 Marla", beds: 4, baths: 4, price: "PKR 4.5 Crore", status: "Ready", type: "House", image: houseLargeImage },
  { name: "5 Marla House", area: "Bahria Town", size: "5 Marla", beds: 3, baths: 3, price: "PKR 2.1 Crore", status: "Ready", type: "House", image: houseSmallImage },
  { name: "2 Bed Flat", area: "Gulberg Greens", size: "2 Bed", beds: 2, baths: 2, price: "PKR 1.2 Crore", status: "Ready", type: "Flat", image: apartmentImage },
  { name: "1 Kanal Plot", area: "DHA Phase 2", size: "1 Kanal", price: "PKR 8.5 Crore", status: "Ready for Construction", type: "Plot", image: plotImage },
  { name: "Commercial Shop", area: "F-11 Markaz", size: "400 Sq Ft", price: "PKR 1.8 Crore", status: "Ready", type: "Shop", image: commercialImage },
  { name: "3 Bed Apartment", area: "F-10", size: "3 Bed", beds: 3, baths: 3, price: "PKR 2.8 Crore", status: "Ready", type: "Apartment", image: apartmentImage },
];

const areas = ["DHA", "Bahria Town", "Gulberg", "F-6", "F-7", "F-8", "F-10", "F-11", "G-11", "G-13", "E-11"];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ from: "agent", text: "Assalam-o-Alaikum! Ali Property Dealers mein khush aamdeed 🏠 Buy, rent, plot, ya commercial — kis mein madad karoon?" }]);

  const nav = useMemo(() => [
    ["Home", "#home"], ["Listings", "#listings"], ["Areas", "#areas"], ["About", "#about"], ["Contact", "#contact"],
  ], []);

  const submitChat = (event: FormEvent) => {
    event.preventDefault();
    const clean = message.trim().slice(0, 300);
    if (!clean) return;
    const lower = clean.toLowerCase();
    let reply = "Ji, main Islamabad mein property options ke liye madad kar sakta hoon. Buy karna hai ya rent?";
    if (/legal|tax|loan|قرض/.test(lower)) reply = "Is mamlay mein professional advisor behtar guide karega. Main property listings, areas aur site visits mein madad kar sakta hoon.";
    else if (/visit|dekh|booking/.test(lower)) reply = "Site visit arrange ho sakti hai. Kaunsi property, preferred day aur time batayein?";
    else if (/area|location|dha|bahria|gulberg|f-1|g-1|e-11/.test(lower)) reply = "Ji, DHA, Bahria Town, Gulberg aur selected Islamabad sectors mein options hain. Buy ya rent chahte hain?";
    else if (/list|house|flat|plot|shop|apartment|property/.test(lower)) reply = "Available sample listings upar Featured Listings mein hain. Apna area aur budget batayein, main matching options bata doon?";
    else if (/office|address|map/.test(lower)) reply = "Office address aur map pin abhi update hona baqi hai. Aap property area batayein, main available options share karta hoon.";
    else if (/hello|hi|salam|assalam/.test(lower)) reply = "Wa-Alaikum-Salam! Buy, rent, plot, ya commercial — kis mein madad chahiye?";
    setMessages((current) => [...current, { from: "user", text: clean }, { from: "agent", text: reply }]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-hero-foreground/10 bg-primary/95 text-primary-foreground backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="Ali Property Dealers home">
            <span className="grid size-10 place-items-center rounded-md bg-gold text-gold-foreground"><Building2 size={21} /></span>
            <span className="font-display text-base font-bold leading-tight sm:text-lg">Ali Property<br className="sm:hidden" /> Dealers</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {nav.map(([label, href]) => <a key={href} href={href} className="text-sm font-medium text-primary-foreground/80 hover:text-gold">{label}</a>)}
          </nav>
          <div className="hidden md:block"><Button variant="gold" asChild><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />WhatsApp Us</a></Button></div>
          <Button variant="ghost" size="icon" className="text-primary-foreground md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="border-t border-hero-foreground/10 bg-primary px-5 py-4 md:hidden">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block min-h-11 py-3 font-medium">{label}</a>)}</nav>}
      </header>

      <main>
        <section id="home" className="relative flex min-h-[88vh] items-end overflow-hidden pt-18 text-hero-foreground">
          <img src={heroImage} alt="Residential neighborhood in Islamabad with the Margalla Hills" width={1920} height={1080} className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-primary/65" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:pb-24">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 border-l-2 border-gold pl-3 text-sm font-semibold uppercase text-gold">Islamabad property specialists</div>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl">Find Your Perfect Property in Islamabad</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-hero-foreground/80 sm:text-xl">Trusted property guidance for 5 years. Buy, sell, or rent houses, plots, apartments, and commercial spaces.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button variant="gold" asChild><a href="#listings"><Search size={18} />View Listings</a></Button><Button variant="heroOutline" asChild><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />WhatsApp Us</a></Button></div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-hero-foreground/10 px-5 py-7 md:grid-cols-4 lg:px-8">
            {[ ["5+", "Years Experience"], ["6", "Featured Properties"], ["11", "Areas Covered"], ["100%", "Verified Details"] ].map(([value,label]) => <div key={label} className="px-4 py-2 text-center"><div className="font-display text-2xl font-bold text-gold">{value}</div><div className="mt-1 text-xs text-primary-foreground/65 sm:text-sm">{label}</div></div>)}
          </div>
        </section>

        <section id="listings" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="Current opportunities" title="Featured Listings" copy="A selection of homes, plots, apartments, and commercial spaces across Islamabad." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((item) => <article key={item.name} className="group overflow-hidden rounded-md border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
              <div className="relative aspect-[3/2] overflow-hidden"><img src={item.image} alt={`${item.name} in ${item.area}`} width={1200} height={800} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><span className="absolute left-4 top-4 rounded-sm bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">For Sale</span></div>
              <div className="p-5"><div className="flex items-center justify-between gap-3"><span className="text-xs font-bold uppercase text-gold">{item.type}</span><span className="flex items-center gap-1 text-xs text-muted-foreground"><CheckCircle2 size={14} />{item.status}</span></div><h3 className="mt-3 text-xl font-semibold">{item.name}</h3><p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><MapPin size={16} />{item.area} · {item.size}</p>{item.beds && <div className="mt-4 flex gap-5 border-y border-border py-3 text-sm text-muted-foreground"><span className="flex items-center gap-2"><BedDouble size={17} />{item.beds} Beds</span><span className="flex items-center gap-2"><Bath size={17} />{item.baths} Baths</span></div>}<div className="mt-5 flex items-center justify-between gap-3"><strong className="font-display text-lg text-primary">{item.price}</strong><Button variant="outline" size="icon" aria-label={`Inquire about ${item.name}`} onClick={() => setChatOpen(true)}><MessageCircle size={18} /></Button></div></div>
            </article>)}
          </div>
          <p className="mt-7 text-center text-sm text-muted-foreground">Sample listings supplied for display. Please confirm current availability before visiting.</p>
        </section>

        <section id="areas" className="bg-primary py-20 text-primary-foreground lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8"><div><div className="text-sm font-bold uppercase text-gold">Local knowledge</div><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Areas We Serve</h2><p className="mt-5 max-w-lg leading-7 text-primary-foreground/65">Explore residential and commercial opportunities across Islamabad’s most sought-after communities and sectors.</p></div><div className="flex flex-wrap content-start gap-3">{areas.map((area) => <span key={area} className="rounded-sm border border-hero-foreground/15 bg-navy-soft px-5 py-3 text-sm font-semibold">{area}</span>)}</div></div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <SectionHeading eyebrow="Why Ali Property Dealers" title="Straightforward Property Guidance" copy="Local experience, clear information, and personal support from first inquiry to property visit." />
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{[
            [Clock3, "5+ Years Experience", "Practical knowledge of Islamabad's property market."], [ShieldCheck, "Verified Listings", "Property details are confirmed before recommendation."], [Users, "Family Focused", "Respectful help for families, buyers, and investors."], [MessageCircle, "Direct Dealing", "Clear communication without unnecessary middlemen."],
          ].map(([Icon,title,copy]) => { const I = Icon as typeof Clock3; return <div key={title as string} className="bg-background p-7"><I className="text-gold" size={28} /><h3 className="mt-5 text-lg font-semibold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy as string}</p></div>; })}</div>
        </section>

        <section className="bg-muted py-20 lg:py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHeading eyebrow="Our services" title="What We Do" copy="Practical property support for every stage of your move." /><div className="mt-10 grid gap-6 md:grid-cols-3">{[[Home,"Buy","Find a home, plot, apartment, or commercial space suited to your needs."],[Building2,"Sell","Present your property clearly and connect with serious potential buyers."],[Sparkles,"Rent","Explore short-term and long-term rental options across covered areas."]].map(([Icon,title,copy],index) => { const I = Icon as typeof Home; return <div key={title as string} className="border-t-2 border-gold bg-background p-7"><span className="text-sm font-bold text-gold">0{index+1}</span><I className="mt-8 text-primary" size={31}/><h3 className="mt-5 text-2xl font-semibold">{title as string}</h3><p className="mt-3 leading-7 text-muted-foreground">{copy as string}</p></div>; })}</div></div></section>

        <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28"><div><div className="text-sm font-bold uppercase text-gold">About us</div><h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Five Years of Local Property Experience</h2></div><div><p className="text-lg leading-8 text-muted-foreground">Ali Property Dealers has been serving Islamabad for 5 years. We help families and investors buy, sell, and rent properties with honesty and transparency. From residential homes to commercial spaces, every inquiry is handled with care.</p><div className="mt-8 flex items-center gap-4 border-l-2 border-gold pl-5"><MapPin className="shrink-0 text-gold"/><p className="font-semibold">Islamabad, Pakistan</p></div></div></section>

        <section id="contact" className="bg-primary py-20 text-primary-foreground lg:py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8"><div><div className="text-sm font-bold uppercase text-gold">Get in touch</div><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Let’s Discuss Your Property Needs</h2><p className="mt-5 max-w-lg leading-7 text-primary-foreground/65">Tell us what you are looking for and we’ll guide you toward suitable options and the next step.</p><Button variant="gold" className="mt-8" onClick={() => setChatOpen(true)}><MessageCircle size={18}/>Start a Conversation</Button></div><div className="grid gap-4 sm:grid-cols-2">{[[Phone,"Phone / WhatsApp",agency.phone],[MapPin,"Office",agency.address],[MapPin,"Landmark",agency.landmark],[Clock3,"Office Hours",agency.hours]].map(([Icon,label,value]) => { const I=Icon as typeof Phone; return <div key={label as string} className="border border-hero-foreground/10 bg-navy-soft p-5"><I className="text-gold" size={21}/><div className="mt-4 text-xs uppercase text-primary-foreground/50">{label as string}</div><div className="mt-1 text-sm font-semibold">{value as string}</div></div>; })}</div></div></section>
      </main>

      <footer className="bg-primary text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-hero-foreground/10 px-5 py-8 text-sm text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between lg:px-8"><span>© 2026 Ali Property Dealers. All rights reserved.</span><span>Islamabad, Pakistan</span></div></footer>

      <Button variant="gold" size="icon" className="fixed bottom-5 right-5 z-40 size-14 rounded-full shadow-xl" onClick={() => setChatOpen(!chatOpen)} aria-label="Open property assistant"><MessageCircle size={24}/></Button>
      {chatOpen && <div className="fixed bottom-22 right-4 z-50 flex h-[min(560px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-md border border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground"><div><div className="font-display font-semibold">Property Assistant</div><div className="mt-0.5 text-xs text-primary-foreground/60">Ali Property Dealers</div></div><Button variant="ghost" size="icon" className="text-primary-foreground" onClick={() => setChatOpen(false)} aria-label="Close assistant"><X size={20}/></Button></div>
        <div className="flex-1 space-y-3 overflow-y-auto bg-muted p-4" aria-live="polite">{messages.map((item,index) => <div key={`${item.from}-${index}`} className={`max-w-[88%] rounded-md px-3 py-2.5 text-sm leading-6 ${item.from === "user" ? "ml-auto bg-primary text-primary-foreground" : "border border-border bg-background"}`}>{item.text}</div>)}</div>
        <div className="flex gap-2 border-t border-border p-3"><Button variant="outline" className="flex-1 px-3" onClick={() => { setMessage("Show listings"); }}>Listings</Button><Button variant="outline" className="flex-1 px-3" onClick={() => { setMessage("Book a site visit"); }}>Site visit</Button></div>
        <form onSubmit={submitChat} className="flex gap-2 border-t border-border p-3"><label className="sr-only" htmlFor="chat-message">Your message</label><input id="chat-message" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={300} placeholder="Type your message…" className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-base outline-none focus:ring-2 focus:ring-ring"/><Button size="icon" aria-label="Send message"><Send size={18}/></Button></form>
      </div>}
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="max-w-2xl"><div className="text-sm font-bold uppercase text-gold">{eyebrow}</div><h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">{title}</h2><p className="mt-4 text-base leading-7 text-muted-foreground">{copy}</p></div>;
}