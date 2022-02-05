/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('person', (table) => {
      //person
      table.increments();
      table.string('name', 25).notNullable();
      table.string('sur_name', 25).notNullable();
      table.text('adress', 300).nullable();

    }).createTable('publisher', (table) => {
      //publisher
      table.increments();
      table.string("name", 50)
      table.text("image_url").defaultTo("")
      table.boolean('status').defaultTo(true);

    }).createTable('author', (table) => {
      //author
      table.increments('id');
      table.string('name', 100)
      table.text("image_url").defaultTo("")
      table.boolean('status').defaultTo(true);
    })
    .createTable('book', (table) => {
      //book
      table.increments();
      table.string('name', 25).notNullable();
      table.integer('author_id').unsigned();
      table.foreign('author_id').references('author.id')
      table.integer('publisher_id').unsigned();
      table.foreign('publisher_id').references('publisher.id')
      table.text("image_url").defaultTo("")
      table.string('page_count', 4).notNullable();
      table.boolean('status').defaultTo(true);

    }).createTable('lending', (table) => {
      table.increments();
      table.integer("book_id").unsigned();
      table.foreign('book_id').references("book.id");
      table.integer('person_id').unsigned();
      table.foreign('person_id').references("person.id");
      table.timestamp('created_at', {
        useTz: false,
        precision: 6
      }).defaultTo(knex.fn.now(6));
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deliver__date').defaultTo(null);
      
    })
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

  return knex.schema.dropTable('lending')
    .dropTable('book')
    .dropTable('author')
    .dropTable('publisher')
    .dropTable('person')
};
