exports.up = (knex, Promise) => {
  return knex.schema.createTable("experience_rating", (table) => {
    table.increments("id").primary();
    table.string("user_id"); 
    table.string("experience_id");
    table.boolean("is_helpful");
    table.integer("date_liked");
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable("experience_rating");
};
