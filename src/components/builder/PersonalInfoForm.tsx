"use client";

import { PersonalInfo } from "@/lib/types/portfolio";
import { User, MapPin, BadgeInfo, Camera, Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({
  data,
  onChange,
}: PersonalInfoFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      handleChange("avatarUrl", base64);
    };
    reader.onerror = () => {
      alert("Failed to process image. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveImage = () => {
    handleChange("avatarUrl", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8">
      {/* Avatar Upload Section */}
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 transition-all hover:border-blue-500/50">
        <div
          className="relative group cursor-pointer"
          onClick={handleAvatarClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Avatar Circle */}
          <div
            className={`relative w-32 h-32 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shadow-inner transition-all duration-300 ${
              isDragging
                ? "scale-110 ring-4 ring-blue-500 ring-opacity-50"
                : "group-hover:scale-105"
            }`}
          >
            {data.avatarUrl || data.avatar ? (
              <img
                src={data.avatarUrl || data.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-12 h-12 text-slate-400" />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-8 h-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform" />
            </div>

            {/* Drag Overlay */}
            {isDragging && (
              <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                <Upload className="w-12 h-12 text-blue-600 animate-bounce" />
              </div>
            )}
          </div>

          {/* Remove Image Button */}
          {(data.avatarUrl || data.avatar) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Upload Instructions */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Click or drag & drop to upload
          </p>
          <p className="text-xs text-slate-400">PNG, JPG, GIF up to 5MB</p>
        </div>

        {/* URL Input Option */}
        <div className="mt-6 w-full max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Or paste image URL
            </label>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={data.avatarUrl || data.avatar || ""}
              onChange={(e) => handleChange("avatarUrl", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-4 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Other Form Fields */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="group"
        >
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
            <User className="w-3 h-3" /> Full Name
          </label>
          <input
            type="text"
            value={data.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Jonathan Ive"
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group"
        >
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
            <BadgeInfo className="w-3 h-3" /> Professional Title
          </label>
          <input
            type="text"
            value={data.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g. Senior Product Designer"
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group"
        >
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
            <MapPin className="w-3 h-3" /> Location
          </label>
          <input
            type="text"
            value={data.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="e.g. London, UK"
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="group"
        >
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 group-focus-within:text-blue-500 transition-colors">
            <BadgeInfo className="w-3 h-3" /> Biography
          </label>
          <textarea
            value={data.bio || ""}
            onChange={(e) => handleChange("bio", e.target.value)}
            placeholder="Tell your professional story..."
            rows={5}
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none leading-relaxed"
          />
        </motion.div>
      </div>
    </div>
  );
}
