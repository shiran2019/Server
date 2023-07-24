module.exports = (sequelize, DataTypes) => {
    const Today = sequelize.define("Today", {
      
         
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
        text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      start: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      end: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      backColor: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
  
    return Today;
  };
  