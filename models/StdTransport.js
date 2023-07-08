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

  return StdTransport;
};
