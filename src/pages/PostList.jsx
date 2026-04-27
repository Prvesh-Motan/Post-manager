import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../context/PostsContext.jsx';
import PostCard from '../components/PostCard.jsx';
import Pagination from '../components/Pagination.jsx';

const PAGE_SIZE = 6;

export default function PostList() {
  const { posts } = usePosts();
  const [search, setSearch] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [page, setPage] = useState(1);

  const authors = useMemo(() => {
    const set = new Set(posts.map((p) => p.author).filter(Boolean));
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      const titleOk = !q || p.title.toLowerCase().includes(q);
      const authorOk = !authorFilter || p.author === authorFilter;
      return titleOk && authorOk;
    });
  }, [posts, search, authorFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, authorFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const sliceStart = (safePage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(sliceStart, sliceStart + PAGE_SIZE);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Posts</h1>
          <p className="mt-1 text-sm text-slate-600">Search by title and filter by author.</p>
        </div>
        <Link
          to="/posts/new"
          className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
        >
          Create post
        </Link>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="search-title" className="block text-sm font-medium text-slate-700">
            Search by title
          </label>
          <input
            id="search-title"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type to filter…"
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
        </div>
        <div>
          <label htmlFor="filter-author" className="block text-sm font-medium text-slate-700">
            Filter by author
          </label>
          <select
            id="filter-author"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          >
            <option value="">All authors</option>
            {authors.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-6 py-12 text-center">
          <p className="text-slate-700">No posts yet.</p>
          <Link to="/posts/new" className="mt-3 inline-block font-medium text-sky-700 hover:underline">
            Create your first post
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
          <p className="text-slate-700">No posts match your search or filter.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setAuthorFilter('');
            }}
            className="mt-4 text-sm font-medium text-sky-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <ul className="grid gap-6 sm:grid-cols-2">
            {pageItems.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Pagination
              page={safePage}
              pageCount={pageCount}
              totalItems={filtered.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
