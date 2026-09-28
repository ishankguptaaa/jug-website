import Seo from '../components/Seo';
import { site } from '../content';
import Home from '../pages/Home';
import AboutCommunity from '../pages/AboutCommunity';
import Experts from '../pages/Experts';
import Sessions from '../pages/Sessions';
import Volunteer from '../pages/Volunteer';
import Reviews from '../pages/Reviews';
import { JoinJug } from '../pages/JoinJug';

// Section ids are kept for legacy bookmarks: /#about, /#speakers,
// /#sessions, /#volunteer, /#reviews (scrolled to by ScrollManager).
export default function HomePage() {
  return (
    <>
      <Seo fullTitle={`${site.name} - Official Community Page`} description={site.description} path="/" />
      <Home />
      <div id="about">
        <AboutCommunity />
      </div>
      <div id="speakers">
        <Experts />
      </div>
      <div id="sessions">
        <Sessions />
      </div>
      <div id="volunteer">
        <Volunteer />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
      <JoinJug />
    </>
  );
}
