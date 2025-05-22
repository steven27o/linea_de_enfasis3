// models/boletin.js

class Boletin {
  id = 0;
  title = "";
  description = "";
  create_at = new Date();
  update_at = new Date();
  published_at = new Date();

  constructor(id, title, description, create_at, update_at, published_at) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.create_at = create_at;
    this.update_at = update_at;
    this.published_at = published_at;
  }

  // Getters
  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getCreateAt() {
    return this.create_at;
  }

  getUpdateAt() {
    return this.update_at;
  }

  getPublishedAt() {
    return this.published_at;
  }

  // Setters
  setId(id) {
    this.id = id;
  }

  setTitle(title) {
    this.title = title;
  }

  setDescription(description) {
    this.description = description;
  }

  setCreateAt(create_at) {
    this.create_at = create_at;
  }

  setUpdateAt(update_at) {
    this.update_at = update_at;
  }

  setPublishedAt(published_at) {
    this.published_at = published_at;
  }

  // Devuelve todos los valores como objeto
  getValues() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      create_at: this.create_at,
      update_at: this.update_at,
      published_at: this.published_at,
    };
  }
}

module.exports = Boletin;
