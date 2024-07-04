module.exports = (sequelize, DataTypes) => {
  const StdPayment = sequelize.define("StdPayment", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Day: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Month: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    Payment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    StudentId: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
    },




  });


  return StdPayment;
};
