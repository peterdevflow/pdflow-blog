"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";
import type { Metric } from "web-vitals";

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", process.env.NEXT_PUBLIC_GA_ID!, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  useEffect(() => {
    // Web Vitals tracking
    if (typeof window !== "undefined" && window.gtag) {
      onCLS((metric: Metric) => {
        window.gtag("event", "web_vitals", {
          event_category: "Web Vitals",
          event_label: "CLS",
          value: Math.round(metric.value * 1000),
          custom_map: { metric_value: metric.value },
        });
      });

      onINP((metric: Metric) => {
        window.gtag("event", "web_vitals", {
          event_category: "Web Vitals",
          event_label: "INP",
          value: Math.round(metric.value),
          custom_map: { metric_value: metric.value },
        });
      });

      onFCP((metric: Metric) => {
        window.gtag("event", "web_vitals", {
          event_category: "Web Vitals",
          event_label: "FCP",
          value: Math.round(metric.value),
          custom_map: { metric_value: metric.value },
        });
      });

      onLCP((metric: Metric) => {
        window.gtag("event", "web_vitals", {
          event_category: "Web Vitals",
          event_label: "LCP",
          value: Math.round(metric.value),
          custom_map: { metric_value: metric.value },
        });
      });

      onTTFB((metric: Metric) => {
        window.gtag("event", "web_vitals", {
          event_category: "Web Vitals",
          event_label: "TTFB",
          value: Math.round(metric.value),
          custom_map: { metric_value: metric.value },
        });
      });
    }
  }, []);

  // Only load GA script if GA_ID is provided
  if (!process.env.NEXT_PUBLIC_GA_ID) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_title: document.title,
              page_location: window.location.href
            });
          `,
        }}
      />
    </>
  );
}

// Extend window type for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
