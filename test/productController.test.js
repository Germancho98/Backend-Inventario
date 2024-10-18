const Product = require("../models/product");
const productController = require("../controllers/productController");

jest.mock("../models/product");

describe("Product Controller", () => {
  describe("getProducts", () => {
    it("debería devolver una lista de productos con código 200", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.find.mockResolvedValue([{ name: "Producto 1", quantity: 10 }]);

      await productController.getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ name: "Producto 1", quantity: 10 }]);
    });

    it("debería devolver un error 500 si falla la búsqueda", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.find.mockRejectedValue(new Error("error en la base de datos"));

      await productController.getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });
  });

  describe("createProduct", () => {
    it("debería crear un producto y devolver el mismo producto con un código 201", async () => {
      const req = {
        body: { name: "Producto 1", quantity: 10 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.prototype.save = jest.fn().mockResolvedValue(req.body);

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });

  describe("updateProduct", () => {
    it("debería actualizar un producto y devolverlo con código 200", async () => {
      const req = {
        params: { id: "123" },
        body: { name: "Producto Actualizado", quantity: 20 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findByIdAndUpdate.mockResolvedValue(req.body);

      await productController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it("debería devolver un 404 si no encuentra el ID del producto para ser actualizado", async () => {
      const req = {
        params: { id: "123" },
        body: { name: "Producto Actualizado", quantity: 20 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findByIdAndUpdate.mockResolvedValue(null);

      await productController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
    });

    it("debería devolver un 500 cuando falla al actualizar el producto por otra razón", async () => {
      const req = {
        params: { id: "123" },
        body: { name: "Producto Actualizado", quantity: 20 },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findByIdAndUpdate.mockRejectedValue(new Error("Error en la base de datos"));

      await productController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error en la base de datos" });
    });
  });

  describe("deleteProduct", () => {
    it("debería eliminar un producto por ID y devolver un 200", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findByIdAndDelete.mockResolvedValue({ message: `Product with id 123 deleted` });

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: `Product with id 123 deleted` });
    });

    it("debería devolver un 404 si no encuentra el ID del producto para ser eliminado", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findByIdAndDelete.mockResolvedValue(null);

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
    });

    it("debería devolver un 500 cuando falla al eliminar el producto por otra razón", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Product.findByIdAndDelete.mockRejectedValue(new Error("Error en la base de datos"));

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error en la base de datos" });
    });
  });
});