import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info },
      patching: { patch },
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

    await generate({
      template: 'styles.ts.ejs',
      target: `.storybook/theme/components/${path}Styles.ts`,
      props: { name },
    })

    await patch('.storybook/theme/components/index.ts', {
      insert: `import ${name} from './${path}Styles' 
      
`,
      before: 'export {',
    })

    await patch('.storybook/theme/components/index.ts', {
      insert: `${name},`,
      before: '};',
    })

    await patch('.storybook/theme/components/index.ts', {
      insert: `
  ${name},`,
      after: 'export const AllComponents = {',
      force: true,
    })

    info(`Generated file at components/${path}`)
  },
}
