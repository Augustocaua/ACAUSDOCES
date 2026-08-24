import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function resolveServerEntry(): Promise<ServerEntry> {
  const candidates: Array<() => Promise<unknown>> = [
    () => import("@tanstack/react-start/server-entry"),
    () => import("@tanstack/react-start/server"),
    () => import("@tanstack/react-start"),
    () => import("@tanstack/start/server-entry"),
    () => import("@tanstack/start/server"),
  ];

  let lastErr: unknown;
  for (const tryImport of candidates) {
    try {
      const m = (await tryImport()) as Record<string, unknown>;
      const resolved = (m.default ?? m) as Partial<ServerEntry>;
      if (typeof resolved.fetch === "function") {
        return resolved as ServerEntry;
      }
    } catch (err) {
      lastErr = err;
    }
  }
  throw new Error(
    "Nenhum server-entry do TanStack Start foi resolvido. Verifique a compatibilidade da versão instalada: " +
      String(lastErr instanceof Error ? lastErr.message : lastErr),
  );
}

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = resolveServerEntry();
  }
  return serverEntryPromise;
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
