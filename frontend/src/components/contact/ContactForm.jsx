import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

export default function ContactForm({ onSubmitMessage }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ submitting: true, success: false, error: null });
    try {
      if (onSubmitMessage) {
        await onSubmitMessage(formData);
      } else {
        // Fallback simulate success
        await new Promise((res) => setTimeout(res, 800));
      }
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.response?.data?.error || err.message || 'Failed to send message. Please try again.'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status.success && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-start gap-3 text-emerald-300 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400 mt-0.5" />
          <div>
            <p className="font-semibold">Message sent successfully!</p>
            <p className="text-emerald-400/90 text-xs mt-0.5">Thank you for reaching out. I will get back to you as soon as possible.</p>
          </div>
        </div>
      )}

      {status.error && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
          <p>{status.error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
          Your Name <span className="text-teal-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: null });
          }}
          placeholder="Jane Doe"
          className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
            errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-teal-500 focus:ring-teal-500'
          } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-colors`}
        />
        {errors.name && <p className="text-xs text-rose-400 mt-1.5">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
          Email Address <span className="text-teal-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: null });
          }}
          placeholder="jane@example.com"
          className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
            errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-teal-500 focus:ring-teal-500'
          } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-colors`}
        />
        {errors.email && <p className="text-xs text-rose-400 mt-1.5">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
          Message <span className="text-teal-400">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: null });
          }}
          placeholder="Tell me about your project, idea, or inquiry..."
          className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
            errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-teal-500 focus:ring-teal-500'
          } text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-colors`}
        />
        {errors.message && <p className="text-xs text-rose-400 mt-1.5">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        loading={status.submitting}
        icon={Send}
      >
        Send Message
      </Button>
    </form>
  );
}
