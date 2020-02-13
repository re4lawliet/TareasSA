import * as readline from 'readline'

class LineReader {
  constructor () {
    this.rl = readline.createInterface(process.stdin, process.stdout)
  }

  askQuestion (question) {
    return new Promise(resolve => {
      this.rl.question(question, (answer) => {
        resolve(answer)
      })
    })
  }

  async askNumericQuestion (question) {
    let data = ''
    while (!/^\d+$/.test(data = await this.askQuestion(question))) {
      console.log('Error, se esperaba un número')
    }
    return Number(data)
  }

  async askYesNoQuestion (question) {
    let data = ''
    while (!/^S|N|s|n$/.test(data = await this.askQuestion('Está seguro?(S/N):')));
    return /^S|s$/.test(data)
  }

  close () {
    this.rl.close()
  }
}

export const lineReader = new LineReader()
