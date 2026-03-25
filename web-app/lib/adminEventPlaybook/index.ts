export type { PlaybookCategory, PlaybookEvent } from './types';
export { buildEvent } from './buildEvent';
import { globalGatherings } from './catalogGlobalGatherings';
import { funFridays, localThursdays, careerCorner } from './catalogFunLocalCareer';
import { skillSharpeners, wellness } from './catalogSkillsWellness';
import { creativeCorner, tournaments } from './catalogCreativeTournaments';
import {
  socialImpact,
  seasonalNewYear,
  seasonalEaster,
  seasonalValentines,
  seasonalHalloween,
  seasonalThanksgiving,
  seasonalChristmas,
} from './catalogSocialSeasonal';

/** Tum kategoriler — sadece admin panelinde listelenir. */
export const ADMIN_EVENT_PLAYBOOK = [
  globalGatherings,
  funFridays,
  localThursdays,
  careerCorner,
  skillSharpeners,
  wellness,
  creativeCorner,
  tournaments,
  socialImpact,
  seasonalNewYear,
  seasonalEaster,
  seasonalValentines,
  seasonalHalloween,
  seasonalThanksgiving,
  seasonalChristmas,
] as const;

export function playbookEventCount(): number {
  return ADMIN_EVENT_PLAYBOOK.reduce((n, c) => n + c.events.length, 0);
}
