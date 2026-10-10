import { WhatsAppGlyph } from "@/components/WhatsAppGlyph";
import { whatsappUrl } from "@/lib/agency";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 left-5 z-40 grid size-[56px] place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-xl ring-2 ring-whatsapp/40 transition-transform hover:scale-105"
    >
      <WhatsAppGlyph size={26} />
    </a>
  );
}
