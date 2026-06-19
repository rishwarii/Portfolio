#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require("node:fs/promises");
const path = require("node:path");

const LOGOS = [
  {
    slug: "animo-sano-psychiatry",
    name: "Animo Sano Psychiatry",
    domain: "animosanopsychiatry.com",
    fallbackSimpleIconsSlug: null
  },
  {
    slug: "nagarro",
    name: "Nagarro",
    domain: "nagarro.com",
    fallbackSimpleIconsSlug: "nagarro"
  },
  {
    slug: "purdue-university",
    name: "Purdue University",
    domain: "purdue.edu",
    fallbackSimpleIconsSlug: "purdue"
  }
];

const SIMPLE_ICON_COLOR = "5b546f";
const OUTPUT_DIR = path.join(process.cwd(), "public", "logos");

function escapeAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function createPlaceholderSvg(name) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="${escapeAttribute(name)} logo placeholder">
  <rect x="1" y="1" width="62" height="62" rx="14" fill="#f4f2f8" stroke="#d2cbdf"/>
  <text x="32" y="37" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="700" fill="#5b546f">${escapeAttribute(initials)}</text>
</svg>
`;
}

function normalizeSvg(svg, name) {
  let output = svg
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .trim();

  output = output.replace(/<svg\b([^>]*)>/i, (full, attrs) => {
    let nextAttrs = attrs;
    if (!/xmlns=/i.test(nextAttrs)) {
      nextAttrs += ' xmlns="http://www.w3.org/2000/svg"';
    }
    if (!/viewBox=/i.test(nextAttrs)) {
      nextAttrs += ' viewBox="0 0 24 24"';
    }
    if (!/width=/i.test(nextAttrs)) {
      nextAttrs += ' width="24"';
    }
    if (!/height=/i.test(nextAttrs)) {
      nextAttrs += ' height="24"';
    }
    if (!/role=/i.test(nextAttrs)) {
      nextAttrs += ' role="img"';
    }
    if (!/aria-label=/i.test(nextAttrs)) {
      nextAttrs += ` aria-label="${escapeAttribute(name)} logo"`;
    }
    return `<svg${nextAttrs}>`;
  });

  output = output
    .replace(/fill="(?!none\b|transparent\b|url\(#)[^"]*"/gi, 'fill="currentColor"')
    .replace(/stroke="(?!none\b|transparent\b|url\(#)[^"]*"/gi, 'stroke="currentColor"');

  return `${output}\n`;
}

async function fetchSvg(url) {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "image/svg+xml,text/plain;q=0.9,*/*;q=0.8"
      }
    });

    if (!response.ok) {
      return null;
    }

    const body = await response.text();
    if (!body.includes("<svg")) {
      return null;
    }

    return body;
  } catch {
    return null;
  }
}

async function getLogoSvg(item) {
  if (item.fallbackSimpleIconsSlug) {
    const simpleIconCandidates = [
      `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${item.fallbackSimpleIconsSlug}.svg`,
      `https://cdn.simpleicons.org/${item.fallbackSimpleIconsSlug}/${SIMPLE_ICON_COLOR}`
    ];

    for (const simpleIconsUrl of simpleIconCandidates) {
      const simpleIconsSvg = await fetchSvg(simpleIconsUrl);
      if (simpleIconsSvg) {
        return {
          source: "simpleicons",
          svg: normalizeSvg(simpleIconsSvg, item.name)
        };
      }
    }
  }

  if (process.env.LOGO_DEV_TOKEN && item.domain) {
    const logoDevUrl = `https://img.logo.dev/${item.domain}?token=${encodeURIComponent(process.env.LOGO_DEV_TOKEN)}&format=svg`;
    const logoDevSvg = await fetchSvg(logoDevUrl);
    if (logoDevSvg) {
      return {
        source: "logo.dev",
        svg: normalizeSvg(logoDevSvg, item.name)
      };
    }
  }

  return {
    source: "placeholder",
    svg: createPlaceholderSvg(item.name)
  };
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, {
    recursive: true
  });

  const summary = [];

  for (const item of LOGOS) {
    const result = await getLogoSvg(item);
    const outputPath = path.join(OUTPUT_DIR, `${item.slug}.svg`);
    await fs.writeFile(outputPath, result.svg, "utf8");

    summary.push({
      logo: item.slug,
      source: result.source,
      status: result.source === "placeholder" ? "fallback" : "ok"
    });
  }

  console.log("\nLogo fetch summary:");
  console.table(summary);
}

main().catch((error) => {
  console.error("Failed to fetch logos:", error);
  process.exitCode = 1;
});
