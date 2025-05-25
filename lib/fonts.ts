import { Playfair_Display, Inter, Poppins, Montserrat } from "next/font/google"

export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
})

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

