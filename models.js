const uuid = require('uuid');

const Quiz = {
  create: function(name) {
    console.log('Creating new quiz');
    const item = {
      name: name,
      id: uuid.v4(),
	  questions: []
    };
    this.items[item.id] = item;
    return item;
  },
  get: function() {
    console.log('Retrieving quiz');
    return Object.keys(this.items).map(key => this.items[key]);
  },
  delete: function(id) {
    console.log(`Deleting quiz \`${id}\``);
    delete this.items[id];
  },
  update: function(updatedItem) {
    console.log(`Deleting quiz \`${updatedItem.id}\``);
    const {id} = updatedItem;
    if (!(id in this.items)) {
      throw new Error(
        `Can't update item \`${id}\` because doesn't exist.`)
    }
    this.items[updatedItem.id] = updatedItem;
    return updatedItem;
  }
};

function createQuiz() {
  const storage = Object.create(Quiz);
  storage.items = {};
  return storage;
}

module.exports = createQuiz();