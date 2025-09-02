
# Flask Portfolio — GfG-inspired

A lightweight Flask portfolio website with sections for Home, About, Experience, Skills, Achievements, Projects, PoR, and Contact (with SQLite message storage).

## Quickstart

```bash
# 1) Create a virtual env (recommended)
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# 2) Install deps
pip install flask

# 3) Run
python app.py
# open http://127.0.0.1:5000
```

- Edit `data/content.json` after first run to update text, skills, and projects.
- Messages submitted via the form are stored in `data/messages.db`.
- Dev-only inbox: `http://127.0.0.1:5000/admin/messages`

## Deploy

- **Render / Railway / Fly.io**: Create a new web service with `python app.py`.
- **GitHub Pages** is static-only; for the Flask version use a host that supports Python apps.

## Notes

This project is *inspired by* the structure in the GfG article but implemented from scratch in Flask with original styling.
