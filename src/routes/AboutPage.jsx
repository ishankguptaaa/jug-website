import ComingSoon from '../components/ComingSoon';
import { site } from '../content';

export default function AboutPage() {
  return (
    <ComingSoon
      title={`About ${site.name}`}
      seoTitle="About"
      intro="Our story, the people behind the community, and how to get involved."
      path="/about"
    />
  );
}
