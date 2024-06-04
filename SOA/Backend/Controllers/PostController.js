const axios = require('axios');
const UserModel = require("../Models/UserModel");
const Post = require("../Models/PostModel");
const { ObjectId } = require('mongodb');

module.exports.createPost = async (req, res, next) => {
  try {
    const { title, description, price_per_hour,location, owner,owner_id,size, capacity, photo1, photo2, services } = req.body;
    
    console.log('Received data:', { title, description, price_per_hour,location,owner,owner_id ,size, capacity, photo1, photo2, services });

    // Assuming the profile endpoint returns user data if authenticated
 
    const newPost = await Post.create({ title, description, price_per_hour, location,owner,owner_id , size, capacity, photo1, photo2, services });
    console.log(typeof(owner_id));
    const postUpdateResult = await UserModel.findByIdAndUpdate(
      new ObjectId(owner_id),
      { $push: { posts: newPost._id } }, // Store only the ObjectId of the reservation
      { new: true, useFindAndModify: false })
    res.status(201).json({ message: "Post created successfully", success: true, post: newPost });
  } catch (error) {
    console.error("Error during post creation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.listPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: "Posts found successfully", success: true, post_list: posts });
  } catch (error) {
    console.error("Error listing posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getById = async (req, res, next) => {
    try {
      const postId = req.params.id;
      console.log(postId);
      const post = await Post.findById(postId)
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.status(200).json({ message: "Post found successfully", success: true, post });
    } catch (error) {
      console.error("Error getting post by ID:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };