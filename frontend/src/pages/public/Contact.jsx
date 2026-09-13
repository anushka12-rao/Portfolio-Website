import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Github, Linkedin, MessageSquare } from 'lucide-react';
import ContactForm from '../../components/contact/ContactForm';
import { profileService } from '../../services/profileService';
import { messageService } from '../../services/messageService';
import { mockProfile } from '../../utils/mockData';

export default function Contact() {
  const [profile, setProfile] = useState(mockProfile);

  useEffect(() => {
    profileService.getPublicProfile()
      .then((data) => {
        if (data) setProfile(data);
      })
      .catch((err) => console.warn('Using default profile:', err));
  }, []);

  const handleSendMessage = async (formData) => {
    return await messageService.sendMessage(formData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Inquiries & Opportunities</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something Exceptional
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Whether you have a technical question, an open full-time position, or a consulting project in mind, drop me a line below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-white">Direct Channels</h2>

            <div className="space-y-4">
              <a
                href={`mailto:${profile?.email || 'alex.morgan@example.com'}`}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-850 hover:bg-slate-800 border border-slate-800 transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Email</p>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-teal-300 transition-colors">
                    {profile?.email || 'alex.morgan@example.com'}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-850 border border-slate-800">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Location</p>
                  <p className="text-sm font-semibold text-slate-200">
                    San Francisco, California (Available worldwide)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Social & Code</p>
              <div className="flex items-center gap-3">
                {profile?.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {profile?.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-2">Send a Message</h2>
            <p className="text-slate-400 text-sm mb-6">
              Messages are routed directly to the admin dashboard and database.
            </p>
            <ContactForm onSubmitMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
