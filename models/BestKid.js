module.exports = (sequelize, DataTypes) => {
    const BestKid = sequelize.define("BestKid", {
      
        stdName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      className: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      Day: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    BestKid.associate = (models) => {
        BestKid.belongsTo(models.Student, {
          foreignKey: {
            name: "StudentId",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
      };

    return BestKid;
  };
  