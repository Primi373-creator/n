import BaseCommand from '../../libs/BaseCommand.js';

class NumberGuessCommand extends BaseCommand {
  constructor(client, handler) {
    super(client, handler, {
      command: 'numberguess',
      category: 'game',
      aliases: ['guess'],
      description: {
        content: 'Guess the correct number',
        usage: '[number]',
      },
      exp: 9,
    });
  }

  exec = async (M) => {
    if (this.handler.gameExists(M.from)) {
      return void (await M.reply('❌ There is already a game in progress.'));
    }

    const game = new NumberGuessGame();
    game.startGame(
      (message) => this.sendMessage(M.from, message),
      (message) => this.reply(M, message),
      (reaction) => this.react(reaction)
    );

    this.handler.setGame(M.from, game);
  };
}

class NumberGuessGame {
  constructor() {
    this.minNum = 0;
    this.maxNum = 200000;
    this.maxAttempts = 7;
    this.pointsPerGuess = 50;

    this.attempts = 0;
    this.playerPoints = 0;
    this.guessesTable = [];
    this.secretNumber = this.getRand();
    this.collector = null;
  }

  getRand() {
    return Math.floor(Math.random() * (this.maxNum - this.minNum + 1)) + this.minNum;
  }

  startGame(sendMessage, reply, react) {
    sendMessage(`Guess the number between ${this.minNum} and ${this.maxNum}. You have ${this.maxAttempts} attempts.`);

    this.collector = /* Set up your message collector here based on your bot's library */;
    this.collector.on('collect', async (userInput) => {
      const userGuess = parseInt(userInput);

      if (isNaN(userGuess) || userGuess < this.minNum || userGuess > this.maxNum) {
        await reply('Invalid guess! Please enter a number between ' + this.minNum + ' and ' + this.maxNum + '.');
        return;
      }

      this.attempts++;

      if (userGuess === this.secretNumber) {
        await reply(`Congratulations! You guessed the correct number in ${this.attempts} attempt(s).`);
        this.collector.stop();
      } else {
        react(userGuess < this.secretNumber ? '⬆️' : '⬇️');
        await reply(`You have ${this.maxAttempts - this.attempts} attempt(s) remaining.`);
      }

      if (this.attempts === this.maxAttempts) {
        await reply(`The correct number was ${this.secretNumber}. Game over!`);
        this.collector.stop();
      }
    });
  }
}

