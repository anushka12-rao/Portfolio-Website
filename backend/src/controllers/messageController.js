import { Message } from '../models/Message.js';
import { sendContactNotification } from '../services/emailService.js';
import { isDBConnected } from '../config/database.js';
import { devStore } from '../utils/devStore.js';

export const createMessage = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const message = await Message.create(req.body);
      sendContactNotification(message).catch(() => {});
      return res.status(201).json({
        message: 'Your message has been sent successfully. Thank you!',
        id: message._id
      });
    }

    const newMsg = {
      _id: `msg_${Date.now()}`,
      ...req.body,
      read: false,
      createdAt: new Date().toISOString()
    };
    devStore.messages.unshift(newMsg);
    sendContactNotification(newMsg).catch(() => {});
    res.status(201).json({
      message: 'Your message has been sent successfully. Thank you!',
      id: newMsg._id
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminMessages = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const messages = await Message.find().sort({ createdAt: -1 }).lean();
      const unreadCount = await Message.countDocuments({ read: false });
      return res.json({ data: messages, unreadCount });
    }

    const unreadCount = devStore.messages.filter((m) => !m.read).length;
    res.json({ data: devStore.messages, unreadCount });
  } catch (error) {
    next(error);
  }
};

export const markMessageRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isDBConnected()) {
      const message = await Message.findByIdAndUpdate(
        id,
        { read: true },
        { new: true }
      );
      if (!message) return res.status(404).json({ error: 'Message not found.' });
      return res.json({ message: 'Message marked as read', data: message });
    }

    const msg = devStore.messages.find((m) => m._id === id);
    if (!msg) return res.status(404).json({ error: 'Message not found.' });
    msg.read = true;
    res.json({ message: 'Message marked as read', data: msg });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isDBConnected()) {
      const message = await Message.findByIdAndDelete(id);
      if (!message) return res.status(404).json({ error: 'Message not found.' });
      return res.json({ message: 'Message deleted successfully' });
    }

    const index = devStore.messages.findIndex((m) => m._id === id);
    if (index === -1) return res.status(404).json({ error: 'Message not found.' });
    devStore.messages.splice(index, 1);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
};
