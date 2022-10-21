module.exports = {
  async afterUpdate(event) {
    const { data, populate } = event.params;

    if (data.deleted) {
      const customer = await strapi.entityService.findOne(
        "api::customer.customer",
        data.id,
        {
          populate: ["users"],
        }
      );
      console.log("back data", customer.users);
      if (customer.users.lenght > 0) {
        for (let i = 0; i < customer.users.lenght; i++) {
          await strapi.entityService.update(
            "api::user.user",
            customer.users[i].id,
            {
              data: { deleted: true, deleted_at: data.deleted_at },
            }
          );
        }
      }
    }
  },
};