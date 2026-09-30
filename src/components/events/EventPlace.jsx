import { getEventPlaceLabel } from '../../content';
import ExternalLink from '../ui/ExternalLink';
import { linkClass } from '../ui/linkClass';

/** Where an event happens; events without a place (synced from Luma) link to Luma instead. Null if neither. */
export default function EventPlace({ event }) {
  return (
    getEventPlaceLabel(event) ||
    (event.externalUrl ? (
      <ExternalLink href={event.externalUrl} className={linkClass}>
        Venue details on Luma
      </ExternalLink>
    ) : null)
  );
}
