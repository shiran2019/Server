module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
    ClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Class.associate = (models) => {
    Class.belongsTo(models.Teacher, {
      foreignKey: {
        name: "teacherId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Class;
};
