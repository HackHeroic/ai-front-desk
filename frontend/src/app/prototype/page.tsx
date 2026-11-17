import type { Metadata } from "next";
import PrototypeApp from "./PrototypeApp";

export const metadata: Metadata = { title: "Wynsley · product prototype" };

export default function PrototypePage() {
  return <PrototypeApp />;
}
