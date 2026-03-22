"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface IFramePreviewProps {
  children: ReactNode;
  className?: string;
}

export default function IFramePreview({ children, className = "w-full h-full border-0" }: IFramePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [contentRef, setContentRef] = useState<HTMLElement | null>(null);

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

    setContentRef(doc.body);

    return () => observer.disconnect();
  }, []);

  return (
    <iframe
      ref={iframeRef}
      className={className}
      title="Portfolio Preview"
    >
      {contentRef && createPortal(children, contentRef)}
    </iframe>
  );
}
