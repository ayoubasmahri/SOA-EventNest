const Reservation = require("../Models/Reservation");
const UserModel = require("../Models/UserModel");
const PostModel = require("../Models/PostModel");
const { ObjectId } = require("mongodb");

module.exports = {
    create: async (req, res, next) => {
        try {
          let { post,creator, dateStart, dateEnd } = req.body;
    
          console.log('Received data:', { post, creator,dateStart, dateEnd });
    
          const result = await PostModel.findById(post);
    
          if (!result) {
            return res.status(404).json({ message: "Post not found", success: false });
          }
    
          const existingReservations = result.reservations;
    
          dateStart = new Date(dateStart);
          dateEnd = new Date(dateEnd);
    
          for (const reservationId of existingReservations) {
            const reservation = await Reservation.findById(reservationId);
            if (!reservation) {
              // Handle the case where the reservation document does not exist
              console.error(`Reservation with ID ${reservationId} not found`);
              continue;
            }
    
            const reservationStart = new Date(reservation.dateStart);
            const reservationEnd = new Date(reservation.dateEnd);
    
            if (
              (dateStart >= reservationStart && dateStart < reservationEnd) ||
              (dateEnd > reservationStart && dateEnd <= reservationEnd) ||
              (dateStart <= reservationStart && dateEnd >= reservationEnd)
            ) {
              return res.status(400).json({ message: "Room already reserved for this time period", success: false });
            }
          }
    
          const mReservation = new Reservation({ post, creator,dateStart, dateEnd });
          await mReservation.save();
    
          const postUpdateResult = await PostModel.findByIdAndUpdate(
            new ObjectId(post),
            { $push: { reservations: mReservation._id } }, // Store only the ObjectId of the reservation
            { new: true, useFindAndModify: false }
          );
          const CreatorUpdateResult = await UserModel.findByIdAndUpdate(
            new ObjectId(creator),
            { $push: { reservations: mReservation._id } }, // Store only the ObjectId of the reservation
            { new: true, useFindAndModify: false }
          );
          if (postUpdateResult && CreatorUpdateResult) {
            console.log("Document updated successfully:", postUpdateResult);
            console.log("Reservation created successfully");
            console.log("Document updated successfully:", CreatorUpdateResult);
            console.log("Reservation created successfully");
            return res.status(201).json({ message: "Reservation created successfully", success: true, post: postUpdateResult });
          } else {
            console.log("Document not found or not updated.");
            return res.status(500).json({ message: "Failed to update post", success: false });
          }
        } catch (error) {
          console.error("Error during reservation creation:", error);
          return res.status(500).json({ message: "Error creating reservation: " + error.message, success: false });
        }
      },

  list: async (req, res, next) => {
    try {
      const reservations = await Reservation.find();
      console.log(reservations);
      res.status(200).json({ message: "Reservations found successfully", success: true, reservation_list: reservations });
    } catch (error) {
      console.error("Error listing reservations:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
}
module.exports.getById = async (req, res, next) => {
    try {
      const resId = req.params.id;
      console.log(resId);
      const reservation = await Reservation.findById(resId);
  
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
  
      res.status(200).json({ message: "Reservation found successfully", success: true, reservation });
    } catch (error) {
      console.error("Error getting reservation by ID:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
