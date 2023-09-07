const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 1234;

let telefonos = [
  {
    id: 1,
    name: "Paco Paquito",
    number: "654332211",
  },
  {
    id: 2,
    name: "Josefa Josefina",
    number: "654332211",
  },
  {
    id: 3,
    name: "Pirri Pirelli",
    number: "654332211",
  },
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.send("<h1>Agenda telefónica</h1>");
});

app.get("/api/info", (request, response) => {
  const p1 = `<p>Se ${telefonos.length > 1 ? "han" : "ha"} encontrado ${
    telefonos.length
  } ${telefonos.length > 1 ? "números" : "número"}.</p>`;
  const p2 = new Date().toString();
  response.send(`${p1}${p2}`);
});

app.get("/api/contactos", (request, response) => {
  response.send(JSON.stringify(telefonos));
});

app.get("/api/contactos/:id", (request, response) => {
  const id = request.params.id;
  const contacto = telefonos.filter((tel) => tel.id === Number(id));
  response.send(JSON.stringify(contacto));
});

app.delete("/api/contactos/:id", (request, response) => {
  const id = request.params.id;
  telefonos = telefonos.filter((tel) => tel.id !== Number(id));
  response.status(204).send(`Contacto con id ${id} borrado con éxito.`);
});

app.post("/api/contactos", (request, response) => {
  const body = request.body;
  if (body.name && body.number) {
    const newContacto = {
      id: generateId(),
      name: body.name,
      number: body.number,
    };
    telefonos.push(newContacto);
    response
      .status(200)
      .send(`Contacto creado. ${JSON.stringify(newContacto)}`);
  } else {
    response.status(400).send("El cuerpo de la solicitud tiene fallos.");
  }
});

const generateId = () => {
  const maxId =
    telefonos.length > 0 ? Math.max(...telefonos.map((t) => t.id)) : 0;
  return maxId + 1;
};

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
