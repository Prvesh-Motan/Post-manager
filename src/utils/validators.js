const MIN_CONTENT_LENGTH = 20;

export const MIN_CONTENT = MIN_CONTENT_LENGTH;

/**
 * @param {string} tagsInput - comma-separated from form
 */
export function parseTags(tagsInput) {
  if (!tagsInput || typeof tagsInput !== 'string') return [];
  return tagsInput
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * @param {{ title?: string, author?: string, content?: string }} values
 */
export function validatePostForm(values) {
  const errors = {};

  const title = values.title?.trim() ?? '';
  const author = values.author?.trim() ?? '';
  const content = typeof values.content === 'string' ? values.content : '';

  if (!title) errors.title = 'Title is required.';
  if (!author) errors.author = 'Author is required.';
  if (!content.trim()) errors.content = 'Content is required.';
  else if (content.trim().length < MIN_CONTENT_LENGTH) {
    errors.content = `Content must be at least ${MIN_CONTENT_LENGTH} characters.`;
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}
