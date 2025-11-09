import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rólam",
  description: "Tudj meg többet rólam és a munkámról.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Rólam</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Szia! Egy szenvedélyes fejlesztő vagyok, aki imád csodálatos webes
            élményeket létrehozni.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Az Utam</h2>
            <p className="text-muted-foreground leading-relaxed">
              Több éve vagyok jelen a webfejlesztés világában, folyamatosan
              tanulok és alkalmazkodom az új technológiákhoz. Az utam egyszerű
              HTML-lel és CSS-szel kezdődött, és modern keretrendszerekkel és
              eszközökkel bővült.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Amikor nem kódolok, új technológiák felfedezésével, nyílt
              forráskódú projektekhez való hozzájárulással vagy
              tudásmegosztással találkozhatsz a fejlesztői közösségben.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Mit Csinálok</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Full-stack webfejlesztés</li>
              <li>• React és Next.js alkalmazások</li>
              <li>• TypeScript és modern JavaScript</li>
              <li>• UI/UX tervezés és megvalósítás</li>
              <li>• Teljesítmény optimalizálás</li>
              <li>• Nyílt forráskódú hozzájárulások</li>
            </ul>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Lépj Velem Kapcsolatba
          </h2>
          <p className="text-muted-foreground mb-4">
            Mindig nyitott vagyok új lehetőségekre és együttműködésekre.
            Nyugodtan lépj kapcsolatba, ha szeretnél együtt dolgozni vagy csak
            technológiáról beszélgetni!
          </p>
          <div className="flex gap-4">
            <a
              href="mailto:hello@example.com"
              className="text-primary hover:underline"
            >
              hello@example.com
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/contact" className="text-primary hover:underline">
              Kapcsolatfelvétel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
