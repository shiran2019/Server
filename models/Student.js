module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    StudentId: {
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
    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pNote: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dayCare: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  });

  Student.associate = (models) => {
    Student.belongsTo(models.Parent, {
      foreignKey: {
        name: "parentId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Student.hasMany(models.TermEvo, {
      foreignKey: {
        name: "StudentId",
      },
      onDelete: "cascade",
    });

    Student.hasMany(models.StdAttendance, {
      foreignKey: {
        name: "StudentId",
        primaryKey: true,
      },
      onDelete: "cascade",
    });

    // Student.belongsTo(models.Class, {
    //   foreignKey: {
    //     name: "className",
    //   },
    //   onDelete: "CASCADE",
    //   onUpdate: "CASCADE",
    // });
  };

  return Student;
};
