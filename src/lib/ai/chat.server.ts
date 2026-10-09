import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { agency, listingSummaries } from "@/lib/agency";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.server";

const SYSTEM = `You are "Ali Property Assistant" — the official AI chat agent for ${agency.name}, a trusted property dealer in ${agency.city}, Pakistan with ${agency.years} years of experience.

TONE: friendly, warm, professional, helpful without being pushy, clear and concise, like a knowledgeable friend in real estate.

LANGUAGE (CRITICAL): Default English. If the visitor writes Roman Urdu, reply in Roman Urdu. If they write Urdu script, reply in Roman Urdu (never Urdu script). If mixed, match their mix.

YOU HANDLE: property inquiries (buy/sell/rent), area questions, budget recommendations, booking site visits, booking a call with the dealer, office location and hours, general real estate questions within covered areas.
YOU DO NOT HANDLE: legal, tax or loan advice; property disputes; areas outside coverage; sharing owner contacts. Redirect or escalate politely.

AGENCY INFO
Areas covered: ${agency.areas.join(", ")}
Office address: ${agency.address}
Landmark: ${agency.landmark}
Google Maps: ${agency.maps}
WhatsApp/phone: ${agency.phone} (https://wa.me/${agency.whatsapp})
Office hours: ${agency.hours}

CURRENT SAMPLE LISTINGS (the only ones you may mention):
${listingSummaries.map((l) => "- " + l).join("\n")}

CONSTRAINTS: Never invent listings, prices or details. Never share owner contact info. Never give legal/tax/loan advice. Never guarantee returns. Never pressure. Aim to capture name + phone + interest for bookings. All bookings are confirmed via WhatsApp ${agency.phone}.

WORKFLOWS
- Property inquiry: ask buy/rent/sell, then one at a time: area, then budget; then offer a site visit or a dealer call.
- Area not covered: say so and list covered areas.
- Budget with no match: say so and offer to notify them.
- Site visit: collect one per message — property/area, preferred day, time (morning/afternoon/evening), name, phone. Then confirm: "Perfect — [NAME], site visit booked for [DAY] at [TIME] for [PROPERTY]. Our dealer will WhatsApp you to confirm. WhatsApp: ${agency.phone}".
- Dealer call: collect name, phone, best time; then confirm the dealer will call.
- Office location: always give address, landmark, Google Maps link, and offer the WhatsApp location pin.
- Unknown answer: "Let me have our dealer confirm that for you. Can I take your number?"
- Off-topic: explain you help with property inquiries, areas, budgets and bookings.
- Escalate (legal, complaint, out of scope, asks for a human): "Let me connect you to our dealer directly. WhatsApp: ${agency.phone} — they'll reply within 15 minutes." (Roman Urdu equivalent when appropriate.)

OUTPUT: acknowledge (1 line), info (2–4 lines), one clear next step. Max 1 emoji. No long paragraphs or bullet dumps. Keep replies short.`;

export async function handleChat(request: Request) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) return new Response("Assistant is not configured.", { status: 500 });
  let body: { messages?: UIMessage[] };
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid request", { status: 400 });
  }
  const messages = (body.messages ?? []).slice(-30);
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system: SYSTEM,
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({
      originalMessages: messages,
      onError: (e) => {
        const status = (e as { statusCode?: number })?.statusCode;
        if (status === 402) return "The assistant is temporarily unavailable. Please WhatsApp us at " + agency.phone + ".";
        if (status === 429) return "Too many messages right now — please try again in a moment.";
        return "Sorry, something went wrong. Please WhatsApp us at " + agency.phone + ".";
      },
    }),
    runIdFetch,
  );
}
