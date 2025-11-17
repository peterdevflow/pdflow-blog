import { useEffect, useState } from "react";

export function usePostViews(slug: string) {
  const [views, setViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        // Get current views from localStorage (client-side cache)
        const cacheKey = `post_views_${slug}`;
        const cachedViews = localStorage.getItem(cacheKey);
        const currentViews = cachedViews ? parseInt(cachedViews, 10) : 0;

        // Increment view count
        const newViews = currentViews + 1;
        setViews(newViews);
        localStorage.setItem(cacheKey, newViews.toString());

        // Optionally send to server for persistence
        // await fetch(`/api/posts/${slug}/views`, { method: 'POST' });

        setIsLoading(false);
      } catch (error) {
        console.error("Error tracking post views:", error);
        setIsLoading(false);
      }
    };

    incrementViews();
  }, [slug]);

  return { views, isLoading };
}
