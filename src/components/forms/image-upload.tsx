"use client";
import { useState } from "react";
import { Input } from "@/components/brut/input";
import { uploadProjectImage } from "@/actions/upload";

export function ImageUpload({
  name,
  defaultUrl = "",
}: {
  name: string;
  defaultUrl?: string;
}) {
  const [url, setUrl] = useState(defaultUrl);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onChange(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const publicUrl = await uploadProjectImage(fd);
      setUrl(publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={url} />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => void onChange(e.target.files?.[0])}
        className="text-sm"
      />
      <Input
        value={url}
        placeholder="Image URL"
        onChange={(e) => setUrl(e.target.value)}
      />
      {busy ? <p className="text-xs font-bold uppercase">Uploading...</p> : null}
      {error ? (
        <p className="text-xs font-bold uppercase" style={{ color: "#ff2d2d" }}>
          {error}
        </p>
      ) : null}
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt="Preview"
          className="h-32 w-auto object-cover"
          style={{ border: "var(--border-brutal)" }}
        />
      ) : null}
    </div>
  );
}
