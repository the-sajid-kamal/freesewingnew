import { root, globDir, readJsonFile, writeFile } from '../../../scripts/fs.mjs'
import path from 'path'

const prefix = 'packages/react'
const cdir = ['prebuild', 'jsdoc', 'react', 'components']
const components = await globDir(cdir, '**/*.json')

for (const file of components) {
  const data = await processJsdocFile(file)
  await writeJsdocFiles(data)
}

async function processJsdocFile(file) {
  const all = {
    components: {},
  }
  const data = await readJsonFile([...cdir, path.basename(file)])
  const family = path.basename(file.slice(0, -5))
  all.components[family] = []
  for (const entry of data) {
    // Is it a component?
    const yes = entry.tags
      ? entry.tags.filter((tag) => tag.title === 'component').length > 0
      : false
    if (yes)
      all.components[family].push({
        family,
        name: entry.name,
        file: relativePath(entry.meta.filename, entry.meta.path),
        line: entry.meta.lineno,
        importAs: `import { ${entry.name} } from "${importPath(entry.meta.path)}"`,
        desc: entry.description,
        params: entry.params,
        return: entry.returns,
      })
  }

  return all
}

async function writeJsdocFiles(data) {
  for (const [family, d] of Object.entries(data.components)) {
    const code = d.map(
      (entry) => `export const jsdoc${entry.name} = ${JSON.stringify(entry)}` + '\n'
    )
    await writeFile(['prebuild', 'jsdoc', `components.${family}.mjs`], code)
  }
}

function importPath(folder) {
  return `@freesewing/react` + folder.split(prefix).pop()
}

function relativePath(filename, folder) {
  return prefix + folder.split(prefix).pop() + '/' + filename
}

function componentFamily(folder) {
  return folder.split(`${prefix}/components/`).pop()
}
