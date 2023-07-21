module.exports = (sequelize, DataTypes) => {
    const GuestMeeting = sequelize.define("GuestMeeting", {
      
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
        guestNames: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      meetingType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      Discription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      Day: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  

      
    return GuestMeeting;
  };
  