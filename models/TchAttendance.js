module.exports = (sequelize, DataTypes) => {
  const TchAttendance = sequelize.define("TchAttendance", {
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

  TchAttendance.associate = (models) => {
    TchAttendance.belongsTo(models.Teacher, {
      foreignKey: {
        name: "teacherId",
        primaryKey: true,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return TchAttendance;
};
