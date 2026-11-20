import type { Metadata } from "next";
import Storefront from "./components/Storefront";

export const metadata: Metadata = {
  title: "ShipYard — Not Made to Blend In",
  description: "Shop the extraordinary. Explore eight striking essentials across sneakers, audio, wearables, and design-forward gadgets.",
  openGraph: {
    title: "ShipYard / Objects for the Unordinary",
    description: "Everyday objects. Different energy. Explore the ShipYard collection.",
    type: "website",
  },
};

export default function HomePage() {
  return <Storefront />;
}
