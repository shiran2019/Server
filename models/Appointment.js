module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define("Appointment", {
      
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
        text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      start: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      end: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      backColor: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    Appointment.associate = (models) => {
        Appointment.belongsTo(models.Teacher, {
        foreignKey: {
          name: "teacherId",
          
        },
        onDelete: "CASCADE",
        
      });
    };
  
    return Appointment;
  };
  