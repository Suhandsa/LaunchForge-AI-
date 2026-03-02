import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/helpers";
import Button from "../../components/common/Button";

export default function Login() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!isValidEmail(form.email)) e.email = "Enter a valid email";
    if (form.password.length < 6)  e.password = "Password must be 6+ characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login(form);
      navigate("/");
    } catch { /* error shown from context */ }
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      {/* Grid */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background: "linear-gradient(135deg, #6366F1, #22D3EE)",
              boxShadow: "0 0 30px rgba(99,102,241,0.45)",
            }}
          >
            <Brain size={28} color="white" />
          </div>
          <h1 className="text-[26px] font-extrabold text-[var(--text)] mb-1">
            Welcome to StrideFit
          </h1>
          <p className="text-[14px] text-[var(--muted)]">Your AI co-founder platform</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          {error && (
            <div
              className="mb-5 px-4 py-3 rounded-xl text-sm text-[#EF4444]"
              style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[12px] font-medium text-[var(--muted)] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@startup.com"
                className="input-field"
              />
              {errors.email && (
                <p className="text-[11px] text-[#EF4444] mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-[12px] font-medium text-[var(--muted)]">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[12px] text-[#A5B4FC] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={form.password}
                onChange={set("password")}
                placeholder="••••••••"
                className="input-field"
              />
              {errors.password && (
                <p className="text-[11px] text-[#EF4444] mt-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="w-full py-3 text-[15px]"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Continue →
            </Button>
          </form>

          <p className="text-center text-[13px] text-[var(--muted)] mt-5">
            No account?{" "}
            <Link to="/register" className="text-[#A5B4FC] font-medium hover:underline">
              Start free trial →
            </Link>
          </p>
        </div>

        <p className="text-center text-[11px] text-[var(--muted)] mt-5">
          Trusted by 2,400+ founders · SOC 2 Type II · GDPR Compliant
        </p>
      </div>
    </div>
  );
}
