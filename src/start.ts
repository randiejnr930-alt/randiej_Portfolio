import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const BLOCKED_COUNTRY = "BR";
const PRODUCTION_HOSTS = ["randy.international", "www.randy.international"];

const geoBlockMiddleware = createMiddleware().server(async ({ next, request }) => {
  const hostname = request.headers.get("host") ?? "";
  const country = (request as Request & { cf?: { country?: string } }).cf?.country;

  if (country === BLOCKED_COUNTRY && PRODUCTION_HOSTS.includes(hostname.toLowerCase())) {
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Access Restricted</title>
  <style>
    body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #e2e8f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
    .container { max-width: 28rem; text-align: center; }
    h1 { font-size: 1.875rem; font-weight: 800; margin-bottom: 1rem; }
    p { line-height: 1.6; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Access Restricted</h1>
    <p>This portfolio is not available in your region. If you believe this is a mistake, please contact the site owner.</p>
  </div>
</body>
</html>`,
      {
        status: 403,
        headers: { "content-type": "text/html; charset=utf-8" },
      },
    );
  }

  return next();
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [geoBlockMiddleware, errorMiddleware],
}));
