const historyController = require("../controllers/historyController");
const History = require("../models/history");

jest.mock("../models/history");

describe("History Controller", () => {
  describe("getHistory", () => {
    it("debería devolver una lista de historial con código 200", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      History.find.mockResolvedValue([{ product: "Producto 1", action: "created", user: "Usuario 1" }]);

      await historyController.getHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ product: "Producto 1", action: "created", user: "Usuario 1" }]);
    });

    it("debería devolver un error 500 si falla la búsqueda", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      History.find.mockRejectedValue(new Error("error en la base de datos"));

      await historyController.getHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });
  });

  describe("createHistory", () => {
    it("debería crear un historial y devolver el mismo historial con un código 201", async () => {
      const req = {
        body: { product: "Producto 1", action: "created", user: "Usuario 1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      History.prototype.save = jest.fn().mockResolvedValue(req.body);

      await historyController.createHistory(req.body.product, req.body.action, req.body.user);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });

  describe("getHistoryById", () => {
    it("debería devolver un historial por ID con código 200", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      History.findById.mockResolvedValue({
        product: "Producto 1",
        action: "created",
        user: "Usuario 1",
        _id: "123",
      });

      await historyController.getHistoryById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        product: "Producto 1",
        action: "created",
        user: "Usuario 1",
        _id: "123",
      });
    });

    it("debería devolver un 404 si no encuentra el ID del historial", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      History.findById.mockResolvedValue(null);

      await historyController.getHistoryById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Historial no encontrado' });
    });
  });

  describe("updateHistory", () => {
    it("debería actualizar un historial y devolver el mismo historial con un código 200", async () => {
      const req = {
        params: { id: "123" },
        body: { product: "Producto 1", action: "updated", user: "Usuario 1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      History.findByIdAndUpdate.mockResolvedValue({
        product: "Producto 1",
        action: "updated",
        user: "Usuario 1",
        _id: "123",
      });

      await historyController.updateHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        product: "Producto 1",
        action: "updated",
        user: "Usuario 1",
        _id: "123",
      });
    });

    it("debería devolver un 404 si no encuentra el ID del historial para actualizar", async () => {
      const req = {
        params: { id: "123" },
        body: { product: "Producto 1", action: "updated", user: "Usuario 1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      History.findByIdAndUpdate.mockResolvedValue(null);

      await historyController.updateHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Historial no encontrado' });
    });

    it("debería devolver un error 500 si falla la actualización", async () => {
      const req = {
        params: { id: "123" },
        body: { product: "Producto 1", action: "updated", user: "Usuario 1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      History.findByIdAndUpdate.mockRejectedValue(new Error("error en la base de datos"));

      await historyController.updateHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });
  });

  describe("deleteHistory", () => {
    it("debería eliminar un historial por ID y devolver un 200", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      History.findByIdAndDelete.mockResolvedValue({ message: `Historial con id 123 eliminado` });

      await historyController.deleteHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: `Historial con id 123 eliminado` });
    });

    it("debería devolver un 404 si no encuentra el ID del historial para ser eliminado", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      History.findByIdAndDelete.mockResolvedValue(null);

      await historyController.deleteHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Historial no encontrado' });
    });

    it("debería devolver un error 500 si falla la eliminación", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      History.findByIdAndDelete.mockRejectedValue(new Error("error en la base de datos"));

      await historyController.deleteHistory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });
  });
});