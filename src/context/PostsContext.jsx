import { createContext, useContext, useMemo, useCallback, useState, useEffect } from 'react';
import seedPosts from '../data/seedPosts.json';

export const STORAGE_KEY = 'pms_posts';

const PostsContext = createContext(null);

function normalizePosts(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((p) => ({
    ...p,
    tags: Array.isArray(p.tags) ? p.tags : [],
  }));
}

function loadInitialPosts() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null || raw === '') {
      const seeded = normalizePosts(seedPosts);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return normalizePosts(JSON.parse(raw));
  } catch {
    const seeded = normalizePosts(seedPosts);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    } catch {
      /* ignore */
    }
    return seeded;
  }
}

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(loadInitialPosts);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch {
      /* quota */
    }
  }, [posts]);

  const getPost = useCallback((id) => posts.find((p) => p.id === id), [posts]);

  const createPost = useCallback(({ title, author, content, tags }) => {
    const now = new Date().toISOString();
    const post = {
      id: crypto.randomUUID(),
      title: title.trim(),
      author: author.trim(),
      content: typeof content === 'string' ? content.trim() : content,
      tags,
      createdAt: now,
      updatedAt: now,
    };
    setPosts((prev) => [post, ...prev]);
    return post;
  }, []);

  const updatePost = useCallback((id, { title, author, content, tags }) => {
    const now = new Date().toISOString();
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              title: title.trim(),
              author: author.trim(),
              content: typeof content === 'string' ? content.trim() : content,
              tags,
              updatedAt: now,
            }
          : p
      )
    );
  }, []);

  const deletePost = useCallback((id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      posts,
      getPost,
      createPost,
      updatePost,
      deletePost,
    }),
    [posts, getPost, createPost, updatePost, deletePost]
  );

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts must be used within PostsProvider');
  return ctx;
}
