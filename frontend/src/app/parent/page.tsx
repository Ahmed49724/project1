"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface ChildRecord {
  id: string;
  name: string;
  code: string;
  createdAt: string;
}

const LS_KEY = "jamea_parent_children";

function genCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let c = "JM-";
  for (let i = 0; i < 6; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return c;
}

function loadLocalChildren(): ChildRecord[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveLocalChildren(children: ChildRecord[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(children));
}

export default function ParentPage() {
  const router = useRouter();
  const { user, isAuthLoading, signOut } = useAppContext();

  const [children, setChildren] = useState<ChildRecord[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(true);
  const [profileReady, setProfileReady] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [childName, setChildName] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Guard: only parents (Google OAuth users) allowed
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace("/");
    }
  }, [isAuthLoading, user, router]);

  // Bootstrap: ensure parent profile + load children
  useEffect(() => {
    if (!user) return;

    async function bootstrap() {
      if (isSupabaseConfigured) {
        // Upsert parent profile
        await supabase.rpc("create_parent_profile", {
          parent_email: user!.email ?? "",
          parent_display_name:
            (user!.user_metadata?.full_name as string) ?? user!.email ?? "",
        });
        setProfileReady(true);

        // Load children from DB
        const { data } = await supabase.rpc("list_my_children");
        if (data && Array.isArray(data)) {
          // Merge with locally stored codes (codes are not returned from DB for security)
          const local = loadLocalChildren();
          const merged: ChildRecord[] = data.map(
            (row: { child_profile_id: string; display_name: string; created_at: string }) => {
              const localMatch = local.find((l) => l.id === row.child_profile_id);
              return {
                id: row.child_profile_id,
                name: row.display_name,
                code: localMatch?.code ?? "—",
                createdAt: row.created_at,
              };
            }
          );
          setChildren(merged);
        }
      } else {
        // Offline mode — localStorage only
        setProfileReady(true);
        setChildren(loadLocalChildren());
      }
      setLoadingChildren(false);
    }

    bootstrap();
  }, [user]);

  const handleAddChild = useCallback(async () => {
    const name = childName.trim();
    if (!name) { setAddError("أدخل اسم الطالب"); return; }

    setAdding(true);
    setAddError("");
    const code = genCode();

    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.rpc("create_child_profile", {
          child_display_name: name,
          plain_code: code,
        });
        if (error) { setAddError("حدث خطأ. حاول مرة أخرى."); setAdding(false); return; }

        const newChild: ChildRecord = {
          id: data?.[0]?.child_profile_id ?? crypto.randomUUID(),
          name,
          code,
          createdAt: new Date().toISOString(),
        };
        const updated = [...children, newChild];
        setChildren(updated);
        saveLocalChildren(updated); // persist code locally too
      } else {
        const newChild: ChildRecord = {
          id: crypto.randomUUID(),
          name,
          code,
          createdAt: new Date().toISOString(),
        };
        const updated = [...children, newChild];
        setChildren(updated);
        saveLocalChildren(updated);
      }

      setChildName("");
      setShowAddForm(false);
    } finally {
      setAdding(false);
    }
  }, [childName, children]);

  const copyCode = useCallback((child: ChildRecord) => {
    navigator.clipboard.writeText(child.code).then(() => {
      setCopiedId(child.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  if (isAuthLoading || !user) {
    return (
      <div style={s.loadingWrap}>
        <div style={s.spinner} />
      </div>
    );
  }

  const parentName =
    (user.user_metadata?.full_name as string) ?? user.email ?? "ولي الأمر";

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerLeft}>
          <img src="/logo-optimized.png" alt="Jamea" style={s.logo} />
          <div>
            <div style={s.headerTitle}>لوحة ولي الأمر</div>
            <div style={s.headerSub}>Parent Dashboard</div>
          </div>
        </div>
        <div style={s.headerRight}>
          <div style={s.parentBadge}>
            <i className="fas fa-user-shield" />
            <span>{parentName}</span>
          </div>
          <button style={s.logoutBtn} onClick={handleLogout}>
            <i className="fas fa-right-from-bracket" />
          </button>
        </div>
      </div>

      <div style={s.content}>
        {/* Stats strip */}
        <div style={s.statsStrip}>
          <div style={s.statCard}>
            <div style={s.statNum}>{children.length}</div>
            <div style={s.statLabel}>طالب مسجّل<br /><span>Students</span></div>
          </div>
          <div style={{ ...s.statCard, background: "linear-gradient(135deg,#10b98120,#10b98108)", borderColor: "#10b98140" }}>
            <div style={{ ...s.statNum, color: "#10b981" }}>
              {children.reduce((_, __) => _, 0) ?? 0}⭐
            </div>
            <div style={s.statLabel}>نجوم مجموعة<br /><span>Stars earned</span></div>
          </div>
          <div style={{ ...s.statCard, background: "linear-gradient(135deg,#f59e0b20,#f59e0b08)", borderColor: "#f59e0b40" }}>
            <div style={{ ...s.statNum, color: "#f59e0b" }}>
              {isSupabaseConfigured ? "🟢" : "🟡"}
            </div>
            <div style={s.statLabel}>
              {isSupabaseConfigured ? "متصل بالخادم" : "وضع غير متصل"}<br />
              <span>{isSupabaseConfigured ? "Online" : "Offline mode"}</span>
            </div>
          </div>
        </div>

        {/* Children section */}
        <div style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>
            <i className="fas fa-children" style={{ color: "#185FA5" }} /> الطلاب
            <span style={s.sectionTitleEn}>Students</span>
          </h2>
          <button style={s.addBtn} onClick={() => { setShowAddForm(true); setAddError(""); setChildName(""); }}>
            <i className="fas fa-user-plus" /> إضافة طالب
          </button>
        </div>

        {/* Add child form */}
        {showAddForm && (
          <div style={s.addForm}>
            <div style={s.addFormTitle}>
              <i className="fas fa-user-plus" style={{ color: "#185FA5" }} /> إضافة طالب جديد — Add New Student
            </div>
            <div style={s.addFormRow}>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddChild()}
                placeholder="اسم الطالب — Student name"
                style={s.nameInput}
                autoFocus
                dir="auto"
              />
              <button style={s.confirmBtn} onClick={handleAddChild} disabled={adding}>
                {adding ? <span style={s.btnSpinner} /> : <i className="fas fa-check" />}
                {adding ? "..." : "إضافة"}
              </button>
              <button style={s.cancelBtn} onClick={() => setShowAddForm(false)}>
                <i className="fas fa-times" />
              </button>
            </div>
            {addError && <div style={s.errorMsg}>{addError}</div>}
            <div style={s.addFormHint}>
              سيتم إنشاء كود دخول تلقائي — An access code will be auto-generated
            </div>
          </div>
        )}

        {/* Children list */}
        {loadingChildren ? (
          <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>
            <div style={s.spinner} />
          </div>
        ) : children.length === 0 ? (
          <div style={s.emptyState}>
            <div style={{ fontSize: "4rem", marginBottom: "16px" }}>👨‍👧‍👦</div>
            <div style={{ fontFamily: "var(--font-tajawal), sans-serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}>
              لا يوجد طلاب بعد
            </div>
            <div style={{ color: "var(--text-muted)", fontFamily: "sans-serif", fontSize: "0.9rem" }}>
              Add your first student to get started
            </div>
          </div>
        ) : (
          <div style={s.childrenGrid}>
            {children.map((child) => (
              <div key={child.id} style={s.childCard}>
                <div style={s.childAvatar}>
                  {child.name.charAt(0).toUpperCase()}
                </div>
                <div style={s.childInfo}>
                  <div style={s.childName}>{child.name}</div>
                  <div style={s.childMeta}>
                    <i className="fas fa-calendar-alt" style={{ fontSize: "0.7rem" }} />
                    {new Date(child.createdAt).toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" })}
                  </div>
                </div>

                {/* Access code */}
                <div style={s.codeSection}>
                  <div style={s.codeLabel}>كود الدخول — Access Code</div>
                  <div style={s.codeBox}>
                    <span style={s.codeText}>{child.code}</span>
                    <button
                      style={{ ...s.copyBtn, ...(copiedId === child.id ? s.copiedBtn : {}) }}
                      onClick={() => copyCode(child)}
                      title="نسخ الكود"
                    >
                      {copiedId === child.id
                        ? <><i className="fas fa-check" /> نُسخ</>
                        : <><i className="fas fa-copy" /> نسخ</>}
                    </button>
                  </div>
                  {child.code === "—" && (
                    <div style={{ fontSize: "0.75rem", color: "#f59e0b", marginTop: "4px", fontFamily: "sans-serif" }}>
                      Code only shown at creation time
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation shortcut */}
        {!profileReady && <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>جارٍ التحميل...</div>}

        <div style={s.navSection}>
          <div style={s.navTitle}>الأدوات — Tools</div>
          <div style={s.navGrid}>
            <button style={s.navCard} onClick={() => router.push("/journey/arabic")}>
              <i className="fas fa-language" style={{ color: "#185FA5", fontSize: "1.5rem" }} />
              <div>منهج اللغة العربية</div>
              <div style={s.navCardSub}>Arabic Curriculum</div>
            </button>
            <button style={s.navCard} onClick={() => router.push("/dashboard")}>
              <i className="fas fa-graduation-cap" style={{ color: "#10b981", fontSize: "1.5rem" }} />
              <div>عرض واجهة الطالب</div>
              <div style={s.navCardSub}>Preview Student View</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "var(--bg, #f8fafc)",
    fontFamily: "var(--font-tajawal), Tajawal, sans-serif",
  },
  loadingWrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#064e3b",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(0,0,0,0.1)",
    borderTop: "4px solid #185FA5",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    margin: "0 auto",
  },
  header: {
    background: "#fff",
    borderBottom: "1px solid var(--border, #e5e7eb)",
    padding: "16px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  logo: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    objectFit: "cover",
  },
  headerTitle: {
    fontWeight: 900,
    fontSize: "1.1rem",
    color: "var(--text, #1f2937)",
  },
  headerSub: {
    fontSize: "0.75rem",
    color: "var(--text-muted, #6b7280)",
    fontFamily: "sans-serif",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  parentBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#185FA510",
    border: "1px solid #185FA530",
    color: "#185FA5",
    borderRadius: "100px",
    padding: "6px 16px",
    fontSize: "0.85rem",
    fontWeight: 700,
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid var(--border, #e5e7eb)",
    borderRadius: "10px",
    padding: "8px 12px",
    cursor: "pointer",
    color: "var(--text-muted, #6b7280)",
    fontSize: "1rem",
  },
  content: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "32px 20px 60px",
  },
  statsStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "36px",
  },
  statCard: {
    background: "linear-gradient(135deg,#185FA520,#185FA508)",
    border: "1px solid #185FA540",
    borderRadius: "20px",
    padding: "20px 24px",
    textAlign: "center",
  },
  statNum: {
    fontSize: "2rem",
    fontWeight: 900,
    color: "#185FA5",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "0.8rem",
    color: "var(--text-muted, #6b7280)",
    fontFamily: "sans-serif",
    lineHeight: 1.5,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.3rem",
    color: "var(--text, #1f2937)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sectionTitleEn: {
    fontSize: "0.85rem",
    color: "var(--text-muted, #6b7280)",
    fontWeight: 400,
    fontFamily: "sans-serif",
  },
  addBtn: {
    background: "#185FA5",
    border: "none",
    borderRadius: "14px",
    color: "#fff",
    padding: "10px 20px",
    fontFamily: "var(--font-tajawal), sans-serif",
    fontWeight: 700,
    fontSize: "0.9rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 16px #185FA530",
  },
  addForm: {
    background: "#fff",
    border: "2px solid #185FA5",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "24px",
    boxShadow: "0 8px 32px #185FA515",
  },
  addFormTitle: {
    fontWeight: 700,
    marginBottom: "16px",
    color: "var(--text, #1f2937)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  addFormRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  nameInput: {
    flex: 1,
    minWidth: "200px",
    padding: "12px 16px",
    border: "1.5px solid var(--border, #e5e7eb)",
    borderRadius: "12px",
    fontSize: "1rem",
    fontFamily: "var(--font-tajawal), sans-serif",
    outline: "none",
    background: "var(--surface, #fff)",
  },
  confirmBtn: {
    background: "#185FA5",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "12px 24px",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--font-tajawal), sans-serif",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.9rem",
  },
  cancelBtn: {
    background: "transparent",
    border: "1.5px solid var(--border, #e5e7eb)",
    borderRadius: "12px",
    padding: "12px 16px",
    cursor: "pointer",
    color: "var(--text-muted, #6b7280)",
  },
  btnSpinner: {
    display: "inline-block",
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  errorMsg: {
    marginTop: "10px",
    color: "#dc2626",
    fontSize: "0.85rem",
    fontFamily: "sans-serif",
  },
  addFormHint: {
    marginTop: "10px",
    color: "var(--text-muted, #6b7280)",
    fontSize: "0.8rem",
    fontFamily: "sans-serif",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    background: "#fff",
    borderRadius: "24px",
    border: "2px dashed var(--border, #e5e7eb)",
    color: "var(--text, #1f2937)",
  },
  childrenGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "40px",
  },
  childCard: {
    background: "#fff",
    border: "1.5px solid var(--border, #e5e7eb)",
    borderRadius: "20px",
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    transition: "box-shadow 0.2s",
  },
  childAvatar: {
    width: "52px",
    height: "52px",
    background: "linear-gradient(135deg, #185FA5, #0d4a82)",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    fontWeight: 900,
    flexShrink: 0,
  },
  childInfo: {
    flex: 1,
    minWidth: "120px",
  },
  childName: {
    fontWeight: 900,
    fontSize: "1.1rem",
    color: "var(--text, #1f2937)",
    marginBottom: "4px",
  },
  childMeta: {
    fontSize: "0.75rem",
    color: "var(--text-muted, #6b7280)",
    fontFamily: "sans-serif",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  codeSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "6px",
  },
  codeLabel: {
    fontSize: "0.7rem",
    color: "var(--text-muted, #6b7280)",
    fontFamily: "sans-serif",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  codeBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#f0f9ff",
    border: "2px solid #bfdbfe",
    borderRadius: "12px",
    padding: "10px 16px",
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: "1.3rem",
    fontWeight: 900,
    color: "#1d4ed8",
    letterSpacing: "0.12em",
  },
  copyBtn: {
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "6px 14px",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontFamily: "var(--font-tajawal), sans-serif",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "all 0.2s",
  },
  copiedBtn: {
    background: "#10b981",
  },
  navSection: {
    marginTop: "48px",
  },
  navTitle: {
    fontWeight: 700,
    fontSize: "1rem",
    color: "var(--text-muted, #6b7280)",
    marginBottom: "16px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontFamily: "sans-serif",
  },
  navGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
  },
  navCard: {
    background: "#fff",
    border: "1.5px solid var(--border, #e5e7eb)",
    borderRadius: "20px",
    padding: "24px 20px",
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    fontFamily: "var(--font-tajawal), sans-serif",
    fontWeight: 700,
    fontSize: "0.95rem",
    color: "var(--text, #1f2937)",
    transition: "all 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  navCardSub: {
    fontSize: "0.75rem",
    color: "var(--text-muted, #6b7280)",
    fontFamily: "sans-serif",
    fontWeight: 400,
  },
};
