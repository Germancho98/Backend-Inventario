const Category = require("../models/category");
const categoryController = require("../controllers/categoryController");

jest.mock("../models/category");

describe("Category Controller", () => {
  describe("getCategories", () => {
    it("debería devolver una lista de categorías con código 200", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Category.find.mockResolvedValue([{ name: "Categoría 1" }]);

      // Llamada al controlador
      await categoryController.getCategories(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ name: "Categoría 1" }]);
    });

    it("debería devolver un error 500 si falla la búsqueda", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Category.find.mockRejectedValue(new Error("error en la base de datos"));

      await categoryController.getCategories(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "error en la base de datos" });
    });
  });

  describe("createCategory", () => {
    it("debería crear una categoría y devolver la misma categoría con un código 201", async () => {
      const req = {
        body: { name: "Categoría 1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Category.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(req.body),
      }));

      await categoryController.createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it("debería devolver un error 500 si falla la creación", async () => {
      const req = {
        body: { name: "Categoría 1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Category.prototype.save.mockRejectedValue(new Error("error en la base de datos"));

      await categoryController.createCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "error en la base de datos" });
    });
  });

  describe("updateCategory", () => {
    it("debería actualizar una categoría y devolverla con código 200", async () => {
      const req = {
        params: { id: "123" },
        body: { name: "Categoría Actualizada" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Category.findByIdAndUpdate.mockResolvedValue(req.body);

      await categoryController.updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it("debería devolver un 404 si no encuentra el ID de la categoría para ser actualizada", async () => {
      const req = {
        params: { id: "123" },
        body: { name: "Categoría Actualizada" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Category.findByIdAndUpdate.mockResolvedValue(null);

      await categoryController.updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Category not found" });
    });

    it("debería devolver un 500 cuando falla al actualizar la categoría por otra razón", async () => {
      const req = {
        params: { id: "123" },
        body: { name: "Categoría Actualizada" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Category.findByIdAndUpdate.mockRejectedValue(new Error("Error en la base de datos"));

      await categoryController.updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error en la base de datos" });
    });
  });

  describe("deleteCategory", () => {
    it("debería eliminar una categoría por ID y devolver un 200", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Category.findByIdAndDelete.mockResolvedValue({ _id: "123", name: "Categoría 1" });

      await categoryController.deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Category removed" });
    });

    it("debería devolver un 404 si no encuentra el ID de la categoría para ser eliminada", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Category.findByIdAndDelete.mockResolvedValue(null);

      await categoryController.deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: `Category with id: ${req.params.id} not found` });
    });

    it("debería devolver un 500 cuando falla al eliminar la categoría por otra razón", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Category.findByIdAndDelete.mockRejectedValue(new Error("Error en la base de datos"));

      await categoryController.deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error en la base de datos" });
    });
  });
});