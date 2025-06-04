'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Lottie from 'lottie-react';
import animationData from '@/public/lotties/404.json';

export default function NotFound() {
  const router = useRouter();

  // Auto-redirect after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-16 text-center">
      <div className="w-64 sm:w-80 mb-8">
        <Lottie animationData={animationData} loop autoplay />
      </div>

      <h2 className="text-5xl sm:text-6xl font-bold text-red-600 mb-4">404</h2>
        <p className="text-lg sm:text-xl font-semibold mb-2">
          Oops! This page got lost in space 🚀
        </p>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mb-6">
          It might never have existed... or aliens took it. 👽<br />
          Don’t worry — we’re bringing you back to Earth soon!
        </p>

      <Link
        href="/"
        className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Back Me Home 🛸
      </Link>
    </main>
  );
}
