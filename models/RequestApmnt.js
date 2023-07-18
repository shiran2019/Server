module.exports = (sequelize, DataTypes) => {
    const RequestApmnt = sequelize.define("RequestApmnt", {
        Note: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Day: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    RequestApmnt.associate = (models) => {
        RequestApmnt.belongsTo(models.Student, {
          foreignKey: {
            name: "StudentId",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });


        RequestApmnt.belongsTo(models.Teacher, {
            foreignKey: {
              name: "teacherId",
              
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          });

      };


  
    return RequestApmnt;
  };
  