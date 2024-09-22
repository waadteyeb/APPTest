module.exports = (sequelize, Sequelize) => {
    const spendings = sequelize.define("spendings", {
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true,

        },     
        userid : {
            type:Sequelize.INTEGER,
        },
        count:{
            type:Sequelize.INTEGER,

        },
    
        type : {
            type:Sequelize.TEXT,
    
        }
        ,
    
        model : {
            type:Sequelize.TEXT,
    
        }
    },{
        freezeTableName: true,
        timestamps: true
    });
  
    return spendings;
  };