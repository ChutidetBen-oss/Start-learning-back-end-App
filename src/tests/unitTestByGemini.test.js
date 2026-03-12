import { describe, it, expect, vi } from "vitest";
import {
  createUser2,
  updateUser2,
  deleteUser2,
} from "../modules/users/users.controller.js";
import { User } from "../modules/users/users.model.js";

vi.mock("../modules/users/users.model.js", () => ({
  User: {
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
    findById: vi.fn(),
  },
}));

describe("User Controller", () => {
  it("should create a new user", async () => {
    const req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password",
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    const mockUser = {
      _id: "someid",
      username: "testuser",
      email: "test@example.com",
      toObject: () => ({
        _id: "someid",
        username: "testuser",
        email: "test@example.com",
      }),
    };

    User.create.mockResolvedValue(mockUser);

    await createUser2(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        _id: "someid",
        username: "testuser",
        email: "test@example.com",
      },
    });
  });

  it("should update a user", async () => {
    const req = {
      params: { id: "someid" },
      body: { username: "updateduser" },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    const mockUpdatedUser = {
      _id: "someid",
      username: "updateduser",
      email: "test@example.com",
      toObject: () => ({
        _id: "someid",
        username: "updateduser",
        email: "test@example.com",
      }),
    };

    User.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

    await updateUser2(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        _id: "someid",
        username: "updateduser",
        email: "test@example.com",
      },
    });
  });

  it("should delete a user", async () => {
    const req = {
      params: { id: "someid" },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    User.findByIdAndDelete.mockResolvedValue({ _id: "someid" });

    await deleteUser2(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: null,
    });
  });
});
