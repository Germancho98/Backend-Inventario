const reportController = require("../controllers/reportController");
const Product = require("../models/product");
const Movement = require("../models/movement");

jest.mock("../models/product");
jest.mock("../models/movement");

describe("Report Controller", () => {
  describe("getInventoryReport", () => {
    it("debería devolver un informe de inventario con código 200", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.find.mockResolvedValue([{ name: "Producto 1", quantity: 10, category: "Categoría 1" }]);

      await reportController.getInventoryReport(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ name: "Producto 1", quantity: 10, category: "Categoría 1" }]);
    });

    it("debería devolver un error 500 si falla la búsqueda", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.find.mockRejectedValue(new Error("error en la base de datos"));

      await reportController.getInventoryReport(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });
  });

  describe("getMovementReport", () => {
    it("debería devolver un informe de movimientos con código 200", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Movement.find.mockResolvedValue([{ product: "Producto 1", quantity: 5, movementType: "entry", user: "Usuario 1" }]);

      await reportController.getMovementReport(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ product: "Producto 1", quantity: 5, movementType: "entry", user: "Usuario 1" }]);
    });

    it("debería devolver un error 500 si falla la búsqueda", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Movement.find.mockRejectedValue(new Error("error en la base de datos"));

      await reportController.getMovementReport(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });
  });
});