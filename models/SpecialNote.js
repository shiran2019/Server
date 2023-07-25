module.exports = (sequelize, DataTypes) => {
    const SpecialNote = sequelize.define("SpecialNote", {
     
        role: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
  
    return SpecialNote;
  };
  