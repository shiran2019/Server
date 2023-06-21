module.exports = (sequelize, DataTypes) => {
  const TermEvo = sequelize.define("TermEvo", {
    Mark: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return TermEvo;
};
