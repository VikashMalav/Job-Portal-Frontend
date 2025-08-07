import React from 'react';
import { Facebook, Twitter, Linkedin, Send, Smartphone, Link2 } from 'lucide-react';
import { toast } from 'react-toastify';

const JobShareDropdown = ({ jobTitle, jobUrl, dropdownRef, onClose }) => {
  const shareMessage = `🚀 Check out this job opportunity: ${jobTitle}\nApply here: ${jobUrl}`;

  const shareOptions = [
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
      icon: <Send color="#25D366" size={22} />,
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}&quote=${encodeURIComponent(shareMessage)}`,
      icon: <Facebook color="#1877F3" size={22} />,
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`,
      icon: <Twitter color="#1DA1F2" size={22} />,
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(jobUrl)}&title=${encodeURIComponent(jobTitle)}&summary=${encodeURIComponent(shareMessage)}`,
      icon: <Linkedin color="#0077B5" size={22} />,
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(jobUrl)}&text=${encodeURIComponent(shareMessage)}`,
      icon: <Send color="#0088cc" size={22} />,
    },
  ];

  const handleWebShare = () => {
    if (navigator.share) {
      navigator.share({ title: jobTitle, text: shareMessage, url: jobUrl })
        .catch(() => toast.error("Sharing failed or was cancelled"));
    } else {
      toast.info('Web Share not supported on this device.');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareMessage)
      .then(() => toast.success('Job link copied!'))
      .catch(() => toast.error('Failed to copy link'));
  };

  return (
    <div ref={dropdownRef} className="absolute right-0 top-10 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 flex flex-col min-w-[220px]">
      <div className="font-semibold text-gray-800 mb-2 text-base">Share this job</div>
      {shareOptions.map(opt => (
        <a
          key={opt.name}
          href={opt.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded text-gray-700 font-medium transition"
        >
          {opt.icon} <span>{opt.name}</span>
        </a>
      ))}
      <button
        onClick={handleWebShare}
        className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded text-blue-700 font-medium transition"
      >
        <Smartphone size={22} /> <span>Share via Device</span>
      </button>
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-3 px-3 py-2 hover:bg-blue-50 rounded text-green-700 font-medium transition mt-1"
      >
        <Link2 size={22} /> <span>Copy Link</span>
      </button>
    </div>
  );
};

export default JobShareDropdown;
