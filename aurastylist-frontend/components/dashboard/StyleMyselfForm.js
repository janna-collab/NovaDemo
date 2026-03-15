"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";

export default function StyleMyselfForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    gender: "Female",
    size: "M",
    venue: "",
    aesthetic: "",
    dressType: "Casual",
    priceRange: "$$"
  });
  const [referenceImage, setReferenceImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReferenceImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setReferenceImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, referenceImage });
  };

  return (
    <form onSubmit={submitForm} className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="space-y-5">
        
        {/* Venue / Event */}
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Venue or Event <span className="text-zinc-400 font-normal">(e.g., Summer Wedding, Office Party)</span>
          </label>
          <input
            type="text"
            required
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 focus:border-black focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:border-white transition-colors outline-none"
            placeholder="Where are you going?"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          />
        </div>

        {/* Aesthetic */}
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Desired Aesthetic <span className="text-zinc-400 font-normal">(e.g., Old Money, Cyberpunk, Minimalist)</span>
          </label>
          <input
            type="text"
            required
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 focus:border-black focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:border-white transition-colors outline-none"
            placeholder="What vibe do you want?"
            value={formData.aesthetic}
            onChange={(e) => setFormData({ ...formData, aesthetic: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Gender */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Gender</label>
            <select
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 focus:border-black focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:border-white transition-colors outline-none appearance-none"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Size</label>
            <select
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 focus:border-black focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:border-white transition-colors outline-none appearance-none"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            >
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Dress Type */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Dress Type</label>
            <select
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 focus:border-black focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:border-white transition-colors outline-none appearance-none"
              value={formData.dressType}
              onChange={(e) => setFormData({ ...formData, dressType: e.target.value })}
            >
              <option value="Casual">Casual</option>
              <option value="Smart Casual">Smart Casual</option>
              <option value="Business Professional">Business Professional</option>
              <option value="Formal / Black Tie">Formal / Black Tie</option>
              <option value="Streetwear">Streetwear</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Price Range</label>
            <select
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-zinc-900 focus:border-black focus:ring-black dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:focus:border-white transition-colors outline-none appearance-none"
              value={formData.priceRange}
              onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
            >
              <option value="$">$ (Budget-friendly)</option>
              <option value="$$">$$ (Mid-range)</option>
              <option value="$$$">$$$ (Designer/Premium)</option>
            </select>
          </div>
        </div>

        {/* Reference Image (Optional) */}
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Reference Image <span className="text-zinc-400 font-normal">(Optional inspiration — first image is used as reference for generation)</span>
          </label>
          <p className="mb-2 text-xs text-green-600 dark:text-green-300">Tip: The first image you upload will be used as the base for beautiful outfit proposals.</p>
          
          {!previewUrl ? (
            <label
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
                dragActive ? "border-black bg-zinc-50 dark:border-white dark:bg-zinc-900" : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-700"
              }`}
            >
              <UploadCloud className="mb-2 text-zinc-400" size={24} />
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Click or drag an image here</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          ) : (
            <div className="relative h-32 w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Reference" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => { setPreviewUrl(null); setReferenceImage(null); }}
                className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white backdrop-blur-md"
              >
                <CheckCircle2 size={18} className="fill-green-500" />
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 flex w-full items-center justify-center rounded-xl bg-black px-4 py-4 font-bold text-white shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {isLoading ? "Generating Style..." : "Style Me Now"}
      </button>
    </form>
  );
}
