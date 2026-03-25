"use client";

import { useEffect, useRef, useState, ReactNode, forwardRef } from "react";
import { createPortal } from "react-dom";

interface IFramePreviewProps {
  children: ReactNode;
  className?: string;
}

const IFramePreview = forwardRef<HTMLIFrameElement, IFramePreviewProps>(({ children, className = "w-full h-full border-0" }, externalRef) => {
  const internalRef = useRef<HTMLIFrameElement>(null);
  const iframeRef = internalRef;
  const [contentRef, setContentRef] = useState<HTMLElement | null>(null);

  // Expose the iframe ref to parent
  useEffect(() => {
    if (typeof externalRef === 'function') {
      externalRef(internalRef.current);
    } else if (externalRef) {
      (externalRef as React.MutableRefObject<HTMLIFrameElement | null>).current = internalRef.current;
    }
  }, [externalRef]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    // Reset iframe padding and margin
    doc.body.style.margin = "0";
    doc.body.style.padding = "0";
    doc.body.style.backgroundColor = "transparent";

    // Setup initial fonts/base styles to match
    doc.documentElement.className = document.documentElement.className;
    doc.body.className = document.body.className;

    // Clone all existing style sheets and style blocks
    const parentHead = document.head;
    Array.from(parentHead.querySelectorAll('style, link[rel="stylesheet"]')).forEach((el) => {
      doc.head.appendChild(el.cloneNode(true));
    });

    // Listen for new fast-refresh styles or framer-motion injections
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'STYLE' || node.nodeName === 'LINK') {
            doc.head.appendChild(node.cloneNode(true));
          }
        });
      });
    });
    observer.observe(parentHead, { childList: true });

    // Intercept all link clicks to open in new tab instead of navigating within iframe
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href) {
        e.preventDefault();
        e.stopPropagation();
        window.open(anchor.href, '_blank', 'noopener,noreferrer');
      }
    };

    // Use capture phase to intercept clicks before they're handled
    doc.addEventListener('click', handleLinkClick, true);

    setContentRef(doc.body);

    return () => {
      observer.disconnect();
      doc.removeEventListener('click', handleLinkClick, true);
    };
  }, []);

  // Handle scroll-to-section messages from parent
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "scrollToSection") {
        const { selector } = event.data;
        const doc = iframe.contentDocument;
        if (!doc) return;

        // Try to find element using the selector
        const element = doc.querySelector(selector);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      ref={internalRef}
      className={className}
      title="Portfolio Preview"
    >
      {contentRef && createPortal(children, contentRef)}
    </iframe>
  );
});

IFramePreview.displayName = "IFramePreview";

export default IFramePreview;
