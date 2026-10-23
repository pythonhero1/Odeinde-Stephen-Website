import React from "react";
import type { JsonLdNode } from "@/lib/seo/types";

interface JsonLdProps {
  nodes?: JsonLdNode[];
}

/**
 * Server component rendering sanitized JSON-LD structured data graph.
 * Enforces single-owner Schema.org @graph entity structure.
 */
export function JsonLd({ nodes }: JsonLdProps) {
  if (!nodes || nodes.length === 0) {
    return null;
  }

  const payload = {
    "@context": "https://schema.org",
    "@graph": nodes,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
