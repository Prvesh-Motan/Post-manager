import Header from './components/Header.jsx';
import AppRoutes from './routes.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <AppRoutes />
      </main>
    </div>
  );
}
