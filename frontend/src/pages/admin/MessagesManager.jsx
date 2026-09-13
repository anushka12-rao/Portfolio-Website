import React, { useState, useEffect } from 'react';
import {
  Mail,
  MailOpen,
  Trash2,
  X
} from 'lucide-react';
import Badge from '../../components/common/Badge';
import { messageService } from '../../services/messageService';

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await messageService.getAdminMessages();
      setMessages(res.data || []);
      setUnreadCount(res.unreadCount || 0);
    } catch (err) {
      console.warn('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await messageService.markAsRead(id);
      fetchMessages();
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage((prev) => ({ ...prev, read: true }));
      }
    } catch (err) {
      console.warn('Error marking read:', err);
    }
  };

  const handleDelete = async (id, senderName) => {
    if (!window.confirm(`Delete message from ${senderName}?`)) return;

    try {
      await messageService.deleteMessage(id);
      setStatusMessage({ type: 'success', text: 'Message deleted.' });
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
      fetchMessages();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.customMessage || 'Failed to delete message' });
    }
  };

  const handleOpenMessage = (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      handleMarkAsRead(msg._id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Messages Inbox</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Incoming contact submissions from your public portfolio website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={unreadCount > 0 ? 'teal' : 'default'} size="md">
            {unreadCount} Unread
          </Badge>
          <span className="text-xs text-slate-500">· {messages.length} Total</span>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-sm ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/60 border border-rose-500/30 text-rose-300'
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl bg-[#0a0f1d] border border-slate-800">
        {messages.length > 0 ? (
          <div className="divide-y divide-slate-800/60">
            {messages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => handleOpenMessage(msg)}
                className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                  !msg.read ? 'bg-teal-950/20 hover:bg-teal-950/30' : 'hover:bg-slate-850/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    !msg.read ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-900 text-slate-500'
                  }`}>
                    {!msg.read ? <Mail className="w-5 h-5" /> : <MailOpen className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold text-sm ${!msg.read ? 'text-white' : 'text-slate-300'}`}>
                        {msg.name}
                      </span>
                      <span className="text-xs text-slate-500">&lt;{msg.email}&gt;</span>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {msg.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(msg._id, msg.name);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-2">
            <Mail className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-base font-semibold text-slate-300">Your inbox is empty</p>
            <p className="text-xs text-slate-500">
              When prospective clients or collaborators send messages, they will appear here.
            </p>
          </div>
        )}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0d1424] border border-slate-800 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
                  <MailOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{selectedMessage.name}</h3>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-xs text-teal-400 hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {selectedMessage.message}
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
              <span>
                Received: {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : 'N/A'}
              </span>

              <div className="flex gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: Inquiring from Portfolio`}
                  className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold transition-colors"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(selectedMessage._id, selectedMessage.name)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
