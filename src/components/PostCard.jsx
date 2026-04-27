import { Link } from 'react-router-dom';
import { excerpt, formatDateTime } from '../utils/format.js';

export default function PostCard({ post }) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <h2 className="text-lg font-semibold text-slate-900">
        <Link
          to={`/posts/${post.id}`}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 rounded"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        <span className="font-medium text-slate-700">{post.author}</span>
        <span className="mx-2 text-slate-300" aria-hidden>
          ·
        </span>
        <time dateTime={post.createdAt}>{formatDateTime(post.createdAt)}</time>
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">{excerpt(post.content)}</p>
      <div className="mt-4">
        <Link
          to={`/posts/${post.id}`}
          className="text-sm font-medium text-sky-700 hover:text-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 rounded"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}
