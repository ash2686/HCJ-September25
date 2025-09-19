
    // Simple notes app using localStorage. Single-file, no libs.
    const LS_KEY = 'vanilla-notes-v1';

    // DOM
    const notesListEl = document.getElementById('notesList');
    const addBtn = document.getElementById('addBtn');
    const quickTitle = document.getElementById('quickTitle');
    const noteTitle = document.getElementById('noteTitle');
    const noteBody = document.getElementById('noteBody');
    const saveBtn = document.getElementById('saveBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const countEl = document.getElementById('count');
    const lastSavedEl = document.getElementById('lastSaved');
    const searchEl = document.getElementById('search');
    const sortEl = document.getElementById('sort');
    const exportBtn = document.getElementById('exportBtn');

    // State
    let notes = []; // {id, title, body, createdAt, updatedAt}
    let activeId = null;
    let searchQuery = '';

    // Utilities
    const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,8);
    const nowISO = () => new Date().toISOString();
    const fmt = iso => new Date(iso).toLocaleString();

    // Persistence
    function load(){
      try{
        const raw = localStorage.getItem(LS_KEY);
        notes = raw ? JSON.parse(raw) : [];
      }catch(e){notes = []}
      renderList();
    }
    function saveAll(){
      localStorage.setItem(LS_KEY, JSON.stringify(notes));
    }

    // CRUD
    function createNote(title = '', body = ''){
      const note = {id: uid(), title: title || 'Untitled', body, createdAt: nowISO(), updatedAt: nowISO()};
      notes.unshift(note);
      saveAll();
      setActive(note.id);
      renderList();
    }
    function updateNote(id, patch){
      const i = notes.findIndex(n=>n.id===id); if(i===-1) return;
      notes[i] = {...notes[i], ...patch, updatedAt: nowISO()};
      saveAll();
      renderList();
    }
    function deleteNote(id){
      const i = notes.findIndex(n=>n.id===id); if(i===-1) return;
      const removed = notes.splice(i,1)[0];
      saveAll();
      if(activeId === id){ if(notes.length) setActive(notes[0].id); else clearEditor(); }
      renderList();
    }

    // UI glue
    function renderList(){
      const q = searchQuery.trim().toLowerCase();
      let list = notes.slice();
      // sort
      const sort = sortEl.value;
      if(sort==='new') list.sort((a,b)=> new Date(b.updatedAt)-new Date(a.updatedAt));
      if(sort==='old') list.sort((a,b)=> new Date(a.updatedAt)-new Date(b.updatedAt));
      if(sort==='alpha') list.sort((a,b)=> a.title.localeCompare(b.title));

      if(q) list = list.filter(n=> (n.title + ' ' + n.body).toLowerCase().includes(q));

      notesListEl.innerHTML = '';
      for(const n of list){
        const el = document.createElement('div');
        el.className = 'note-item';
        el.tabIndex = 0;
        el.dataset.id = n.id;
        el.innerHTML = `<div class="title">${escapeHtml(n.title)}</div>
                        <div class="excerpt">${escapeHtml(n.body.slice(0,120))}</div>
                        <div class="small muted">${fmt(n.updatedAt)}</div>`;
        if(n.id === activeId) el.style.outline = '2px solid rgba(96,165,250,0.18)';
        el.addEventListener('click', ()=> setActive(n.id));
        el.addEventListener('keydown', (e)=>{ if(e.key==='Enter') setActive(n.id) });
        notesListEl.appendChild(el);
      }
      countEl.textContent = `${notes.length} note${notes.length===1?'':'s'}`;
    }

    function setActive(id){
      const note = notes.find(n=>n.id===id); if(!note) return;
      activeId = id;
      noteTitle.value = note.title;
      noteBody.value = note.body;
      lastSavedEl.textContent = fmt(note.updatedAt);
      renderList();
    }

    function clearEditor(){ activeId = null; noteTitle.value=''; noteBody.value=''; lastSavedEl.textContent = 'Never'; renderList(); }

    // safety: escape html in list preview
    function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    // Events
    addBtn.addEventListener('click', ()=>{
      const t = quickTitle.value.trim();
      createNote(t || 'Untitled', '');
      quickTitle.value = '';
    });

    quickTitle.addEventListener('keydown',(e)=>{ if(e.key==='Enter') addBtn.click(); });

    saveBtn.addEventListener('click', ()=>{
      if(!activeId){ createNote(noteTitle.value || 'Untitled', noteBody.value); return; }
      updateNote(activeId, {title: noteTitle.value || 'Untitled', body: noteBody.value});
      lastSavedEl.textContent = 'Just now';
    });

    deleteBtn.addEventListener('click', ()=>{
      if(!activeId) return; if(!confirm('Delete this note?')) return; deleteNote(activeId);
    });

    // auto-save as user types (debounced)
    let typingTimer = null;
    [noteTitle, noteBody].forEach(el=>{
      el.addEventListener('input', ()=>{
        lastSavedEl.textContent = 'Unsaved';
        clearTimeout(typingTimer);
        typingTimer = setTimeout(()=>{
          if(activeId){ updateNote(activeId, {title: noteTitle.value || 'Untitled', body: noteBody.value}); lastSavedEl.textContent = 'Saved'; }
          else { /* don't create until user clicks save/add */ }
        }, 700);
      });
    });

    // search (debounced)
    let searchTimer = null;
    searchEl.addEventListener('input',(e)=>{
      clearTimeout(searchTimer);
      searchTimer = setTimeout(()=>{ searchQuery = e.target.value; renderList(); }, 250);
    });

    sortEl.addEventListener('change', renderList);

    // keyboard shortcuts (Ctrl/Cmd+N new, Ctrl/Cmd+S save)
    window.addEventListener('keydown',(e)=>{
      if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='s'){ e.preventDefault(); saveBtn.click(); }
      if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='n'){ e.preventDefault(); quickTitle.focus(); }
    });

    // export
    exportBtn.addEventListener('click', ()=>{
      const blob = new Blob([JSON.stringify(notes, null, 2)],{type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'notes-export.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    });

    // initial load
    load();

    // accessibility: focus list if nothing active
    if(!notes.length) quickTitle.focus();
  