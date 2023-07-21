module.exports = (sequelize, DataTypes) => {
  const StdTransport = sequelize.define("StdTransport", {
    TransportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Transport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  StdTransport.associate = (models) => {  
    StdTransport.belongsTo(models.Student, {
      foreignKey: {
        name: "StudentId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };


  return StdTransport;
};
