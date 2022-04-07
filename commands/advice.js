const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('advice')
    .setDescription('Replies with a random advice'),
  async execute(interaction) {


    async function getAdvice() {
      try {
        const response = await fetch('https://api.adviceslip.com/advice');

        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    }

    getAdvice().then(result => {
      const advice = result.slip.advice;
      interaction.reply(advice);
    });



  },
};