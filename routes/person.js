const express = require('express');
const Person = require('../models/Person')
const router = express.Router();

/**
* @swagger
*  components:
*    schemas:
*      Person:
*        type: object
*        required:
*          - name
*          - surname
*          - age
*          - gender
*        properties:
*          id:
*            type: string
*            description: The auto-generated id by MongoDB of the person.
*          name:
*            type: string
*            description: The name of the person.
*          surname:
*            type: string
*            description: The surname of the person.
*          age:
*            type: number
*            description: The age in years of the person.
*          gender:
*            type: string
*            description: The gender of the person
*        example:
*           name: Miguel
*           surname: Alvarez
*           age: 24
*           gender: male
*/

/**
 * @swagger
 * /person:
 *   get:
 *     summary: Retrieve a list of all people
 *     description: Retrieve a list of all people from the database.
 *     responses:
 *       200:
 *         description: A list of people.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 */
router.get('/', (req, res) => {
  Person.find().then(data => {
    res.status(200).json(data);
  })
    .catch(error => {
      res.json({ error: error });
      console.log(error)
    });
});

/**
 * @swagger
 * /person/{id}:
 *   get:
 *     summary: Retrieve a specific person
 *     description: Retrieve a person from the database given a specific id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the person to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Person found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 */
router.get("/:id", (req, res) => {
  Person.findById(req.params.id).then(data => {
    res.status(200).json(data);
  })
    .catch(error => {
      res.json({ error: error });
      console.log(error)
    });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Creates a person
 *     description: Creates a person with the given data inside the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Person'
 *     responses:
 *       201:
 *         description: Person created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
*/
router.post('/', (req, res) => {
  const person = new Person({
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    gender: req.body.gender,
  });

  person.save()
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      res.json({ error: error });
      console.log(error)
    });

});

/**
 * @swagger
 * /person/{id}:
 *   delete:
 *     summary: Deletes a specific person
 *     description: Deletes a person from the database given a specific id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the person to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Person updated
 */
router.delete('/:id', (req, res) => {
  Person.deleteOne({ _id: req.params.id }).then(data => {
    res.status(204).json(data);
  })
    .catch(error => {
      res.json({ error: error });
      console.log(error)
    });
});

/**
 * @swagger
 * /person/{id}:
 *   patch:
 *     summary: Updates a specific person
 *     description: Updates a person from the database given a specific id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the person to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Person'
 *     responses:
 *       204:
 *         description: Person updated
 */
router.patch('/:id', (req, res) => {
  Person.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        gender: req.body.gender,
      },
    }).then(data => {
      res.status(204).json(data);
    })
    .catch(error => {
      res.json({ error: error });
      console.log(error)
    });
});


module.exports = router;