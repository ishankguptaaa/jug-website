import './App.css';
import { lazy } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SiteLayout from './layouts/SiteLayout';
import { CDJ_2025_SLUG } from './content';

// Every route is its own chunk; SiteLayout wraps them in <Suspense>.
const HomePage = lazy(() => import('./routes/HomePage'));
const EventsPage = lazy(() => import('./routes/EventsPage'));
const EventDetailPage = lazy(() => import('./routes/EventDetailPage'));
const ConferencesPage = lazy(() => import('./routes/ConferencesPage'));
const ConferenceDetailPage = lazy(() => import('./routes/ConferenceDetailPage'));
const SpeakersPage = lazy(() => import('./routes/SpeakersPage'));
const SpeakerDetailPage = lazy(() => import('./routes/SpeakerDetailPage'));
const GalleryPage = lazy(() => import('./routes/GalleryPage'));
const GalleryDetailPage = lazy(() => import('./routes/GalleryDetailPage'));
const PartnersPage = lazy(() => import('./routes/PartnersPage'));
const AboutPage = lazy(() => import('./routes/AboutPage'));
const NotFoundPage = lazy(() => import('./routes/NotFoundPage'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:slug" element={<EventDetailPage />} />
            <Route path="conferences" element={<ConferencesPage />} />
            <Route path="conferences/:slug" element={<ConferenceDetailPage />} />
            {/* Legacy URL (shared widely) */}
            <Route path={CDJ_2025_SLUG} element={<Navigate replace to={`/conferences/${CDJ_2025_SLUG}`} />} />
            <Route path="speakers" element={<SpeakersPage />} />
            <Route path="speakers/:slug" element={<SpeakerDetailPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="gallery/:slug" element={<GalleryDetailPage />} />
            <Route path="partners" element={<PartnersPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
