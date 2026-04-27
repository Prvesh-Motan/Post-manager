import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext.jsx';
import PostForm from '../components/PostForm.jsx';

export default function PostCreate() {
  const navigate = useNavigate();
  const { createPost } = usePosts();

  function handleSubmit(data) {
    const post = createPost(data);
    navigate(`/posts/${post.id}`, { replace: true });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900">New post</h1>
      <p className="mt-1 text-sm text-slate-600">Fields marked with * are required.</p>
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <PostForm submitLabel="Create post" onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
      </div>
    </div>
  );
}
