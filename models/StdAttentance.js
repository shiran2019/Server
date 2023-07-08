module.exports = (sequelize, DataTypes) => {
  const StdAttendance = sequelize.define("StdAttendance", {
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true,
    },
    Attendance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  StdAttendance.associate = (models) => {
    StdAttendance.belongsTo(models.Student, {
      foreignKey: {
        name: "StudentId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return StdAttendance;
};
