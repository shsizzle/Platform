// ============================================
// AdvisorHub — Application Logic
// ============================================

(function () {
  'use strict';

  // ---- State ----
  const state = {
    currentView: 'feed',
    subscriptions: new Set(['blackrock', 'pimco', 'bridgewater', 'vanguard']),
    posts: [...SAMPLE_POSTS],
    likedPosts: new Set(),
    feedFilter: 'all',
    managerCategory: 'all',
    managerSearch: '',
    currentDataRoom: null,
    nextPostId: SAMPLE_POSTS.length + 1,
  };

  // ---- DOM References ----
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ---- Navigation ----
  function switchView(view) {
    state.currentView = view;
    $$('.view').forEach(v => v.classList.remove('active'));
    $$('.nav-tab').forEach(t => t.classList.remove('active'));
    $(`#view-${view}`).classList.add('active');
    $(`.nav-tab[data-view="${view}"]`)?.classList.add('active');

    if (view === 'feed') renderFeed();
    if (view === 'managers') renderManagers();
    if (view === 'subscriptions') renderSubscriptions();
  }

  $$('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  // ---- Toast Notifications ----
  function showToast(message) {
    let container = $('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // ---- Helpers ----
  function timeAgo(timestamp) {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  function getManager(id) {
    return MANAGERS.find(m => m.id === id);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ==========================================
  // FEED
  // ==========================================

  function renderFeed() {
    const container = $('#feedPosts');
    let posts = state.posts
      .filter(p => state.subscriptions.has(p.managerId) || p.isOwn)
      .sort((a, b) => b.timestamp - a.timestamp);

    if (state.feedFilter !== 'all') {
      posts = posts.filter(p => p.category === state.feedFilter);
    }

    if (posts.length === 0) {
      container.innerHTML = `
        <div class="empty-subscriptions">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <h3>No posts to show</h3>
          <p>${state.subscriptions.size === 0 ? 'Subscribe to investment managers to see their posts here.' : 'No posts match the selected filter.'}</p>
        </div>`;
      return;
    }

    container.innerHTML = posts.map(post => {
      const manager = getManager(post.managerId);
      const avatarColor = manager ? manager.color : '#2563eb';
      const avatarInitials = manager ? manager.initials : 'ME';
      const liked = state.likedPosts.has(post.id);

      return `
        <div class="post-card" data-post-id="${post.id}">
          <div class="post-header">
            <div class="post-avatar" style="background:${avatarColor}">${avatarInitials}</div>
            <div class="post-meta">
              <div class="post-author">${escapeHtml(post.author)}</div>
              <div class="post-info">
                <span class="post-badge ${post.category}">${post.category.replace('-', ' ')}</span>
                <span>&middot;</span>
                <span>${timeAgo(post.timestamp)}</span>
              </div>
            </div>
          </div>
          <div class="post-body">${escapeHtml(post.content)}</div>
          <div class="post-actions">
            <button class="post-action-btn ${liked ? 'liked' : ''}" onclick="app.toggleLike(${post.id})">
              <svg viewBox="0 0 24 24" fill="${liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span>${post.likes + (liked ? 1 : 0)}</span>
            </button>
            <button class="post-action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>${post.comments}</span>
            </button>
            <button class="post-action-btn" onclick="app.sharePost(${post.id})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              <span>Share</span>
            </button>
          </div>
        </div>`;
    }).join('');
  }

  // Feed filters
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.feedFilter = btn.dataset.filter;
      renderFeed();
    });
  });

  // Post creation
  $('#publishPostBtn').addEventListener('click', () => {
    const input = $('#postInput');
    const content = input.value.trim();
    if (!content) return;

    const category = $('#postCategory').value;
    state.posts.unshift({
      id: state.nextPostId++,
      managerId: null,
      isOwn: true,
      author: 'You',
      content,
      category,
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
    });

    input.value = '';
    renderFeed();
    showToast('Post published successfully');
  });

  // ==========================================
  // MANAGERS
  // ==========================================

  function renderManagers() {
    const grid = $('#managerGrid');
    let managers = MANAGERS;

    if (state.managerCategory !== 'all') {
      managers = managers.filter(m => m.category === state.managerCategory);
    }

    if (state.managerSearch) {
      const q = state.managerSearch.toLowerCase();
      managers = managers.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    }

    grid.innerHTML = managers.map(m => {
      const isSubscribed = state.subscriptions.has(m.id);
      return `
        <div class="manager-card" onclick="app.openDataRoom('${m.id}')">
          <div class="manager-icon" style="background:${m.color}">
            <span class="manager-logo-text">${m.initials}</span>
            ${isSubscribed ? `
              <div class="subscribed-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>` : ''}
          </div>
          <div class="manager-name">${escapeHtml(m.name)}</div>
          <div class="manager-category-label">${m.category.replace('-', ' ')}</div>
        </div>`;
    }).join('');
  }

  // Manager category filters
  $$('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.managerCategory = btn.dataset.category;
      renderManagers();
    });
  });

  // Manager search
  $('#managerSearch').addEventListener('input', (e) => {
    state.managerSearch = e.target.value;
    renderManagers();
  });

  // ==========================================
  // SUBSCRIPTIONS
  // ==========================================

  function renderSubscriptions() {
    const container = $('#subscriptionsList');
    const subscribed = MANAGERS.filter(m => state.subscriptions.has(m.id));

    if (subscribed.length === 0) {
      container.innerHTML = `
        <div class="empty-subscriptions">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          <h3>No subscriptions yet</h3>
          <p>Browse investment managers and subscribe to see their posts in your feed.</p>
        </div>`;
      return;
    }

    container.innerHTML = subscribed.map(m => `
      <div class="subscription-item">
        <div class="subscription-icon" style="background:${m.color}">${m.initials}</div>
        <div class="subscription-info">
          <h3>${escapeHtml(m.name)}</h3>
          <p>${escapeHtml(m.description)}</p>
        </div>
        <div class="subscription-actions">
          <button class="btn btn-outline btn-sm" onclick="app.openDataRoom('${m.id}')">Data Room</button>
          <button class="btn btn-subscribe subscribed btn-sm" onclick="app.toggleSubscription('${m.id}')">Subscribed</button>
        </div>
      </div>`).join('');
  }

  // ==========================================
  // DATA ROOM
  // ==========================================

  function openDataRoom(managerId) {
    const manager = getManager(managerId);
    if (!manager) return;

    state.currentDataRoom = managerId;

    // Update header
    $('#dataroomManagerName').textContent = manager.name;
    $('#dataroomManagerDesc').textContent = manager.description;
    const icon = $('#dataroomManagerIcon');
    icon.style.background = manager.color;
    icon.textContent = manager.initials;

    // Update subscribe button
    updateDataRoomSubscribeBtn(managerId);

    // Render file tree
    renderFileTree(managerId);

    // Clear document preview
    $('#documentContent').innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <h3>Select a document</h3>
        <p>Choose a file from the tree to preview its contents.</p>
      </div>`;

    // Switch view
    $$('.view').forEach(v => v.classList.remove('active'));
    $$('.nav-tab').forEach(t => t.classList.remove('active'));
    $('#view-dataroom').classList.add('active');
  }

  function updateDataRoomSubscribeBtn(managerId) {
    const btn = $('#dataroomSubscribeBtn');
    const isSubscribed = state.subscriptions.has(managerId);
    btn.className = `btn btn-subscribe ${isSubscribed ? 'subscribed' : ''}`;
    btn.textContent = isSubscribed ? 'Subscribed' : 'Subscribe';
    btn.onclick = () => {
      toggleSubscription(managerId);
      updateDataRoomSubscribeBtn(managerId);
    };
  }

  function renderFileTree(managerId) {
    const treeContainer = $('#fileTree');
    const data = DATA_ROOM_FILES[managerId];
    if (!data) {
      treeContainer.innerHTML = '<div style="padding:16px;color:var(--gray-500)">No documents available.</div>';
      return;
    }

    treeContainer.innerHTML = buildTreeHTML(data.children, 0);
    attachTreeListeners();
  }

  function buildTreeHTML(items, depth) {
    return items.map((item, idx) => {
      if (item.type === 'folder') {
        const folderId = `folder-${depth}-${idx}`;
        return `
          <div class="tree-item tree-indent-${depth}" data-folder="${folderId}">
            <svg class="tree-toggle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            <svg class="folder-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span class="tree-folder-label">${escapeHtml(item.name)}</span>
          </div>
          <div class="tree-children" id="${folderId}">
            ${buildTreeHTML(item.children, depth + 1)}
          </div>`;
      }

      const iconClass = item.type === 'pdf' ? 'pdf-icon' : item.type === 'sheet' ? 'sheet-icon' : 'file-icon';
      const iconSvg = item.type === 'pdf'
        ? '<svg class="pdf-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
        : '<svg class="sheet-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="12" y1="9" x2="12" y2="21"/></svg>';

      return `
        <div class="tree-item tree-indent-${depth}" data-file='${JSON.stringify(item).replace(/'/g, "&#39;")}'>
          ${iconSvg}
          <span>${escapeHtml(item.name)}</span>
        </div>`;
    }).join('');
  }

  function attachTreeListeners() {
    // Folder toggles
    $$('.tree-item[data-folder]').forEach(item => {
      item.addEventListener('click', () => {
        const folderId = item.dataset.folder;
        const children = document.getElementById(folderId);
        const toggle = item.querySelector('.tree-toggle');
        children.classList.toggle('open');
        toggle.classList.toggle('open');
      });
    });

    // File clicks
    $$('.tree-item[data-file]').forEach(item => {
      item.addEventListener('click', () => {
        $$('.tree-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const file = JSON.parse(item.dataset.file);
        renderDocumentPreview(file);
      });
    });
  }

  function renderDocumentPreview(file) {
    const container = $('#documentContent');
    const typeLabel = file.type === 'pdf' ? 'PDF Document' : 'Spreadsheet';
    const typeColor = file.type === 'pdf' ? 'var(--red-500)' : 'var(--green-600)';
    const iconSvg = file.type === 'pdf'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="var(--red-500)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';

    container.innerHTML = `
      <div class="doc-header">
        ${iconSvg}
        <h2>${escapeHtml(file.name)}</h2>
        <span class="doc-type">${typeLabel}</span>
      </div>
      <table class="doc-meta-table">
        <tr><th>File Name</th><td>${escapeHtml(file.name)}</td></tr>
        <tr><th>Type</th><td>${typeLabel}</td></tr>
        <tr><th>Size</th><td>${file.size}</td></tr>
        <tr><th>Last Updated</th><td>${file.date}</td></tr>
      </table>
      <div class="doc-body-text">
        <p>${escapeHtml(file.description)}</p>
        <p style="margin-top:16px;">
          <button class="btn btn-primary" onclick="app.downloadFile('${escapeHtml(file.name)}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download
          </button>
        </p>
      </div>`;
  }

  // Back to managers
  $('#backToManagers').addEventListener('click', () => switchView('managers'));

  // ==========================================
  // SUBSCRIPTIONS TOGGLE
  // ==========================================

  function toggleSubscription(managerId) {
    if (state.subscriptions.has(managerId)) {
      state.subscriptions.delete(managerId);
      showToast(`Unsubscribed from ${getManager(managerId).name}`);
    } else {
      state.subscriptions.add(managerId);
      showToast(`Subscribed to ${getManager(managerId).name}`);
    }
    // Re-render relevant views
    if (state.currentView === 'managers') renderManagers();
    if (state.currentView === 'subscriptions') renderSubscriptions();
  }

  // ==========================================
  // PUBLIC API (for inline event handlers)
  // ==========================================

  window.app = {
    toggleLike(postId) {
      if (state.likedPosts.has(postId)) {
        state.likedPosts.delete(postId);
      } else {
        state.likedPosts.add(postId);
      }
      renderFeed();
    },

    sharePost(postId) {
      showToast('Link copied to clipboard');
    },

    openDataRoom(managerId) {
      openDataRoom(managerId);
    },

    toggleSubscription(managerId) {
      toggleSubscription(managerId);
      if (state.currentDataRoom === managerId) {
        updateDataRoomSubscribeBtn(managerId);
      }
    },

    downloadFile(name) {
      showToast(`Downloading ${name}...`);
    },
  };

  // ---- Init ----
  renderFeed();

})();
