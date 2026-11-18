/** Shared source of truth for the storefront. */
export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: "Sneakers" | "Audio" | "Wearables" | "Gadgets";
  emoji: string;
  accent: string;
  description: string;
  specs: string[];
}

export const products: Product[] = [
  {
    id: "wave-runner",
    name: "Wave Runner",
    tagline: "The everyday runner, reimagined.",
    price: 129,
    category: "Sneakers",
    emoji: "👟",
    accent: "#668bff",
    description: "Engineered for early starts and late finishes. The Wave Runner pairs a featherlight knit upper with responsive cushioning for every mile in between.",
    specs: ["Breathable knit upper", "Responsive foam midsole", "320 g per shoe", "Unisex sizing"],
  },
  {
    id: "pulse-buds",
    name: "Pulse Buds",
    tagline: "Your sound, without the noise.",
    price: 89,
    category: "Audio",
    emoji: "🎧",
    accent: "#b088ff",
    description: "Compact wireless earbuds with powerful noise cancellation, balanced bass and all-day comfort.",
    specs: ["Active noise cancellation", "8-hour earbud battery", "USB-C charging case", "IPX4 splash resistance"],
  },
  {
    id: "orbit-watch",
    name: "Orbit Watch",
    tagline: "A smarter rhythm for every day.",
    price: 219,
    category: "Wearables",
    emoji: "⌚",
    accent: "#64c9b2",
    description: "A sleek everyday smartwatch with activity insights, customizable faces and thoughtful health tracking.",
    specs: ["1.9-inch AMOLED display", "Heart rate tracking", "5-day typical battery", "Water resistant to 5 ATM"],
  },
  {
    id: "nova-cam",
    name: "Nova Cam",
    tagline: "Big memories, pocket-sized gear.",
    price: 349,
    category: "Gadgets",
    emoji: "📷",
    accent: "#ff9e83",
    description: "A pocket camera made for spontaneous adventures, with crisp stills and simple video controls.",
    specs: ["24 MP image sensor", "4K / 30 fps recording", "Built-in image stabilization", "USB-C connectivity"],
  },
  {
    id: "cloud-step",
    name: "Cloud Step",
    tagline: "Comfort that goes further.",
    price: 115,
    category: "Sneakers",
    emoji: "🥾",
    accent: "#e8bc73",
    description: "An adaptable city-to-trail sneaker with a grippy outsole and soft support that lasts all day.",
    specs: ["High-grip rubber outsole", "Cushioned heel collar", "Recycled mesh lining", "Everyday all-terrain design"],
  },
  {
    id: "tempo-speaker",
    name: "Tempo Speaker",
    tagline: "Fill any space with feeling.",
    price: 149,
    category: "Audio",
    emoji: "🔊",
    accent: "#fa829e",
    description: "Portable room-filling sound with rich lows, crisp vocals and a rugged take-anywhere build.",
    specs: ["Bluetooth 5.3", "12-hour playtime", "IP67 dust and water protection", "Stereo pairing"],
  },
  {
    id: "arc-keyboard",
    name: "Arc Keyboard",
    tagline: "Make every keystroke count.",
    price: 159,
    category: "Gadgets",
    emoji: "⌨️",
    accent: "#77bfe6",
    description: "A compact mechanical keyboard with tactile switches and a satisfying minimalist layout for focused work.",
    specs: ["75% compact layout", "Hot-swappable switches", "Wired USB-C connectivity", "Adjustable backlighting"],
  },
  {
    id: "flux-band",
    name: "Flux Band",
    tagline: "Little habits. Big momentum.",
    price: 69,
    category: "Wearables",
    emoji: "💫",
    accent: "#a4df7b",
    description: "A slim activity band that helps you notice movement, recovery, and small wins throughout the day.",
    specs: ["Sleep and movement tracking", "7-day typical battery", "Comfort-fit silicone strap", "Customizable notifications"],
  },
];

/** Returns undefined for an unknown product id. */
export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
