import React from 'react';
import InvitationalEvents, { EVENTS_DATA } from './InvitationalEvents';

/**
 * EventsSection - The Fitness Club Invitational Events.
 * Re-exports the refined 4-card 35mm documentary InvitationalEvents component.
 */
export { EVENTS_DATA, InvitationalEvents };
export default function EventsSection(props) {
  return <InvitationalEvents {...props} />;
}
