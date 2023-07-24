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
        type: DataTypes.DATEONLY,
        allowNull: false,
      }
    });
  
  
    return SpecialNote;
  };
  