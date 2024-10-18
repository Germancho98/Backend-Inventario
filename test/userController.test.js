const userController = require("../controllers/userController");
const User = require("../models/user");

jest.mock("../models/user");

describe("User Controller", () => {
  describe("getUsers", () => {
    it("debería devolver una lista de usuarios con código 200", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.find.mockResolvedValue([{ username: "Usuario 1", role: "admin" }]);

      await userController.getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ username: "Usuario 1", role: "admin" }]);
    });

    it("debería devolver un error 500 si falla la búsqueda", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.find.mockRejectedValue(new Error("error en la base de datos"));

      await userController.getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });
  });

  describe("getUserById", () => {
    it("debería devolver un usuario por ID con código 200", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findById.mockResolvedValue({
        username: "Usuario 1",
        role: "admin",
        _id: "123",
      });

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        username: "Usuario 1",
        role: "admin",
        _id: "123",
      });
    });

    it("debería devolver un 404 si no encuentra el ID del usuario", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findById.mockResolvedValue(null);

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

  describe("registerUser", () => {
    it("debería crear un usuario y devolver un token con un código 201", async () => {
      const req = {
        body: { username: "Usuario 1", password: "password123" },
      };
      const res = mockResponse();
      User.exists.mockResolvedValue(false);
      bcrypt.hash.mockResolvedValue("hashedPassword");
      User.prototype.save = jest.fn().mockResolvedValue(req.body);
      jwt.sign.mockReturnValue("fakeToken");

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ token: "fakeToken" });
    });

    it("debería devolver un error 400 si el usuario ya existe", async () => {
      const req = {
        body: { username: "Usuario 1", password: "password123" },
      };
      const res = mockResponse();
      User.exists.mockResolvedValue(true);

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
    });

    it("debería devolver un error 500 si ocurre un error en la base de datos", async () => {
      const req = {
        body: { username: "Usuario 1", password: "password123" },
      };
      const res = mockResponse();
      User.exists.mockRejectedValue(new Error("error en la base de datos"));

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });

    it("debería devolver un error 500 si falla la creación", async () => {
      const req = {
        body: { username: "Usuario 1", password: "password123", role: "admin" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.prototype.save = jest.fn().mockRejectedValue(new Error("error en la base de datos"));

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });
  });

  describe("updateUser", () => {
    it("debería actualizar un usuario y devolver el mismo usuario con un código 200", async () => {
      const req = {
        params: { id: "123" },
        body: { username: "Usuario 1", role: "user" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findByIdAndUpdate.mockResolvedValue({
        username: "Usuario 1",
        role: "user",
        _id: "123",
      });

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        username: "Usuario 1",
        role: "user",
        _id: "123",
      });
    });

    it("debería devolver un 404 si no encuentra el ID del usuario para actualizar", async () => {
      const req = {
        params: { id: "123" },
        body: { username: "Usuario 1", role: "user" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findByIdAndUpdate.mockResolvedValue(null);

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it("debería devolver un error 500 si falla la actualización", async () => {
      const req = {
        params: { id: "123" },
        body: { username: "Usuario 1", role: "user" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findByIdAndUpdate.mockRejectedValue(new Error("error en la base de datos"));

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });
  });

  describe("deleteUser", () => {
    it("debería eliminar un usuario por ID y devolver un 200", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findByIdAndDelete.mockResolvedValue({ message: `User deleted successfully` });

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: `User deleted successfully` });
    });

    it("debería devolver un 404 si no encuentra el ID del usuario para ser eliminado", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findByIdAndDelete.mockResolvedValue(null);

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it("debería devolver un error 500 si falla la eliminación", async () => {
      const req = {
        params: { id: "123" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findByIdAndDelete.mockRejectedValue(new Error("error en la base de datos"));

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos" });
    });
  });
});