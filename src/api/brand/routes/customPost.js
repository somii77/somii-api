// src/api/hello/routes/custom-hello.js

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/brands/custom-post",
      handler: "brand.customPost",
    },
  ],
};
