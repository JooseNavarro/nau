import { AppWrapper } from "@/app/components/AppWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nau",
  description: "Bienvenido al panel de gestión de órdenes de NAU.",
  icons: "/favicon.svg",
};
export default function OrdersPage() {
  return <AppWrapper />;
}
