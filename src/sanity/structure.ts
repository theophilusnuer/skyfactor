import type { StructureBuilder } from 'sanity/structure';

/**
 * Premium dashboard structure for the SkyFactor studio.
 * Organises content into a clear editorial workspace.
 */
export function createStudioStructure(S: StructureBuilder) {
  const curated = ['host', 'interview', 'initiative', 'journalEntry', 'guest', 'newsletter', 'subscriber', 'contactMessage'];

  return S.list()
    .title('SkyFactor Studio')
    .items([
      S.listItem()
        .title('Host Profile')
        .icon(() => '🎙️')
        .child(
          S.document()
            .schemaType('host')
            .documentId('host')
            .title('Richard Sky — Host Profile'),
        ),
      S.divider(),
      S.listItem()
        .title('Watch & Listen')
        .icon(() => '▶️')
        .child(
          S.documentTypeList('interview')
            .title('Interviews — newest first')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
        ),
      S.divider(),
      S.listItem()
        .title('Initiatives')
        .icon(() => '🌍')
        .child(
          S.documentTypeList('initiative')
            .title('Initiatives')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),
      S.divider(),
      S.listItem()
        .title('Guests')
        .icon(() => '🎤')
        .child(
          S.list()
            .title('Guests')
            .items([
              S.listItem()
                .title("This week's guests")
                .icon(() => '⭐')
                .child(S.documentList().title("This week's guests").filter('_type == "guest" && thisWeek == true')),
              S.listItem()
                .title('Featured guests')
                .icon(() => '🌟')
                .child(S.documentList().title('Featured guests').filter('_type == "guest" && featured == true')),
              S.listItem()
                .title('All guests')
                .icon(() => '🎤')
                .child(S.documentTypeList('guest').title('All guests')),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Journal')
        .icon(() => '📓')
        .child(
          S.documentTypeList('journalEntry')
            .title('Journal — newest first')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
        ),
      S.divider(),
      S.listItem()
        .title('Newsletters')
        .icon(() => '📨')
        .child(S.documentTypeList('newsletter').title('Newsletters')),
      S.listItem()
        .title('Subscribers')
        .icon(() => '✉️')
        .child(
          S.documentTypeList('subscriber')
            .title('Subscribers')
            .defaultOrdering([{ field: 'subscribedAt', direction: 'desc' }]),
        ),
      S.listItem()
        .title('Contact messages')
        .icon(() => '💬')
        .child(
          S.documentTypeList('contactMessage')
            .title('Contact messages')
            .defaultOrdering([{ field: 'receivedAt', direction: 'desc' }]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !curated.includes(item.getId() ?? ''),
      ),
    ]);
}
