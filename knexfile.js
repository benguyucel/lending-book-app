module.exports = {
    development:{
        client:"pg",
        connection:{
            database:"booklist",
            user:"admin",
            password:"1234"
        },
        migrations:{
            directory:"./data/migrations"
        },
        seeds:{
            directory:"./data/seeds"
        }
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
          directory: "./data/migrations",
        },
        seeds: {
          directory: "./data/seeds",
        },
      }
}