module.exports = (sequelize, DataTypes) => {
  const StdPayment = sequelize.define("StdPayment", {
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Payment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  StdPayment.associate = (models) => {
    StdPayment.belongsTo(models.Student, {
      foreignKey: {
        name: "StudentId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return StdPayment;
};
