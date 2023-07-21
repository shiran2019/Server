module.exports = (sequelize, DataTypes) => {
    const Today = sequelize.define("Today", {
      
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      Note: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      Day: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      }
    });
  
  
    return Today;
  };
  