module.exports = (sequelize, DataTypes) => {
  const TermEvo = sequelize.define("TermEvo", {
    Mark: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  TermEvo.associate = (models) => {
    TermEvo.belongsTo(models.Student, {
      foreignKey: {
        name: "StudentId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    TermEvo.belongsTo(models.CreateEvo, {
      foreignKey: {
        name: "EvoId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return TermEvo;
};
