module.exports = (sequelize, DataTypes) => {
  const CreateEvo = sequelize.define("CreateEvo", {
    EvoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    EvoType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Activity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // CreateEvo.associate = (models) => {
  //   CreateEvo.hasMany(models.TermEvo),
  //     {
  //       foreignKey: {
  //         name: "EvoId",
  //       },
  //       onDelete: "cascade",
  //     };
  // };

  return CreateEvo;
};
