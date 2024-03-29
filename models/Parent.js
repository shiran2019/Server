module.exports = (sequelize, DataTypes) => {
  const Parent = sequelize.define("Parent", {
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    fatherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatherNIC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fatherNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motherNIC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    motherNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pNote: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Parent.associate = (models) => {
    Parent.hasMany(models.Student, {
      foreignKey: "parentId",
    });
  };

  return Parent;
};
