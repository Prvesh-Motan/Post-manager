import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../context/PostsContext.jsx';
import PostForm from '../components/PostForm.jsx';
import DeleteConfirmModal from '../components/DeleteConfirmModal.jsx';

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, updatePost, deletePost } = usePosts();
  const post = id ? getPost(id) : undefined;
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
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

  const initialValues = {
    title: post.title,
    author: post.author,
    content: post.content,
    tags: post.tags.join(', '),
  };

  function handleSubmit(data) {
    updatePost(post.id, data);
    navigate(`/posts/${post.id}`, { replace: true });
  }

  function handleDelete() {
    deletePost(post.id);
    setDeleteOpen(false);
    navigate('/', { replace: true });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">Edit post</h1>
      <p className="mt-1 text-sm text-slate-600">Update content and save changes.</p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <PostForm
          key={post.id}
          initialValues={initialValues}
          submitLabel="Save changes"
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/posts/${post.id}`)}
        />
      </div>

      <div className="mt-8 border-t border-slate-200 pt-8">
        <h2 className="text-sm font-semibold text-red-800">Danger zone</h2>
        <p className="mt-1 text-sm text-slate-600">Permanently delete this post.</p>
        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Delete post
        </button>
      </div>

      <DeleteConfirmModal
        open={deleteOpen}
        title={post.title}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
