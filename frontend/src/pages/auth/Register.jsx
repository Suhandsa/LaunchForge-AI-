import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/helpers";
import Button from "../../components/common/Button";

export default function Register() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())         e.name = "Name is required";
    if (!isValidEmail(form.email)) e.email = "Enter a valid email";
    if (form.password.length < 8)  e.password = "Password must be 8+ characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    try { await register(form); navigate("/"); } catch { /* error from context */ }
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <div className="relative z-10 w-full max-w-[420px]">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "linear-gradient(135deg,#6366F1,#22D3EE)", boxShadow: "0 0 30px rgba(99,102,241,0.45)" }}>
            <Brain size={28} color="white" />
          </div>
          <h1 className="text-[26px] font-extrabold text-[var(--text)] mb-1">Create your account</h1>
          <p className="text-[14px] text-[var(--muted)]">Start building with AI today — free</p>
        </div>

        <div className="glass-card p-8">
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm text-[#EF4444]"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { key: "name",     label: "Full Name",   type: "text",     placeholder: "Jordan Davis"       },
              { key: "email",    label: "Email",        type: "email",    placeholder: "you@startup.com"    },
              { key: "password", label: "Password",     type: "password", placeholder: "8+ characters"     },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-[12px] font-medium text-[var(--muted)] mb-1.5">{label}</label>
                <input type={type} value={form[key]} onChange={set(key)} placeholder={placeholder} className="input-field" />
                {errors[key] && <p className="text-[11px] text-[#EF4444] mt-1">{errors[key]}</p>}
              </div>
            ))}

            <Button type="submit" variant="primary" loading={loading} className="w-full py-3 text-[15px]">
              Create account →
            </Button>
          </form>

          <p className="text-center text-[13px] text-[var(--muted)] mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-[#A5B4FC] font-medium hover:underline">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
