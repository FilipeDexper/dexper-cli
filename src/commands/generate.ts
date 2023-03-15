import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info },
    } = toolbox

    const path = parameters.first

    const name = path.split('/').at(-1)
    const lowercaseName = name.charAt(0).toLowerCase() + name.slice(1)

    await generate({
      template: 'component.ts.ejs',
      target: `src/components/${path}/${name}.tsx`,
      props: { name },
    })

    await generate({
      template: 'test.ts.ejs',
      target: `src/components/${path}/${name}.test.tsx`,
      props: { name, lowercaseName },
    })

    await generate({
      template: 'stories.ts.ejs',
      target: `src/components/${path}/${name}.stories.tsx`,
      props: { name, path },
    })

    await generate({
      template: 'doc.ts.ejs',
      target: `src/components/${path}/${name}.stories.mdx`,
      props: { name, path },
    })

    info(`Generated file at models/${name}-model.ts`)
  },
}
