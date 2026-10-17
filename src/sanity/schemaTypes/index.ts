import { type SchemaTypeDefinition } from 'sanity'
import { contactMessage } from './contact-message'
import { guest } from './guest'
import { host } from './host'
import { initiative } from './initiative'
import { interview } from './interview'
import { journalEntry } from './journal-entry'
import { newsletter } from './newsletter'
import { subscriber } from './subscriber'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contactMessage, guest, host, interview, initiative, journalEntry, newsletter, subscriber],
}
