import about from '../about.json' with { type: 'json' }

export const plugin = {
  name: about.id,
  version: about.version,
  hooks: { insertText: (locale, text) => escapeSvgText(text) },
}

// More specifically named exports
export const escapeTextPlugin = plugin
export const pluginEscapeText = plugin

function escapeSvgText(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
