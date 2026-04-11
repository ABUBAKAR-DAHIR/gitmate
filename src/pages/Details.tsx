import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Details() {
    const navigate = useNavigate()
  const [form, setForm] = useState({
    bio: "",
    experience: "BEGINNER",
    skills: "",
    goals: "",
    availability: "",
    timezone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        console.log(form)
        try {
            const profile = await api.post("/profile", form);
            console.log(profile.data)
            if(profile.data.success){
                toast.success("Profile saved!");
                navigate("/dashboard")
            }
            
        } catch (error: any) {
            console.error("Frontend fetch error: ", error.message)
        }
        finally{
            setLoading(false)
        }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 gap-4 py-10">
        <h2 className="text-3xl font-bold">
            Complete Your{" "}
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Profile
            </span>
        </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 space-y-6 shadow-2xl"
      >
        {/* Heading */}
        <div className="text-center space-y-2">
          <p className="text-gray-400 text-sm">
            Help us find your perfect coding match
          </p>
        </div>

        {/* Input wrapper style */}
        {[
          { label: "Bio", name: "bio", type: "textarea" },
          { label: "Skills", name: "skills", placeholder: "React, Node..." },
          { label: "Goals", name: "goals", placeholder: "Build cool stuff..." },
          { label: "Availability", name: "availability", placeholder: "Weekends..." },
          { label: "Timezone", name: "timezone", placeholder: "Asia/Kolkata" },
        ].map((field) => (
          <div key={field.name}>
            <label className="text-sm text-gray-400">{field.label}</label>

            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
                required
                className="mt-2 w-full bg-black border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition"
              />
            ) : (
              <input
                type="text"
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="mt-2 w-full bg-black border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400/50 transition"
              />
            )}
          </div>
        ))}

        {/* Experience */}
        <div>
          <label className="text-sm text-gray-400">Experience</label>
          <select
            name="experience"
            value={form.experience}
            onChange={handleChange}
            required
            className="mt-2 w-full bg-black border border-gray-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400/50"
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:opacity-90 transition shadow-lg shadow-green-500/20 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}