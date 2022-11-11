// src/api/hello/routes/custom-hello.js

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/brands/custom-delete/:id",
      handler: "brand.customDelete",
    },
  ],
};
