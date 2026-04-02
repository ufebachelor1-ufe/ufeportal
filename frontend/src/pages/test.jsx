import { useState } from "react";
import { supabase2 } from "../supabase2";

export default function AddProgram() {
  const [major, setMajor] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [degree, setDegree] = useState("Bachelor");
  const [university, setUniversity] = useState("Unknown");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const BUCKET_NAME = "images"; // Correct bucket

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!major || !degree) {
      alert("Major and Degree are required");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = "";

      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `programs/${fileName}`;

        // Upload image
        const { error: uploadError } = await supabase2.storage
          .from(BUCKET_NAME)
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData, error: urlError } = supabase2.storage
          .from(BUCKET_NAME)
          .getPublicUrl(filePath);

        if (urlError) throw urlError;
        imageUrl = urlData.publicUrl;
      }

      // Insert into programs table
      const { error: insertError } = await supabase2
        .from("programs")
        .insert([
          {
            major: major.trim(),
            degree: degree.trim(),
            description: description.trim() || "",
            duration: duration.trim() || "",
            img_url: imageUrl || "",
            university: university.trim() || "Unknown",
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) throw insertError;

      alert("Program added successfully!");

      // Reset form
      setMajor("");
      setDegree("Bachelor");
      setDescription("");
      setDuration("");
      setUniversity("Unknown");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto border rounded shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Add New Program</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Major"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <input
          type="text"
          placeholder="University"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
        />

        <input type="file" accept="image/*" onChange={handleImage} />
        {preview && <img src={preview} className="object-contain h-40 mt-2" />}

        <button
          type="submit"
          disabled={loading}
          className="py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload & Add Program"}
        </button>
      </form>
    </div>
  );
}
