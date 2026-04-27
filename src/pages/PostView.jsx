import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../context/PostsContext.jsx';
import { formatDateTime } from '../utils/format.js';
import DeleteConfirmModal from '../components/DeleteConfirmModal.jsx';

export default function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, deletePost } = usePosts();
  const post = id ? getPost(id) : undefined;
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-slate-900">Post not found</h1>
        <p className="mt-2 text-slate-600">This post may have been deleted or the link is invalid.</p>
        <Link
          to="/"
          className="mt-6 inline-block font-medium text-sky-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
        >
          Back to all posts
        </Link>
      </div>
    );
  }

  function handleDelete() {
    deletePost(post.id);
    setDeleteOpen(false);
    navigate('/', { replace: true });
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <nav aria-label="Breadcrumb">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm font-medium text-sky-700 hover:text-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
        >
          ← Back
        </button>
        <span className="mx-2 text-slate-300" aria-hidden>
          /
        </span>
        <Link to="/" className="text-sm font-medium text-sky-700 hover:text-sky-800">
          All posts
        </Link>
      </nav>

      <header className="mt-6 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{post.title}</h1>
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-medium text-slate-800">{post.author}</span>
        </p>
        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600">
          <div>
            <dt className="sr-only">Created</dt>
            <dd>
              Created{' '}
              <time dateTime={post.createdAt} className="font-medium text-slate-700">
                {formatDateTime(post.createdAt)}
              </time>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Updated</dt>
            <dd>
              Updated{' '}
              <time dateTime={post.updatedAt} className="font-medium text-slate-700">
                {formatDateTime(post.updatedAt)}
              </time>
            </dd>
          </div>
        </dl>
        {post.tags?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag}>
                <span className="inline-flex rounded-full bg-sky-100 px-3 py-0.5 text-xs font-medium text-sky-900">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="prose prose-slate mt-8 max-w-none">
        <div className="whitespace-pre-wrap text-base leading-relaxed text-slate-800">{post.content}</div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-200 pt-8">
        <Link
          to={`/posts/${post.id}/edit`}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Delete
        </button>
      </div>

      <DeleteConfirmModal
        open={deleteOpen}
        title={post.title}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </article>
  );
}
