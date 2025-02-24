// import { expect } from "chai";
// import sinon from "sinon";
// import {
//   createCategory,
//   deleteCategory,
//   getCategoryById,
// } from "../controllers/category.controller.js";
// import Category from "../models/category.model.js";

// describe("Category Controller", () => {
//   let req, res;

//   beforeEach(() => {
//     req = { body: {}, params: {} };
//     res = {
//       status: sinon.stub().returnsThis(),
//       json: sinon.stub(),
//     };
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   describe("createCategory", () => {
//     it("should create a new category", async () => {
//       req.body = { name: "Electronics" };
//       const savedCategory = { _id: "1", name: "Electronics" };
//       sinon.stub(Category, "findOne").resolves(null);
//       sinon.stub(Category.prototype, "save").resolves(savedCategory);

//       await createCategory(req, res);

//       expect(res.status.calledWith(201)).to.be.true;
//       expect(
//         res.json.calledWith({
//           message: "Category created successfully",
//           category: savedCategory,
//         })
//       ).to.be.true;
//     });

//     it("should return 400 if category exists", async () => {
//       req.body = { name: "Electronics" };
//       sinon.stub(Category, "findOne").resolves({ name: "Electronics" });

//       await createCategory(req, res);

//       expect(res.status.calledWith(400)).to.be.true;
//       expect(res.json.calledWith({ message: "Category already exists" })).to.be
//         .true;
//     });
//   });

//   // describe("getCategories", () => {
//   //   it("should return all categories", async () => {
//   //     const categories = [{ name: "Books" }, { name: "Electronics" }];
//   //     sinon
//   //       .stub(Category, "find")
//   //       .returns({ sort: sinon.stub().resolves(categories) });

//   //     await getCategories(req, res);

//   //     expect(res.status.calledWith(200)).to.be.true;
//   //     expect(res.json.calledWith(categories)).to.be.true;
//   //   });
//   // });

//   describe("getCategoryById", () => {
//     it("should return a category by ID", async () => {
//       req.params = { id: "1" };
//       const category = { _id: "1", name: "Books" };
//       sinon.stub(Category, "findById").resolves(category);

//       await getCategoryById(req, res);

//       expect(res.status.calledWith(200)).to.be.true;
//       expect(res.json.calledWith(category)).to.be.true;
//     });

//     it("should return 404 if category not found", async () => {
//       req.params = { id: "1" };
//       sinon.stub(Category, "findById").resolves(null);

//       await getCategoryById(req, res);

//       expect(res.status.calledWith(404)).to.be.true;
//       expect(res.json.calledWith({ message: "Category not found" })).to.be.true;
//     });
//   });

//   // describe("updateCategory", () => {
//   //   it("should update a category", async () => {
//   //     req.params = { id: "1" };
//   //     req.body = { name: "Updated Books" };
//   //     const updatedCategory = { _id: "1", name: "Updated Books" };
//   //     sinon.stub(Category, "findByIdAndUpdate").resolves(updatedCategory);

//   //     await updateCategory(req, res);

//   //     expect(res.status.calledWith(200)).to.be.true;
//   //     expect(
//   //       res.json.calledWith({
//   //         message: "Category updated successfully",
//   //         category: updatedCategory,
//   //       })
//   //     ).to.be.true;
//   //   });
//   // });

//   describe("deleteCategory", () => {
//     it("should delete a category", async () => {
//       req.params = { id: "1" };
//       sinon.stub(Category, "findByIdAndDelete").resolves({ _id: "1" });

//       await deleteCategory(req, res);

//       expect(res.status.calledWith(200)).to.be.true;
//       expect(res.json.calledWith({ message: "Category deleted successfully" }))
//         .to.be.true;
//     });
//   });
// });

import { expect } from "chai";
import sinon from "sinon";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";
import Category from "../models/category.model.js";

describe("Category Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("createCategory", () => {
    it("should create a new category", async () => {
      req.body = { name: "Electronics" };
      const savedCategory = { _id: "1", name: "Electronics" };
      sinon.stub(Category, "findOne").resolves(null);
      sinon.stub(Category.prototype, "save").resolves(savedCategory);

      await createCategory(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Category created successfully",
          category: savedCategory,
        })
      ).to.be.true;
    });

    it("should return 400 if category exists", async () => {
      req.body = { name: "Electronics" };
      sinon.stub(Category, "findOne").resolves({ name: "Electronics" });

      await createCategory(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: "Category already exists" })).to.be
        .true;
    });
  });

  describe("getCategories", () => {
    it("should return all categories", async () => {
      const categories = [
        { _id: "1", name: "Books" },
        { _id: "2", name: "Electronics" },
      ];
      sinon.stub(Category, "find").resolves(categories);

      await getCategories(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(categories)).to.be.true;
    });
  });

  describe("getCategoryById", () => {
    it("should return a category by ID", async () => {
      req.params = { id: "1" };
      const category = { _id: "1", name: "Books" };
      sinon.stub(Category, "findById").resolves(category);

      await getCategoryById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(category)).to.be.true;
    });

    it("should return 404 if category not found", async () => {
      req.params = { id: "1" };
      sinon.stub(Category, "findById").resolves(null);

      await getCategoryById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: "Category not found" })).to.be.true;
    });
  });

  describe("updateCategory", () => {
    it("should update a category", async () => {
      req.params = { id: "1" };
      req.body = { name: "Updated Books" };
      const existingCategory = {
        _id: "1",
        name: "Books",
        save: sinon.stub().resolves({ _id: "1", name: "Updated Books" }),
      };
      const updatedCategory = { _id: "1", name: "Updated Books" };
      sinon.stub(Category, "findByIdAndUpdate").resolves(existingCategory);

      await updateCategory(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWith({
          message: "Category updated successfully",
          category: updatedCategory,
        })
      ).to.be.true;
    });
  });

  describe("deleteCategory", () => {
    it("should delete a category", async () => {
      req.params = { id: "1" };
      sinon.stub(Category, "findByIdAndDelete").resolves({ _id: "1" });

      await deleteCategory(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: "Category deleted successfully" }))
        .to.be.true;
    });
  });
});
