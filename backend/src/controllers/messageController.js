import { Message } from '../models/Message.js';
import { sendContactNotification } from '../services/emailService.js';

export const createMessage = async (req, res, next) => {
  try {
    const message = await Message.create(req.body);
    sendContactNotification(message).catch(() => {});
    res.status(201).json({
      message: 'Your message has been sent successfully. Thank you!',
      id: message._id
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    const unreadCount = await Message.countDocuments({ read: false });
    res.json({ data: messages, unreadCount });
  } catch (error) {
    next(error);
  }
};

export const markMessageRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    res.json({ message: 'Message marked as read', data: message });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found.' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};
