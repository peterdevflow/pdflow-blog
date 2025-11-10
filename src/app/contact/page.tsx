import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Kapcsolat",
  description: "Lépj kapcsolatba velem. Szeretnék hallani rólad!",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Lépj Kapcsolatba
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Van egy kérdésed, projektötleted, vagy csak üdvözölni szeretnél?
            Szeretnék hallani rólad!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Küldj Üzenetet</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium mb-2"
                  >
                    Keresztnév
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="János"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium mb-2"
                  >
                    Vezetéknév
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Kovács"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="janos@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Tárgy
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Projekt ajánlat"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Üzenet
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Mesélj a projektedről vagy csak köszönj be..."
                />
              </div>

              <Button type="submit" className="w-full">
                Üzenet Küldése
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Elérhetőségek</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-1 text-muted-foreground">📧</div>
                <div>
                  <h3 className="font-medium">E-mail</h3>
                  <p className="text-muted-foreground">hello@example.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-1 text-muted-foreground">📍</div>
                <div>
                  <h3 className="font-medium">Helyszín</h3>
                  <p className="text-muted-foreground">
                    Budapest, Magyarország
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-1 text-muted-foreground">⏰</div>
                <div>
                  <h3 className="font-medium">Válaszidő</h3>
                  <p className="text-muted-foreground">
                    Általában 24 órán belül
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Kövess Engem</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Image
                    src="/icons/github.png"
                    alt="GitHub"
                    width={24}
                    height={24}
                    className="h-6 w-6 dark:invert"
                  />
                </a>
                <a
                  href="https://twitter.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Image
                    src="/icons/twitter.png"
                    alt="Twitter"
                    width={24}
                    height={24}
                    className="h-6 w-6 dark:invert"
                  />
                </a>
                <a
                  href="https://linkedin.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Image
                    src="/icons/linkedin.png"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="h-6 w-6 dark:invert"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
