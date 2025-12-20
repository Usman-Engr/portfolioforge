"use client";

import { ContactInfo } from "@/lib/types/portfolio";
import { Mail, Phone, Globe, Linkedin, Github, Twitter } from "lucide-react";
import { motion } from "framer-motion";

interface ContactInfoFormProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
}

export default function ContactInfoForm({
  data,
  onChange,
}: ContactInfoFormProps) {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const sections = [
    {
      id: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      placeholder: "hello@example.com",
      required: true,
    },
    {
      id: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
      placeholder: "+1 (555) 000-0000",
    },
    {
      id: "website",
      label: "Personal Website",
      icon: Globe,
      type: "url",
      placeholder: "https://yourportfolio.com",
    },
    {
      id: "linkedin",
      label: "LinkedIn Profile",
      icon: Linkedin,
      type: "url",
      placeholder: "https://linkedin.com/in/username",
    },
    {
      id: "github",
      label: "GitHub Profile",
      icon: Github,
      type: "url",
      placeholder: "https://github.com/username",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {sections.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="group"
          >
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
              <item.icon className="inline w-3 h-3 mr-2" />
              {item.label}{" "}
              {item.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={item.type}
              value={(data as any)[item.id] || ""}
              onChange={(e) =>
                handleChange(item.id as keyof ContactInfo, e.target.value)
              }
              placeholder={item.placeholder}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
              required={item.required}
            />
          </motion.div>
        ))}
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
        <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
          <strong>Note:</strong> Your contact information is used to help
          visitors reach out to you. Ensure these links are public and correct.
        </p>
      </div>
    </div>
  );
}
