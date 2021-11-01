const chalk = require("chalk");

module.exports = async (client, guild) => {
 console.log(chalk.bold(chalk.blue.bold(`[${client.user.username.toUpperCase().split(" ")[0]}]`)) + chalk.cyan.bold(` New guild joined: `) + chalk.blue.bold.underline(guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(guild.id) + chalk.cyan.bold(") This guild has ") + chalk.blue.bold.underline(guild.memberCount) + chalk.cyan.bold(" members!"));
};
