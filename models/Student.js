module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    studentId: {
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
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regyear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pNote: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Student.associate = (models) => {
    Student.hasMany(models.StdAttendance),
      {
        onDelete: "cascade",
      };
  };

  Student.associate = (models) => {
    Student.hasMany(models.StdTransport),
      {
        onDelete: "cascade",
      };
  };

  Student.associate = (models) => {
    Student.hasMany(models.StdPayment),
      {
        onDelete: "cascade",
      };
  };

  Student.associate = (models) => {
    Student.hasMany(models.TermEvo, {
      foreignKey: {
        name: "StudentId",
        primaryKey: true,
      },
      onDelete: "cascade",
    });
  };

  return Student;
};
