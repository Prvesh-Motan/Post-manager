import { Routes, Route } from 'react-router-dom';
import PostList from './pages/PostList.jsx';
import PostCreate from './pages/PostCreate.jsx';
import PostView from './pages/PostView.jsx';
import PostEdit from './pages/PostEdit.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/new" element={<PostCreate />} />
      <Route path="/posts/:id" element={<PostView />} />
      <Route path="/posts/:id/edit" element={<PostEdit />} />
    </Routes>
  );
}
