import bcrypt from "bcryptjs";
import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import sinon from "sinon";
import { app } from "../index.js"; // Import your Express app
import { User } from "../models/user.model.js";

// Use Chai plugins
chai.use(chaiHttp);
const { expect } = chai;

describe("User Controller Tests", () => {
  let userStub, bcryptStub, jwtStub, nodemailerStub, cryptoStub;

  beforeEach(() => {
    userStub = sinon.stub(User, "findOne");
    bcryptStub = sinon.stub(bcrypt, "compare");
    jwtStub = sinon.stub(jwt, "sign");
    nodemailerStub = sinon.stub(nodemailer, "createTransport").returns({
      sendMail: sinon.stub().resolves(), // Mock sendMail function
    });
    cryptoStub = sinon.stub(crypto, "randomBytes").returns({
      toString: sinon.stub().returns("mockedToken"),
    });
  });

  afterEach(() => {
    sinon.restore(); // Restore all stubbed methods
  });

  // Test: Forgot Password
  describe("POST /api/v1/user/forgetPassword", () => {
    it("should send a password reset email", async () => {
      const saveStub = sinon.stub().resolves(); // Stub for user.save()
      userStub.resolves({
        _id: "123",
        email: "test@example.com",
        save: saveStub,
      });

      const res = await chai
        .request(app)
        .post("/api/v1/user/forgetPassword")
        .send({ email: "test@example.com" });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property(
        "message",
        "Password reset email sent successfully"
      );
    });

    it("should return an error if email is not found", async () => {
      userStub.resolves(null);

      const res = await chai
        .request(app)
        .post("/api/v1/user/forgetPassword")
        .send({ email: "unknown@example.com" });

      expect(res).to.have.status(404);
      expect(res.body).to.have.property("message", "User not found");
    });
    it("should return an error if sending email is not working", async () => {
      const saveStub = sinon.stub().resolves(); // Stub for user.save()
      userStub.resolves({
        _id: "123",
        email: "test@example.com",
        save: saveStub,
      });
      nodemailerStub = sinon.stub(nodemailer, "createTransport").returns({
        sendMail: sinon.stub().rejects(new Error("nodemailer is not working")), // Mock sendMail function
      });

      const res = await chai
        .request(app)
        .post("/api/v1/user/forgetPassword")
        .send({ email: "test@example.com" });

      expect(res).to.have.status(500);
      expect(res.body).to.have.property(
        "message",
        "Failed to send password reset email"
      );
    });
  });
  describe("POST /api/v1/user/reset-password/:token", () => {
    it("should reset password successfully", async () => {
      const saveStub = sinon.stub().resolves();
      bcryptStub.resolves(true);

      userStub.resolves({
        _id: "testUserId",
        resetPasswordToken: "hashedToken",
        resetPasswordExpires: Date.now() + 600000, // Valid expiry
        password: "oldPassword",
        save: saveStub,
      });

      bcryptStub.onCall(1).resolves("hashedNewPassword"); // Mock bcrypt to return hashed new password on second call

      const res = await chai
        .request(app)
        .post("/api/v1/user/reset-password/validToken") // Replace with a valid token
        .send({ newPassword: "StrongPassword1!" });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property(
        "message",
        "Password reset successfully"
      );
      expect(saveStub.calledOnce).to.be.true;
    });

    it("should return an error for missing token", async () => {
      const res = await chai
        .request(app)
        .post("/api/v1/user/reset-password/") // Missing the :token parameter
        .send({ newPassword: "NewPassword1!" });

      expect(res).to.have.status(404); // Should give Not Found error if the url is not found
    });

    it("should return an error for an invalid or expired token", async () => {
      userStub.resolves(null);

      const res = await chai
        .request(app)
        .post("/api/v1/user/reset-password/invalidToken")
        .send({ newPassword: "NewPassword1!" });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property(
        "message",
        "Invalid or expired reset token"
      );
    });
  });
});
