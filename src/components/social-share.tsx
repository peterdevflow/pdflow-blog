"use client";

import { Link2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined" ? window.location.origin + url : url;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="border-t border-border pt-8 mt-12">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Oszd meg barátaiddal!
        </h3>
      </div>

      <p className="text-muted-foreground mb-6">
        Ha tetszett a cikk, oszd meg másokkal is, hogy ők is élvezhessék!
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#191a1b] text-white rounded-lg hover:bg-[#1DA1F2]/90 transition-colors"
        >
          <Image
            src="/icons/twitter.png"
            alt="X"
            width={16}
            height={16}
            className="dark:invert"
          />
          {/* <span className="text-sm font-medium">X</span> */}
        </a>

        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#1877F2]/90 transition-colors"
        >
          <Image
            src="/icons/facebook.png"
            alt="Facebook"
            width={16}
            height={16}
            className="dark:invert"
          />
          {/* <span className="text-sm font-medium">Facebook</span> */}
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#0077B5]/90 transition-colors"
        >
          <Image
            src="/icons/linkedin.png"
            alt="LinkedIn"
            width={16}
            height={16}
            className="dark:invert"
          />
          {/* <span className="text-sm font-medium">LinkedIn</span> */}
        </a>

        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
        >
          <Link2 className="h-4 w-4" />
          <span className="text-sm font-medium">
            {copied ? "Másolva!" : "Link másolása"}
          </span>
        </button>
      </div>
    </div>
  );
}
