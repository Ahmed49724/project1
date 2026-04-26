(function() {
  'use strict';

  const SESSION_KEY = 'jamea_auth_session_v1';
  const CHILDREN_KEY = 'jamea_child_profiles_v1';
  const SUPABASE_URL = 'https://oxknepxwnsgsphhklplm.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_YYDRjNE2GUdRpQqFfA5LEg_eIVrx_0X';
  const REMOTE_SUPABASE_ENABLED = false;
  let currentMode = 'student';
  let supabaseClient = null;

  function safeJsonParse(value, fallback) {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function getChildren() {
    const children = safeJsonParse(localStorage.getItem(CHILDREN_KEY), []);
    return Array.isArray(children) ? children : [];
  }

  function saveChildren(children) {
    localStorage.setItem(CHILDREN_KEY, JSON.stringify(children));
  }

  function getSupabaseClient() {
    if (supabaseClient) return supabaseClient;
    if (!REMOTE_SUPABASE_ENABLED) return null;
    if (!window.supabase || !SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return supabaseClient;
  }

  async function getRemoteUser() {
    const client = getSupabaseClient();
    if (!client || !client.auth) return null;
    try {
      const result = await client.auth.getSession();
      return result && result.data && result.data.session ? result.data.session.user : null;
    } catch (e) {
      console.warn('Supabase auth session check failed:', e);
      return null;
    }
  }

  async function requestParentMagicLink(email) {
    const client = getSupabaseClient();
    const parentEmail = normalizeEmail(email);
    if (!client || !client.auth || !isEmail(parentEmail)) return { ok: false, skipped: true };
    const result = await client.auth.signInWithOtp({
      email: parentEmail,
      options: {
        emailRedirectTo: window.location.origin + window.location.pathname,
      },
    });
    if (result.error) return { ok: false, error: result.error };
    return { ok: true };
  }

  function normalizeEmail(value) {
    return (value || '').trim().toLowerCase();
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
  }

  function makeId(prefix) {
    const uuid = window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + '-' + Math.random().toString(16).slice(2);
    return prefix + ':' + uuid;
  }

  function makeStudentCode() {
    const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'JM-';
    for (let i = 0; i < 6; i += 1) {
      code += letters[Math.floor(Math.random() * letters.length)];
    }
    return code;
  }

  async function hashText(value) {
    const text = String(value || '').trim().toUpperCase();
    if (!text) return '';
    if (window.crypto && crypto.subtle && window.TextEncoder) {
      const bytes = new TextEncoder().encode(text);
      const digest = await crypto.subtle.digest('SHA-256', bytes);
      return Array.from(new Uint8Array(digest)).map(function(byte) {
        return byte.toString(16).padStart(2, '0');
      }).join('');
    }
    return 'plain:' + text;
  }

  function saveSession(session) {
    const normalized = normalizeSession(session);
    localStorage.setItem(SESSION_KEY, JSON.stringify(normalized));
    window.jameaSession = normalized;
    return normalized;
  }

  function loadSession() {
    const session = normalizeSession(safeJsonParse(localStorage.getItem(SESSION_KEY), null));
    window.jameaSession = session;
    return session;
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    window.jameaSession = null;
  }

  function normalizeSession(session) {
    if (!session || typeof session !== 'object') return null;
    const role = session.role === 'parent' ? 'parent' : 'student';
    const profileId = session.profileId || (role + ':guest');
    return {
      sessionType: role,
      profileId,
      role,
      displayName: session.displayName || (role === 'parent' ? 'Parent' : 'Student'),
      parentProfileId: session.parentProfileId || (role === 'parent' ? profileId : ''),
      parentEmail: normalizeEmail(session.parentEmail || ''),
      activeChildId: session.activeChildId || (role === 'student' ? profileId : ''),
      activeChildName: session.activeChildName || (role === 'student' ? (session.displayName || 'Student') : ''),
      studentCode: session.studentCode || session.activeChildId || profileId,
      studentEmail: normalizeEmail(session.studentEmail || ''),
      language: session.language || localStorage.getItem('jamea_lang') || 'en',
      theme: session.theme || document.body.getAttribute('data-theme') || 'light',
      createdAt: session.createdAt || new Date().toISOString(),
    };
  }

  function createParentSession(email, options) {
    const opts = options || {};
    const parentEmail = normalizeEmail(email);
    return saveSession({
      sessionType: 'parent',
      role: 'parent',
      profileId: opts.profileId || 'parent:' + parentEmail,
      displayName: parentEmail,
      parentEmail,
      language: localStorage.getItem('jamea_lang') || 'en',
      theme: document.body.getAttribute('data-theme') || 'light',
    });
  }

  async function ensureRemoteParentProfile(parentSession) {
    const parent = normalizeSession(parentSession);
    const client = getSupabaseClient();
    const user = await getRemoteUser();
    if (!client || !user || !parent || parent.role !== 'parent') return null;

    try {
      const result = await client.rpc('create_parent_profile', {
        parent_email: parent.parentEmail || user.email || '',
        parent_display_name: parent.displayName || parent.parentEmail || user.email || '',
      });
      if (result.error) throw result.error;
      const profile = result.data;
      if (profile && profile.id && profile.id !== parent.profileId) {
        return createParentSession(profile.email || parent.parentEmail, { profileId: profile.id });
      }
      return parent;
    } catch (e) {
      console.warn('Remote parent profile sync failed:', e);
      return null;
    }
  }

  async function createChildProfile(parentSession, childName) {
    const parent = normalizeSession(parentSession);
    if (!parent || parent.role !== 'parent') throw new Error('Parent session required.');
    const displayName = (childName || '').trim() || 'Student';
    const code = makeStudentCode();
    let remoteChild = null;

    const client = getSupabaseClient();
    const remoteUser = await getRemoteUser();
    if (client && remoteUser) {
      await ensureRemoteParentProfile(parent);
      try {
        const result = await client.rpc('create_child_profile', {
          child_display_name: displayName,
          plain_code: code,
        });
        if (result.error) throw result.error;
        const first = Array.isArray(result.data) ? result.data[0] : result.data;
        if (first && first.child_profile_id) remoteChild = first;
      } catch (e) {
        console.warn('Remote child profile create failed; using local fallback:', e);
      }
    }

    const child = {
      id: remoteChild && remoteChild.child_profile_id ? remoteChild.child_profile_id : makeId('child'),
      parentProfileId: remoteUser && remoteUser.id ? remoteUser.id : parent.profileId,
      parentEmail: parent.parentEmail,
      displayName: remoteChild && remoteChild.display_name ? remoteChild.display_name : displayName,
      codeHash: await hashText(code),
      remoteSynced: !!remoteChild,
      createdAt: remoteChild && remoteChild.created_at ? remoteChild.created_at : new Date().toISOString(),
    };
    const children = getChildren();
    children.push(child);
    saveChildren(children);
    return { child, code };
  }

  function childrenForParent(parentSession) {
    const parent = normalizeSession(parentSession);
    if (!parent) return [];
    return getChildren().filter(function(child) {
      return child.parentProfileId === parent.profileId
        || (parent.parentEmail && child.parentEmail === parent.parentEmail);
    });
  }

  async function findChildByCode(code) {
    const codeHash = await hashText(code);
    if (!codeHash) return null;
    const localMatch = getChildren().find(function(child) {
      return child.codeHash === codeHash;
    });
    if (localMatch) return localMatch;

    const client = getSupabaseClient();
    if (!client) return null;
    try {
      const result = await client.rpc('verify_child_access_code', { plain_code: code });
      if (result.error) throw result.error;
      const first = Array.isArray(result.data) ? result.data[0] : result.data;
      if (!first || !first.child_profile_id) return null;
      return {
        id: first.child_profile_id,
        parentProfileId: first.parent_profile_id || '',
        parentEmail: '',
        displayName: first.display_name || 'Student',
        codeHash,
        remoteSynced: true,
        createdAt: new Date().toISOString(),
      };
    } catch (e) {
      console.warn('Remote child code verify failed:', e);
      return null;
    }
  }

  async function loadRemoteChildren(parentSession) {
    const parent = normalizeSession(parentSession);
    const client = getSupabaseClient();
    const user = await getRemoteUser();
    if (!client || !user || !parent || parent.role !== 'parent') return childrenForParent(parent);

    try {
      await ensureRemoteParentProfile(parent);
      const result = await client.rpc('list_my_children');
      if (result.error) throw result.error;
      const remoteChildren = (result.data || []).map(function(row) {
        return {
          id: row.child_profile_id,
          parentProfileId: user.id,
          parentEmail: parent.parentEmail || user.email || '',
          displayName: row.display_name || 'Student',
          codeHash: '',
          remoteSynced: true,
          createdAt: row.created_at || new Date().toISOString(),
        };
      });
      const existing = getChildren().filter(function(child) {
        return child.parentProfileId !== user.id;
      });
      saveChildren(existing.concat(remoteChildren));
      return childrenForParent(createParentSession(parent.parentEmail || user.email, { profileId: user.id }));
    } catch (e) {
      console.warn('Remote child list sync failed:', e);
      return childrenForParent(parent);
    }
  }

  function createStudentSessionFromChild(child, codeLabel) {
    return saveSession({
      sessionType: 'student',
      role: 'student',
      profileId: child.id,
      displayName: child.displayName || 'Student',
      parentProfileId: child.parentProfileId || '',
      parentEmail: child.parentEmail || '',
      activeChildId: child.id,
      activeChildName: child.displayName || 'Student',
      studentCode: child.id,
      studentEmail: '',
      codeLabel: codeLabel || '',
      language: localStorage.getItem('jamea_lang') || 'en',
      theme: document.body.getAttribute('data-theme') || 'light',
    });
  }

  function createGuestStudentSession(rawCode) {
    const code = (rawCode || '').trim() || 'guest';
    return saveSession({
      sessionType: 'student',
      role: 'student',
      profileId: 'student-code:' + code,
      displayName: 'Student ' + code,
      activeChildId: 'student-code:' + code,
      activeChildName: 'Student ' + code,
      studentCode: code,
      studentEmail: isEmail(code) ? normalizeEmail(code) : '',
      language: localStorage.getItem('jamea_lang') || 'en',
      theme: document.body.getAttribute('data-theme') || 'light',
    });
  }

  function setMode(mode) {
    currentMode = mode === 'parent' ? 'parent' : 'student';
    document.body.setAttribute('data-login-mode', currentMode);
    document.querySelectorAll('[data-login-mode-btn]').forEach(function(btn) {
      const active = btn.getAttribute('data-login-mode-btn') === currentMode;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    const input = document.getElementById('studentCodeInput');
    const action = document.getElementById('loginPrimaryAction');
    if (input) {
      input.value = '';
      input.type = currentMode === 'parent' ? 'email' : 'text';
      input.placeholder = currentMode === 'parent' ? 'Parent email' : 'Student code';
      input.setAttribute('aria-label', input.placeholder);
    }
    if (action) {
      action.innerHTML = currentMode === 'parent'
        ? 'Continue as Parent <i class="fas fa-shield-halved"></i>'
        : 'Start Learning <i class="fas fa-rocket"></i>';
    }
    const errorEl = document.getElementById('loginError');
    if (errorEl) errorEl.textContent = '';
  }

  function getMode() {
    return currentMode;
  }

  window.JameaAuth = {
    SESSION_KEY,
    CHILDREN_KEY,
    getSupabaseClient,
    getRemoteUser,
    getMode,
    setMode,
    isEmail,
    requestParentMagicLink,
    normalizeSession,
    saveSession,
    loadSession,
    clearSession,
    createParentSession,
    ensureRemoteParentProfile,
    createChildProfile,
    childrenForParent,
    loadRemoteChildren,
    findChildByCode,
    createStudentSessionFromChild,
    createGuestStudentSession,
  };

  window.selectLoginMode = setMode;

  document.addEventListener('DOMContentLoaded', function() {
    setMode(currentMode);
    loadSession();
  });
})();
