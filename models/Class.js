module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
    className: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  });

  Class.associate = (models) => {
    Class.hasMany(models.Student, {
      onDelete: "cascade",
    });
  };

  return Class;
};
