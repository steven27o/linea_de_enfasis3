class Boletin {
    id = 0;
    title = "";
    description = "";
    create_at = new Date();
    update_at = new Date();
    published = new Date();

    constructor(id,title,description,create_at,update_at,published) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.create_at = create_at;
        this.update_at = update_at;
        this.published_at = published;
    }
    
//Getters
getId() {
    return this.id;
}

getTitle() {
    return this.title;
}

getDescription() {
    return this.description;
}

getCreate_at() {
    return this.create_at;
}

getUpdate_at() {
    return this.create_at;
}

getPublished_at() {
    return this.published_at;
}

//Setters
setId(id) {
    this.id = id;
}

setTitle(title) {
    this.title = title
}

setDescription(description) {
    this.description = description
}

setCreateAt(create_at) {
    this.create_at = create_at
}

setUpdateAt(update_at) {
    this.update_at = update_at
}

setPublisherAt(publisher_at) {
    this.publisher_at = publisher_at
}

}