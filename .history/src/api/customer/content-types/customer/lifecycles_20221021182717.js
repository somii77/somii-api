module.exports = {
  async afterUpdate(event) {
    const { data } = event.params;

    if (data.deleted) {
      const customer = await strapi.entityService.findOne(
        "api::customer.customer",
        data.id,
        {
          populate: ["users"],
        }
      );
      console.log("back data", customer);
      if (customer.users.length > 0) {
        for (let i = 0; i < customer.users.length; i++) {
          await strapi.entityService.update(
            "plugin::users-permissions.user",
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
