const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3001;

let persons = [
  { id: 1, name: 'John Doe', number: '010-1232-1289' },
  { id: 2, name: 'Ada Lovelace', number: '111-1111-1111' },
  { id: 3, name: 'Alicia Dane', number: '012-1352-2249' },
  { id: 4, name: 'James Dahn', number: '210-5222-8281' },
];

// ** GET

app.get('/', (req, res) => {
  const date = new Date();
  const html = `
    <h1>Phonebook has info for ${persons.length} people</h1>
    <h2>Server date: ${date}</h2>
  `;
  res.send(html);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const person = persons.find((p) => p.id === parseInt(id));

  if (!person) {
    res.send(404);
  } else {
    res.json(person);
  }
});

// ** DELETE

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  persons = persons.filter((p) => p.id !== parseInt(id));
  res.json(persons);
});

// ** POST

app.post('/api/persons', (req, res) => {
  const personId = Math.floor(Math.random() * 100);
  const { name, number } = req.body;

  const newPerson = {
    id: personId,
    name,
    number,
  };

  //! Error handling
  const personName = persons.map((p) => p.name);
  console.log(personName);

  if (!name || !number) return res.status(400).send('Data must be filled.');

  if (personName.includes(name)) {
    return res.status(404).send({ error: 'Name already exists' });
  } else {
    persons = persons.concat(newPerson);
    res.json(persons);
  }
  //! Error handling
});

// ! PORT

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
