module.exports = (sequelize, DataTypes) => {
  const TchSalary = sequelize.define("TchSalary", {
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Month: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    Salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    Basic: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    epfRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Allowance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  TchSalary.associate = (models) => {
    TchSalary.belongsTo(models.Teacher, {
      foreignKey: {
        name: "teacherId",
        primaryKey: true,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return TchSalary;
};
