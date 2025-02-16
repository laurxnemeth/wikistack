// const pg = require ('pg')
// const client = new pg.C
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack',{
  logging: false
});


const Page = db.define('page', {
  title: {
    type: Sequelize.STRING, allowNull: false
  },
  slug: {
    type: Sequelize.STRING, allowNull: false
  },
  content: {
    type: Sequelize.TEXT, allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

Page.beforeValidate((pageInstance) => {

    if (pageInstance.slug === undefined){
      pageInstance.slug = pageInstance.title.replace(/\s+/g, '_').replace(/\W/g, "");
    }
})

const User = db.define('user', {
  name: { 
    type: Sequelize.STRING, allowNull: false
  },
  email: {
    type: Sequelize.STRING, allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

//module.exports = { Page, User };

module.exports = {
  db, Page, User
}