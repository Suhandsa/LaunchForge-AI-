import { useState } from "react";
import { Settings as SettingsIcon, Bell, Cpu, Shield, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/common/Button";

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative flex-shrink-0 transition-all duration-200"
      style={{
        width: "44px", height: "24px", borderRadius: "12px", border: "none",
        background: value
          ? "linear-gradient(135deg, #6366F1, #8B5CF6)"
          : "rgba(255,255,255,0.1)",
        boxShadow: value ? "0 0 12px rgba(99,102,241,0.4)" : "none",
        cursor: "pointer",
      }}
    >
      <div
        className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-all duration-200"
        style={{
          left: value ? "23px" : "3px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.35)",
        }}
      />
    </button>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <div className="glass-card p-6 mb-4">
      <div className="flex items-center gap-2.5 mb-5">
        <Icon size={16} color="#A5B4FC" />
        <h3 className="text-[15px] font-bold text-[var(--text)]">{title}</h3>
      </div>
      <div className="divide-y" style={{ borderColor: "var(--border)" }}>
        {children}
      </div>
    </div>
  );
}

function Row({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="text-[14px] font-medium text-[var(--text)]">{label}</p>
        {desc && <p className="text-[12px] text-[var(--muted)] mt-0.5">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const { user, logout } = useAuth();
  const [notifs,    setNotifs]    = useState(true);
  const [autoSave,  setAutoSave]  = useState(true);
  const [darkMode,  setDarkMode]  = useState(true);
  const [model,     setModel]     = useState("gpt-4o");

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-[24px] font-extrabold text-[var(--text)] mb-1">Settings</h1>
        <p className="text-[14px] text-[var(--muted)]">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <Section icon={SettingsIcon} title="Profile">
        <Row label="Full Name" desc="Your display name across the platform">
          <input
            defaultValue={user?.name || "Jordan Davis"}
            className="input-field max-w-[220px]"
          />
        </Row>
        <Row label="Email" desc="Used for login and notifications">
          <input
            defaultValue={user?.email || "jordan@stridefit.ai"}
            className="input-field max-w-[220px]"
          />
        </Row>
        <Row label="">
          <Button variant="primary" size="sm">Save Changes</Button>
        </Row>
      </Section>

      {/* AI Config */}
      <Section icon={Cpu} title="AI Configuration">
        <Row label="Language Model" desc="Model used for idea analysis and chat">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="input-field max-w-[200px]"
          >
            <option value="gpt-4o">GPT-4o (Recommended)</option>
            <option value="claude-3.7">Claude 3.7 Sonnet</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
          </select>
        </Row>
        <Row label="Auto-save Ideas" desc="Automatically save every generated plan">
          <Toggle value={autoSave} onChange={setAutoSave} />
        </Row>
      </Section>

      {/* Notifications */}
      <Section icon={Bell} title="Notifications">
        <Row label="Email Notifications" desc="Receive weekly insight reports">
          <Toggle value={notifs} onChange={setNotifs} />
        </Row>
        <Row label="Dark Mode" desc="Toggle dark / light interface">
          <Toggle value={darkMode} onChange={setDarkMode} />
        </Row>
      </Section>

      {/* Danger Zone */}
      <Section icon={Shield} title="Danger Zone">
        <Row label="Delete All Ideas" desc="Permanently remove all generated plans — irreversible">
          <Button variant="danger" size="sm">Delete All</Button>
        </Row>
        <Row label="Sign Out" desc="Log out from this device">
          <Button
            variant="ghost"
            size="sm"
            icon={<LogOut size={14} />}
            onClick={logout}
          >
            Sign Out
          </Button>
        </Row>
      </Section>
    </div>
  );
}
