// controllers/channel.controller.js
import Channel from "../models/channelModel.js";
import User from "../models/userModel.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    // Check if user already has a channel with same name
    const existing = await Channel.findOne({ channelName, owner: req.user._id });
    if (existing) return res.status(400).json({ message: "Channel already exists" });

    const newChannel = new Channel({
      channelName,
      description,
      channelBanner,
      owner: req.user._id,
    });

    const savedChannel = await newChannel.save();

    // Push to user's channels array
    req.user.channels.push(savedChannel._id);
    await req.user.save();

    res.status(201).json({ message: "Channel created", channel: savedChannel });
  } catch (err) {
    res.status(500).json({ message: "Failed to create channel", error: err.message });
  }
};

export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate("owner", "username avatar");
    if (!channel) return res.status(404).json({ message: "Channel not found" });

    res.status(200).json(channel);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch channel", error: err.message });
  }
};

export const getUserChannels = async (req, res) => {
  try {
    const channels = await Channel.find({ owner: req.user._id });
    res.status(200).json(channels);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user's channels", error: err.message });
  }
};
