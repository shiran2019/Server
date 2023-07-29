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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherNIC: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    teacherNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    teacherEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    regDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Teacher.associate = (models) => {
    Teacher.hasMany(models.TchAttendance, {
      foreignKey: {
        name: "teacherId",
        primaryKey: true,
      },
      onDelete: "cascade",
    });
  };

  Teacher.associate = (models) => {
    Teacher.hasMany(models.Class, {
      foreignKey: {
        name: "teacherId",
      },
      onDelete: "cascade",
    });
  };
  return Teacher;
};
