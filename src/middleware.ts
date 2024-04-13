import { notFound, redirectToDefaultLocale } from "astro:i18n";
import { defineMiddleware } from "astro:middleware";

import { ensureTrailingSlash } from "./lib/ensure-trailing-slash";

export const onRequest = defineMiddleware(async (context, next) => {
  console.log("***MIDDLEWARE***")
  
	const base = ensureTrailingSlash(import.meta.env.BASE_URL);
  const pathname = ensureTrailingSlash(context.url.pathname);

  if (pathname === "/keystatic/") {
    return next();
  }

  if (pathname === base) {
    /** FIXME: @see https://github.com/withastro/astro/issues/10620 */
    // return context.redirect(base + context.preferredLocale + "/", 307);
    const response = redirectToDefaultLocale(context, 307);

    if (response) {
      return response;
    }
  }

  const response = await next();

  const notFoundResponse = notFound(context, response);

  if (notFoundResponse) {
    return notFoundResponse;
  }

  return response;
});
