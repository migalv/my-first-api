const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My First API",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Migalv",
        email: "alvarez.lesmes.miguel@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000/api/person",
      },
    ],
  },
  apis: ["./routes/person.js"],
};

module.exports = options;