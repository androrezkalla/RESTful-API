const express = require("express");
const app = express();
app.use(express.json())
const port = 4000;

// Sample resource populated by cars
const cars = [
    { id: 1, brand: 'Toyota', model: '86', year: 2020 },
    { id: 2, brand: 'Subaru', model: 'BRZ', year: 2019 },
    { id: 3, brand: 'Scion', model: 'FRS', year: 2021 }
]; 

app.get("/", (req, res) => {
  res.send("Welcome to Andro's custom API!");
});

//List all cars in the resources
app.get('/cars', (req, res) => {
    res.json(cars);
});

//Get car by ID
app.get("/cars/:id", (req, res) => {
    const carId = parseInt(req.params.id, 10);
    const car = cars.find((car) => car.id === carId);
    res.send(car);
});

// Create a new car post
function getNextIdFromCollection(collection) {
    if (collection.length === 0) return 1;
    const lastRecord = collection[collection.length - 1];
    return lastRecord.id + 1;
  }
  app.post("/cars", (req, res) => {
    const newCar = {
      ...req.body,
      id: getNextIdFromCollection(cars)
    };
    console.log("newCar", newCar);
    cars.push(newCar);
    res.send(newCar);
});
  
// Update a specific car
app.patch("/cars/:id", (req, res) => {
    const carId = parseInt(req.params.id, 10);
    const carUpdates = req.body;
    const carIndex = cars.findIndex(car => car.id === carId);
    const updatedCar = { ...cars[carIndex], ...carUpdates };
    cars[carIndex] = updatedCar;
    console.log("updatedCar", updatedCar);
    res.send(updatedCar);
});

// Delete a specefic car
app.delete("/cars/:id", (req, res) => {
    const carId = parseInt(req.params.id, 10);
    const carIndex = cars.findIndex(car => car.id === carId);
    cars.splice(carIndex, 1);
    res.send({ message: "Car deleted successfully" });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});