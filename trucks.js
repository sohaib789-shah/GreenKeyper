const express = require('express');
const router = express.Router();

let trucks = [
  { id: 1, driver: "John", fuel: 80 },
  { id: 2, driver: "Alex", fuel: 60 }
];


router.get('/', (req, res) => {
  res.json(trucks);
});

router.post('/', (req, res) => {
  const newTruck = req.body;
  trucks.push(newTruck);
  res.status(201).json({ message: "Truck added", truck: newTruck });
});


router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { fuel } = req.body;
  const truck = trucks.find(t => t.id === id);
  if (truck) {
    truck.fuel = fuel;
    res.json({ message: "Fuel updated", truck });
  } else {
    res.status(404).json({ message: "Truck not found" });
  }
});


router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  trucks = trucks.filter(t => t.id !== id);
  res.json({ message: "Truck deleted" });
});

module.exports = router;
