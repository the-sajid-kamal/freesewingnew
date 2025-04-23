import { path, globDir, readJsonFile } from './fs.mjs'

export const getDesigns = async () => {
  const designs = {}
  const list = await getFolders('designs')
  for (const design of list) {
    const data = await readJsonFile(['designs', design, 'about.json'])
    if (!data.hide) designs[design] = data
  }

  return designs
}

export const getPackages = async () => {
  const packages = {}
  const list = await getFolders('packages')
  for (const pkg of list) {
    const data = await readJsonFile(['packages', pkg, 'about.json'])
    packages[pkg] = data
  }

  return packages
}

export const getPlugins = async () => {
  const plugins = {}
  const list = await getFolders('plugins')
  for (const plugin of list) {
    const data = await readJsonFile(['plugins', plugin, 'about.json'])
    plugins[plugin] = data
  }

  return plugins
}

export const getSoftware = async () => ({
  designs: await getDesigns(),
  packages: await getPackages(),
  plugins: await getPlugins(),
})

// Helper
const getFolders = async (dir) =>
  (await globDir(dir, '*')).map((file) => path.basename(file)).sort()
