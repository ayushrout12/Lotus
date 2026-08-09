/**
 * Minimal project parsing utilities for the agoodbackend-style generation flow.
 */

const NETLIFY_FUNCTION_BASE = "/.netlify/functions";

async function callNetlifyFunction(functionName, payload = {}) {
  const response = await fetch(`${NETLIFY_FUNCTION_BASE}/${functionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.error ||
      data?.message ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}

export async function generateProject(prompt) {
  return callNetlifyFunction("generate", { prompt });
}

export async function publishProject(project) {
  return callNetlifyFunction("publish", { project });
}

export async function serveProject(project, page = "index.html") {
  return callNetlifyFunction("serve", { project, page });
}

function extractFileBlocks(text) {
  if (!text || typeof text !== "string") return [];

  const headerRegex = /---FILE:(.*?)---/g;
  const headers = [];
  let match;

  while ((match = headerRegex.exec(text)) !== null) {
    headers.push({
      path: match[1].trim(),
      start: match.index,
      contentStart: headerRegex.lastIndex,
    });
  }

  return headers
    .map((header, index) => {
      const nextStart = headers[index + 1]?.start ?? text.length;
      let content = text.slice(header.contentStart, nextStart).replace(/^\s*/, "");

      if (content.startsWith("```")) {
        const firstNewline = content.indexOf("\n");
        content = firstNewline === -1 ? "" : content.slice(firstNewline + 1);
      } else if (content.startsWith("`")) {
        content = "";
      }

      content = content.replace(/\n?```[\t ]*$/, "");

      return {
        path: header.path,
        content: content.trimEnd(),
      };
    })
    .filter((file) => file.path);
}

export function parseFilesFromRaw(text) {
  return extractFileBlocks(text);
}

export function extractNextProject(text) {
  const files = parseFilesFromRaw(text);
  if (files.length === 0) return null;

  return {
    files: Object.fromEntries(files.map((file) => [file.path, file.content])),
  };
}

export function extractStreamingFile(text) {
  const files = extractFileBlocks(text);
  return files.length > 0 ? files[files.length - 1] : null;
}

export function getHtmlPages(project) {
  if (!project?.files || typeof project.files !== "object") return [];

  return Object.keys(project.files)
    .filter((path) => /\.html?$/i.test(path))
    .sort((a, b) => {
      if (a.toLowerCase() === "index.html" || a.toLowerCase() === "index.htm") return -1;
      if (b.toLowerCase() === "index.html" || b.toLowerCase() === "index.htm") return 1;
      return a.localeCompare(b);
    });
}

/**
 * Repair common model-output mistakes before a generated page is passed to the
 * preview iframe. This is deliberately conservative: it only unwraps markdown,
 * extracts an accidentally nested HTML file block, and normalizes JSX/module
 * script tags so EditableHtmlPreview can rewrite imports before Babel executes.
 */
function sanitizeHtmlPreview(value, pageKey) {
  if (typeof value !== "string") return "";
  let html = value.replace(/^\uFEFF/, "").trim();

  // Some responses accidentally save the entire multi-file answer as index.html.
  // Extract the requested HTML block instead of rendering the file markers/code.
  if (/---FILE:/i.test(html)) {
    const nested = extractFileBlocks(html);
    const preferred = nested.find((file) => file.path === pageKey)
      || nested.find((file) => /(^|\/)index\.html?$/i.test(file.path))
      || nested.find((file) => /\.html?$/i.test(file.path));
    if (preferred?.content) html = preferred.content.trim();
  }

  // Remove a single outer markdown fence such as ```html ... ```.
  const fenced = html.match(/^```(?:html?|jsx?|tsx?)?\s*\n([\s\S]*?)\n```\s*$/i);
  if (fenced) html = fenced[1].trim();

  // Remove stray fence lines that otherwise become visible text in the page.
  html = html
    .replace(/^```(?:html?|jsx?|tsx?)?\s*$/gim, "")
    .replace(/^```\s*$/gim, "")
    .trim();

  // Browser Babel can compile JSX only after EditableHtmlPreview has rewritten
  // ES imports. Normalize the common script types to the type its rewriter scans.
  html = html.replace(
    /<script\b([^>]*?)\btype=["'](?:module|text\/(?:jsx|tsx|javascript|typescript))["']([^>]*)>/gi,
    '<script$1type="text/babel"$2>'
  );

  // Generated pages sometimes omit a type even though the inline body contains
  // imports or JSX. Mark only those inline scripts; never alter external scripts.
  html = html.replace(
    /<script(?![^>]*\bsrc=)(?![^>]*\btype=)([^>]*)>([\s\S]*?)<\/script>/gi,
    (full, attrs, body) => {
      const looksLikeModule = /(^|\n)\s*(?:import\s|export\s)/m.test(body);
      const looksLikeJsx = /<[A-Z][A-Za-z0-9]*(?:\s|>|\/)/.test(body)
        || /return\s*\(\s*</.test(body);
      return looksLikeModule || looksLikeJsx
        ? `<script${attrs} type="text/babel">${body}</script>`
        : full;
    }
  );

  return html;
}

export function getHtmlPreviewContent(project, page = null) {
  if (!project?.files || typeof project.files !== "object") return "";

  const htmlPages = getHtmlPages(project);
  const pageKey = page || htmlPages[0] || "index.html";
  const value = project.files[pageKey];

  return sanitizeHtmlPreview(value, pageKey);
}
