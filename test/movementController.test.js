const Movement = require("../models/movement");
const Product = require("../models/product");
const movementController = require("../controllers/movementController");

jest.mock("../models/movement");
jest.mock("../models/product");

describe("Movement Controller", () => {
  describe("getMovements", () => {
    it("debería devolver una lista de movimientos con código 200", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Movement.find.mockResolvedValue([{ product: "Producto 1", quantity: 10 }]);

      await movementController.getMovements(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ product: "Producto 1", quantity: 10 }]);
    });

    it("debería devolver un error 500 si falla la búsqueda", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Movement.find.mockRejectedValue(new Error("error en la base de datos"));

      await movementController.getMovements(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });
  });

  describe("createMovement", () => {
    it("debería crear un movimiento y devolver el mismo movimiento con un código 201", async () => {
      const req = {
        body: { product: "Producto 1", quantity: 10, movementType: "entry", user: "Usuario 1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findById.mockResolvedValue({ _id: "Producto 1", quantity: 10 });
      Product.prototype.save = jest.fn().mockResolvedValue({ _id: "Producto 1", quantity: 20 });
      Movement.prototype.save = jest.fn().mockResolvedValue(req.body);

      await movementController.createMovement(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it("debería devolver un 404 si no encuentra el producto", async () => {
      const req = {
        body: { product: "Producto 1", quantity: 10, movementType: "entry", user: "Usuario 1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findById.mockResolvedValue(null);

      await movementController.createMovement(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
    });

    it("debería devolver un 400 si no hay suficiente stock", async () => {
      const req = {
        body: { product: "Producto 1", quantity: 10, movementType: "exit", user: "Usuario 1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findById.mockResolvedValue({ _id: "Producto 1", quantity: 5 });

      await movementController.createMovement(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Not enough stock" });
    });
  });
});