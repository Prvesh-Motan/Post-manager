# Post Management System (Project 2)

A minimal **React + Vite** client-only admin app for posts: list with search and author filter, pagination, create / read / update / delete, and **React Router** navigation. Data persists in **`localStorage`** under the key `pms_posts`.

## Requirements checklist (assignment)

| Area | Implementation |
|------|----------------|
| Routes | `/`, `/posts/new`, `/posts/:id`, `/posts/:id/edit` |
| Persistence | `localStorage`; first visit seeds **12** posts from `src/data/seedPosts.json` |
| List | Cards with title, author, date, excerpt; **search by title**; **filter by author**; **6 posts per page** |
| Forms | Required title, author, content (min **20** chars); optional comma-separated tags; inline errors |
| Delete | Confirmation **modal** on edit and detail pages |
| Missing ID | Friendly “Post not found” + link home |

## Install and run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

```bash
npm run build    # production bundle
npm run preview  # preview production build
```

## Reset stored data

In the browser DevTools → **Application** → **Local Storage**, remove the key **`pms_posts`** for your origin, then reload. The app will seed again from `src/data/seedPosts.json`.

Alternatively, run in the console on the app origin:

```js
localStorage.removeItem('pms_posts');
location.reload();
```

## Screenshots / recording

Capture for your submission:

1. **List** — posts grid, search, author filter, pagination  
2. **Create** — form with validation  
3. **Detail** — full content, tags, timestamps, Back / Edit / Delete  
4. **Edit** — prefilled form, Save, Delete danger zone  
5. **Delete** — confirmation modal  

## Project structure

- `src/context/PostsContext.jsx` — posts CRUD + `localStorage` sync  
- `src/hooks/useLocalStorage.js` — generic JSON `localStorage` hook (utilities)  
- `src/utils/validators.js` — post form validation  
- `src/components/` — `PostCard`, `PostForm`, `Header`, `Pagination`, `DeleteConfirmModal`  
- `src/pages/` — `PostList`, `PostCreate`, `PostView`, `PostEdit`  
- `src/routes.jsx` — route table  

## Evaluation mapping (PDF)

- **CRUD & routing** — Full create, list, detail, edit, delete with the four routes above.  
- **State & persistence** — Context + hooks; ISO timestamps on create/update.  
- **UI/UX** — Navbar, sticky workflow, filters, pagination, modal delete, empty states.  
- **Code quality** — Separated pages, components, validators, seed data file.  

Stretch items from the brief (json-server, Jest, toasts, draft autosave) are **not** implemented here.
