import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{t("journey.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("journey.description1")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("journey.description2")}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{t("skills.title")}</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• {t("skills.items.0")}</li>
              <li>• {t("skills.items.1")}</li>
              <li>• {t("skills.items.2")}</li>
              <li>• {t("skills.items.3")}</li>
              <li>• {t("skills.items.4")}</li>
              <li>• {t("skills.items.5")}</li>
            </ul>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">{t("contact.title")}</h2>
          <p className="text-muted-foreground mb-4">
            {t("contact.description")}
          </p>
          <div className="flex gap-4">
            <a
              href="mailto:hello@example.com"
              className="text-primary hover:underline"
            >
              {t("contact.email")}
            </a>
            <span className="text-muted-foreground">•</span>
            <Link href="contact" className="text-primary hover:underline">
              {t("contact.contactLink")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
