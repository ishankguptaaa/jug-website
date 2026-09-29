import { useState } from 'react';
import { countLabel, getSpeakerDirectory, site } from '../content';
import Seo from '../components/Seo';
import Container from '../components/ui/Container';
import EmptyState from '../components/ui/EmptyState';
import { focusRing } from '../components/ui/focusRing';
import SpeakerCard from '../components/speakers/SpeakerCard';

const DESCRIPTION = `Everyone who has spoken at a ${site.name} meetup or conference — their talks, slides and recordings.`;

const directory = getSpeakerDirectory();

const matches = (speaker, query) =>
  [speaker.name, speaker.company].some((text) => text?.toLowerCase().includes(query));

export default function SpeakersPage() {
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const shown = needle ? directory.filter((speaker) => matches(speaker, needle)) : directory;

  return (
    <>
      <Seo title="Speakers" description={DESCRIPTION} path="/speakers" />

      <section className="bg-[#E1EEFB]">
        <Container size="xl" className="sm:max-w-[345px]">
          <div className="pt-12 pb-[80px] sm:pt-6 sm:pb-[40px] text-center">
            <h1 className="font-raleway font-medium text-[56px] leading-[65px] sm:text-[24px] sm:leading-[32px] md:text-[44px] md:leading-[52px]">
              Speakers
            </h1>
            <p className="mt-6 mx-auto max-w-[760px] font-raleway text-[18px] leading-[30px] sm:text-[14px] sm:leading-[24px]">
              Everyone who has shared their knowledge on a {site.name} stage. Pick a speaker to see
              their talks, slides and recordings.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#FFFCEF]">
        <Container className="pt-[100px] pb-[100px] sm:pt-[50px] sm:pb-[50px]">
          <div className="max-w-[560px] sm:mx-auto">
            <label htmlFor="speaker-search" className="block font-raleway font-semibold text-[18px] sm:text-[14px]">
              Search by name or company
            </label>
            <input
              id="speaker-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              className={`mt-3 w-full px-5 py-4 sm:px-4 sm:py-3 border border-black rounded-2xl bg-white font-raleway text-[16px] ${focusRing}`}
            />
          </div>
          <p role="status" className="sr-only">
            {countLabel(shown.length, 'speaker') ?? '0 speakers'}
          </p>

          <div className="pt-[48px] sm:pt-[24px]">
            {shown.length ? (
              <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-12 sm:gap-y-8">
                {shown.map((speaker) => (
                  <li key={speaker.slug}>
                    <SpeakerCard speaker={speaker} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title={needle ? 'No speakers found' : 'No speakers yet'}
                message={
                  needle
                    ? 'Nobody matches that search. Try a different name or company.'
                    : `Speakers appear here after their first session at ${site.name}.`
                }
              />
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
