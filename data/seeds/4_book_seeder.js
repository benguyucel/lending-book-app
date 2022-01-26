/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('book').del()
      .then(function () {
        // Inserts seed entries
        return knex('book').insert([
          {name: 'name',publisher_id:1,author_id:1,page_count:"350"},
          {name: 'name',publisher_id:2,author_id:2,page_count:"350"},
          {name: 'name',publisher_id:3,author_id:3,page_count:"350"},
  
        ]);
      });
  };
  