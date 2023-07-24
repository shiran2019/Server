module.exports = (sequelize, DataTypes) => {
    const GuestMeeting = sequelize.define("GuestMeeting", {
      

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
  