/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('person').del()
    .then(function () {
      // Inserts seed entries
      return knex('person').insert([
        {name: 'name',sur_name:"Sur"},
        {name: 'name',sur_name:"Sur"},
        {name: 'name',sur_name:"Sur"},

      ]);
    });
};
