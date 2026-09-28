import ComingSoon from '../components/ComingSoon';
import Button from '../components/ui/Button';
import { getAllConferences } from '../content';

// Until the real listing lands (Phase 4), link every existing conference page
// so e.g. Community Day for Java 2025 stays reachable from the navigation.
const conferences = getAllConferences();

export default function ConferencesPage() {
  return (
    <ComingSoon
      title="Conferences"
      intro="Community Day for Java and our other flagship conferences, past and upcoming."
      path="/conferences"
      links={conferences.map((c) => (
        <Button key={c.slug} to={`/conferences/${c.slug}`}>
          {c.name}
        </Button>
      ))}
    />
  );
}
