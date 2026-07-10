export function normalizeUrl(url: string, baseUrl?: string): string {
  try {
    // Resolve relative URLs if baseUrl is provided
    const absoluteUrl = baseUrl ? new URL(url, baseUrl).toString() : url;
    const parsed = new URL(absoluteUrl);
    
    // Remove tracking parameters
    const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    trackingParams.forEach(param => {
      parsed.searchParams.delete(param);
    });
    
    return parsed.toString();
  } catch (e) {
    // If invalid URL, return original
    return url;
  }
}
