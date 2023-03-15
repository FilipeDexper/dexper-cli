import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'dexper-cli',
  run: async (toolbox) => {
    const { print } = toolbox

    print.info('Welcome to your CLI')
  },
}

module.exports = command
