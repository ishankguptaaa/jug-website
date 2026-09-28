import { Suspense, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollManager from '../components/ScrollManager';
import { initAOS } from '../lib/aos';
import { DEFAULT_PAGE_CHROME } from './pageChrome';

function skipToMain(e) {
  const main = document.getElementById('main');
  if (!main) return;
  e.preventDefault();
  main.focus();
  main.scrollIntoView();
}

/** Shared shell: skip link, header, lazy page outlet, footer. */
export default function SiteLayout() {
  // Pages override header tone / active nav item via usePageChrome().
  const [pageChrome, setPageChrome] = useState(DEFAULT_PAGE_CHROME);
  const outletContext = useMemo(() => ({ setPageChrome }), []);

  useEffect(() => {
    initAOS();
  }, []);

  return (
    <>
      <a
        href="#main"
        onClick={skipToMain}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:border-2 focus:border-black focus:rounded-lg focus:px-4 focus:py-2 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-black"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header tone={pageChrome.headerTone} activeNav={pageChrome.activeNav} />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Suspense fallback={<div className="min-h-[100vh]" aria-busy="true" />}>
          <Outlet context={outletContext} />
        </Suspense>
      </main>
      <Footer activeNav={pageChrome.activeNav} />
    </>
  );
}
