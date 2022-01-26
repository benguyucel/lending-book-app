/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('publisher').del()
    .then(function () {
      // Inserts seed entries
      return knex('publisher').insert([{
          name: 'rowValue1'
        },
        {
          name: 'rowValue2'
        },
        {
          name: 'rowValue3'
        }
      ]);
    });
};