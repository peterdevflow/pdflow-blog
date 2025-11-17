import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const t = useTranslations("blog");

  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    const url = new URL(
      baseUrl,
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000"
    );
    url.searchParams.set("page", page.toString());
    return url.pathname + url.search;
  };

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <nav
      className="flex items-center justify-between px-4 py-3 bg-background border-t border-border sm:px-6"
      aria-label="Pagination"
    >
      <div className="flex justify-between flex-1 sm:hidden">
        {currentPage > 1 ? (
          <Link
            href={getPageUrl(currentPage - 1)}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted"
          >
            {t("previous")}
          </Link>
        ) : (
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground bg-muted border border-border rounded-md cursor-not-allowed">
            {t("previous")}
          </span>
        )}

        {currentPage < totalPages ? (
          <Link
            href={getPageUrl(currentPage + 1)}
            className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-md hover:bg-muted"
          >
            {t("next")}
          </Link>
        ) : (
          <span className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-muted-foreground bg-muted border border-border rounded-md cursor-not-allowed">
            {t("next")}
          </span>
        )}
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {t("showingPage")}{" "}
            <span className="font-medium">{currentPage}</span> {t("of")}{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {currentPage > 1 && (
              <Link
                href={getPageUrl(currentPage - 1)}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-border bg-background text-sm font-medium text-foreground hover:bg-muted"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </Link>
            )}

            {getVisiblePages().map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 border border-border bg-background text-sm font-medium text-muted-foreground"
                  >
                    ...
                  </span>
                );
              }

              const isCurrentPage = page === currentPage;
              return (
                <Link
                  key={page}
                  href={getPageUrl(page as number)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    isCurrentPage
                      ? "z-10 bg-primary border-primary text-primary-foreground"
                      : "bg-background border-border text-foreground hover:bg-muted"
                  }`}
                  aria-current={isCurrentPage ? "page" : undefined}
                >
                  {page}
                </Link>
              );
            })}

            {currentPage < totalPages && (
              <Link
                href={getPageUrl(currentPage + 1)}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-border bg-background text-sm font-medium text-foreground hover:bg-muted"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
}
