import { useState, useEffect } from 'react';
import { validatePostForm, parseTags, MIN_CONTENT } from '../utils/validators.js';

const emptyErrors = { title: '', author: '', content: '' };

export default function PostForm({
  initialValues = { title: '', author: '', content: '', tags: '' },
  submitLabel = 'Save',
  onSubmit,
  onCancel,
}) {
  const [title, setTitle] = useState(initialValues.title ?? '');
  const [author, setAuthor] = useState(initialValues.author ?? '');
  const [content, setContent] = useState(initialValues.content ?? '');
  const [tags, setTags] = useState(initialValues.tags ?? '');
  const [errors, setErrors] = useState(emptyErrors);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setTitle(initialValues.title ?? '');
    setAuthor(initialValues.author ?? '');
    setContent(initialValues.content ?? '');
    setTags(initialValues.tags ?? '');
    setErrors(emptyErrors);
    setTouched({});
  }, [
    initialValues.title,
    initialValues.author,
    initialValues.content,
    initialValues.tags,
  ]);

  function runValidate() {
    const { errors: e, isValid } = validatePostForm({ title, author, content });
    setErrors({
      title: e.title || '',
      author: e.author || '',
      content: e.content || '',
    });
    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ title: true, author: true, content: true });
    if (!runValidate()) return;
    const tagList = parseTags(tags);
    onSubmit({ title, author, content, tags: tagList });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="post-title" className="block text-sm font-medium text-slate-700">
          Title <span className="text-red-600">*</span>
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, title: true }))}
          aria-invalid={touched.title && !!errors.title}
          aria-describedby={touched.title && errors.title ? 'post-title-error' : undefined}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          autoComplete="off"
        />
        {touched.title && errors.title ? (
          <p id="post-title-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.title}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="post-author" className="block text-sm font-medium text-slate-700">
          Author <span className="text-red-600">*</span>
        </label>
        <input
          id="post-author"
          type="text"
          value={author}
          onChange={(ev) => setAuthor(ev.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, author: true }))}
          aria-invalid={touched.author && !!errors.author}
          aria-describedby={touched.author && errors.author ? 'post-author-error' : undefined}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          autoComplete="off"
        />
        {touched.author && errors.author ? (
          <p id="post-author-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.author}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="post-content" className="block text-sm font-medium text-slate-700">
          Content <span className="text-red-600">*</span>
        </label>
        <textarea
          id="post-content"
          rows={8}
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, content: true }))}
          aria-invalid={touched.content && !!errors.content}
          aria-describedby={touched.content && errors.content ? 'post-content-error' : undefined}
          placeholder={`Minimum ${MIN_CONTENT} characters`}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
        />
        {touched.content && errors.content ? (
          <p id="post-content-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.content}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="post-tags" className="block text-sm font-medium text-slate-700">
          Tags <span className="font-normal text-slate-500">(optional, comma-separated)</span>
        </label>
        <input
          id="post-tags"
          type="text"
          value={tags}
          onChange={(ev) => setTags(ev.target.value)}
          placeholder="react, ui, tutorial"
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
        >
          {submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
