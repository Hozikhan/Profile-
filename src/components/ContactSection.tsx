import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { validateContactForm, ContactFormData } from '../utils/portfolioLogic';
import confetti from 'canvas-confetti';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Instagram,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ContactSectionProps {
  playBlip: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ playBlip }) => {
  const profile = PORTFOLIO_DATA.profile;
  const links = PORTFOLIO_DATA.socialLinks;

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playBlip();

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);

      // Trigger celebratory pop confetti (yellow, cyan, lime green, white)
      try {
        confetti({
          particleCount: 85,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#facc15', '#38bdf8', '#4ade80', '#fb923c', '#ffffff'],
        });
      } catch {
        // safe fallback
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 800);
  };

  const copyEmailToClipboard = () => {
    playBlip();
    navigator.clipboard.writeText(links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 bg-[#080808] border-t-2 border-zinc-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Looping Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-2 border-zinc-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-hand text-base text-[#4ade80] mb-1 animate-text-bounce">
              <span>📬 LET'S BUILD TOGETHER</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-comic font-extrabold tracking-tight text-white">
              GET IN <span className="text-[#facc15] underline decoration-[#38bdf8] decoration-wavy">TOUCH</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 font-comic text-xs text-white">
            <span className="bg-[#fb923c] text-black px-3.5 py-1.5 rounded-xl border-2 border-black font-extrabold shadow-[2px_2px_0px_#ffffff]">
              ★ DIRECT MAIL • MADHUBANI &amp; MMANTC ★
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Postcard & Social Stickers with Pop Colors */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-[#121212] border-[3px] border-[#facc15] comic-shadow-yellow space-y-6 relative">
              {/* Postal Stamp Badge */}
              <div className="absolute top-4 right-4 border-2 border-dashed border-[#facc15] rounded-xl px-2.5 py-1.5 text-center font-comic rotate-3 bg-black">
                <div className="text-[10px] text-[#facc15] font-bold">BIHAR POST</div>
                <div className="text-xs font-extrabold text-white">IND • 847211</div>
              </div>

              <div>
                <span className="bg-[#38bdf8] text-black font-comic text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#000000]">
                  CONNECT WITH HUZAIFA
                </span>
                <h3 className="font-comic font-bold text-3xl text-white mt-2">
                  Say Hello! 💬
                </h3>
                <p className="text-sm text-zinc-200 font-sans mt-2 font-normal leading-relaxed">
                  Have an internship, project idea, or just want to chat about C, Python, or Web development? Drop a message and I'll get back to you!
                </p>
              </div>

              {/* Direct Email with Cartoon Copy Button */}
              <div className="p-4 rounded-2xl bg-black border-2 border-[#38bdf8] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-[#38bdf8] text-black flex items-center justify-center shrink-0 border border-black font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="font-comic text-[10px] text-[#38bdf8] font-bold uppercase">DIRECT EMAIL</div>
                    <div className="font-comic text-sm text-white font-bold truncate">
                      {links.email}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  className="px-3.5 py-2 rounded-xl bg-[#facc15] text-black font-comic text-xs font-bold border-2 border-black hover:bg-[#fde047] transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-[2px_2px_0px_#000000]"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-black" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location & Timezone info with Pop Colors */}
              <div className="grid grid-cols-2 gap-3 font-comic text-xs">
                <div className="p-3.5 rounded-2xl bg-black border-2 border-zinc-800">
                  <div className="flex items-center gap-1.5 text-[#38bdf8] mb-1 font-bold">
                    <MapPin className="w-4 h-4 text-[#38bdf8]" />
                    <span>HOMETOWN</span>
                  </div>
                  <div className="font-bold text-white text-sm">
                    Madhubani, Bihar
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">India</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black border-2 border-zinc-800">
                  <div className="flex items-center gap-1.5 text-[#4ade80] mb-1 font-bold">
                    <Clock className="w-4 h-4 text-[#4ade80]" />
                    <span>TIMEZONE</span>
                  </div>
                  <div className="font-bold text-white text-sm">
                    IST (UTC +5:30)
                  </div>
                  <div className="text-[10px] text-[#4ade80] mt-0.5 animate-pulse">Always Online ⚡</div>
                </div>
              </div>

              {/* Social Channels Cartoon Stickers with Colors */}
              <div className="space-y-2 pt-2">
                <div className="font-comic text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  ✦ FIND ME ONLINE:
                </div>
                <div className="grid grid-cols-2 gap-2 font-comic text-xs">
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-black border-2 border-white flex items-center gap-2 text-white hover:bg-white hover:text-black transition-all font-bold comic-shadow-sm hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span>GITHUB</span>
                  </a>

                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-black border-2 border-[#38bdf8] flex items-center gap-2 text-[#38bdf8] hover:bg-[#38bdf8] hover:text-black transition-all font-bold comic-shadow-cyan hover:scale-105"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LINKEDIN</span>
                  </a>

                  <a
                    href={links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-black border-2 border-[#fb923c] flex items-center gap-2 text-[#fb923c] hover:bg-[#fb923c] hover:text-black transition-all font-bold comic-shadow-orange hover:scale-105"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>INSTAGRAM</span>
                  </a>

                  <a
                    href={`mailto:${links.email}`}
                    className="p-3 rounded-2xl bg-[#facc15] border-2 border-black flex items-center gap-2 text-black hover:bg-[#fde047] transition-all font-bold shadow-[2px_2px_0px_#ffffff] hover:scale-105"
                  >
                    <Mail className="w-4 h-4" />
                    <span>EMAIL ME</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Comic Postcard Message Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#121212] border-[3px] border-white comic-shadow relative">
              <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#facc15] animate-ping" />
                  <span className="font-comic font-bold text-sm text-white">
                    SEND A POSTCARD 💌
                  </span>
                </div>
                <span className="font-hand text-base text-[#4ade80] animate-text-bounce">
                  I read every message!
                </span>
              </div>

              {isSent ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-3xl bg-[#4ade80] text-black border-2 border-black flex items-center justify-center mx-auto shadow-[4px_4px_0px_#ffffff] animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-comic font-extrabold text-white">
                    MESSAGE SENT! 🎉
                  </h3>
                  <p className="text-sm text-zinc-200 font-sans max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! Your message has reached Huzaifa. I will reply to you as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSent(false)}
                    className="px-6 py-3 rounded-2xl bg-[#facc15] text-black font-comic font-bold text-xs border-2 border-black shadow-[3px_3px_0px_#ffffff] hover:translate-y-[-2px] transition-transform cursor-pointer"
                  >
                    SEND ANOTHER NOTE ✏️
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="block font-comic text-xs font-bold text-white uppercase"
                      >
                        Your Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full bg-black border-2 ${
                          errors.name ? 'border-red-500' : 'border-zinc-700'
                        } rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none focus:border-[#facc15] transition-colors`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 font-comic flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block font-comic text-xs font-bold text-white uppercase"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@example.com"
                        className={`w-full bg-black border-2 ${
                          errors.email ? 'border-red-500' : 'border-zinc-700'
                        } rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none focus:border-[#facc15] transition-colors`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 font-comic flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject"
                      className="block font-comic text-xs font-bold text-white uppercase"
                    >
                      Subject *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Project Inquiry / Collaboration"
                      className={`w-full bg-black border-2 ${
                        errors.subject ? 'border-red-500' : 'border-zinc-700'
                      } rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none focus:border-[#facc15] transition-colors`}
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-400 font-comic flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block font-comic text-xs font-bold text-white uppercase"
                    >
                      Your Note / Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      className={`w-full bg-black border-2 ${
                        errors.message ? 'border-red-500' : 'border-zinc-700'
                      } rounded-xl p-4 text-sm text-white font-sans focus:outline-none focus:border-[#facc15] transition-colors leading-relaxed`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 font-comic flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button in Pop Yellow */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#facc15] text-black font-comic font-extrabold text-sm border-2 border-black shadow-[4px_4px_0px_#ffffff] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#facc15] transition-all cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>DELIVERING NOTE... 📨</span>
                      ) : (
                        <>
                          <span>SEND MESSAGE 🚀</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
