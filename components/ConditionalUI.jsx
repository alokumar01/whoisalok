// components/ConditionalUI.jsx
"use client";
import { usePathname } from 'next/navigation';

export default function ConditionalUI({ children }) {
  const pathname = usePathname();
  const hidePaths = ['/studio']; // add any paths you want to hide global UI
  const shouldHide = hidePaths.some(path => pathname?.startsWith(path));

  if (shouldHide) return null;
  return <>{children}</>;
}
