class task{
  constructor(id, title, desc, deadline){
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.deadline = deadline;
    this.completed = false;
  }
}

module.exports = task;