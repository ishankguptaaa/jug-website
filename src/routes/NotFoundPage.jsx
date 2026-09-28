import PageShell from '../components/PageShell';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <PageShell
      seo={{ title: 'Page not found', description: 'This page does not exist.', noindex: true }}
      eyebrow="404"
      title="Page not found"
      intro="The page you are looking for has moved or never existed."
      card={{
        title: 'Let’s get you back on track',
        message: 'Head to the homepage or browse our events.',
        action: (
          <>
            <Button to="/">Back to homepage</Button>
            <Button to="/events">Browse events</Button>
          </>
        ),
      }}
    />
  );
}
