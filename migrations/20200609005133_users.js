exports.up = (knex, Promise) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("uid");
    table.string("name");
    table.string("email");
    table.string("bio");
    table.string("occupation");
    table.string("position");
    table.string("company");
    table.string("location");
    table.boolean("hide_name")
    table.boolean("hide_occupation")
    table.boolean("hide_company")
    table.boolean("hide_location")
    table.string("comes_from")
    table.date("date_created")
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("users");
};
