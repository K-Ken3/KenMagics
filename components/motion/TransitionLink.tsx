'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { NAVIGATE_EVENT } from './PageTransition';

type TransitionLinkProps = ComponentProps<typeof Link> & { href: string };

export function TransitionLink({ href, onClick, children, ...props }: TransitionLinkProps) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        if (!href.startsWith('/')) return;
        event.preventDefault();
        window.dispatchEvent(new CustomEvent(NAVIGATE_EVENT, { detail: href }));
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
