module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("Teacher", {
    teacherId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherNIC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  Teacher.associate = (models) => {
    Teacher.hasMany(models.Class, {
      onDelete: "cascade",
    });
  };

  return Teacher;
};
