const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [
    new Dotenv({
      systemvars: true, // Allows access to environment variables in the system environment
    }),
  ],
};
