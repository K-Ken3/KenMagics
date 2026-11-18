import { saveProject } from '../actions';

type ProjectValues = {
  id: string;
  slug: string;
  title: string;
  kind: string;
  category: string;
  year: string;
  client: string;
  role: string;
  summary: string;
  longDescription: string;
  coverImage: string;
  coverAlt: string;
  tags: string;
  tools: string;
  externalLink: string;
  featured: boolean;
  status: string;
  sortOrder: number;
  readTime: string;
  aspectRatio: string;
  challenge: string;
  solution: string;
  impact: string;
  gallery: string;
  needsRealMedia: boolean;
};

export function ProjectForm({ project }: { project: ProjectValues }) {
  const text = (name: keyof ProjectValues, label: string, extra: Record<string, unknown> = {}) => (
    <label key={name}>
      <span className="label">{label}</span>
      <input name={name} defaultValue={String(project[name] ?? '')} {...extra} />
    </label>
  );
  const area = (name: keyof ProjectValues, label: string) => (
    <label key={name}>
      <span className="label">{label}</span>
      <textarea name={name} rows={4} defaultValue={String(project[name] ?? '')} />
    </label>
  );
  const check = (name: keyof ProjectValues, label: string) => (
    <label className="admin-check" key={name}>
      <input name={name} type="checkbox" defaultChecked={Boolean(project[name])} />
      <span>{label}</span>
    </label>
  );

  return (
    <form className="admin-form" action={saveProject}>
      <input type="hidden" name="id" value={project.id} />
      <div className="admin-form__grid">
        {text('title', 'Title', { required: true })}
        {text('slug', 'URL slug', { required: true })}
        <label>
          <span className="label">Kind</span>
          <select name="kind" defaultValue={project.kind}>
            <option value="software">Software</option>
            <option value="design">Design / video</option>
          </select>
        </label>
        <label>
          <span className="label">Status</span>
          <select name="status" defaultValue={project.status}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        {text('category', 'Category')}
        {text('year', 'Year')}
        {text('client', 'Client')}
        {text('role', 'Role')}
        {text('tags', 'Tags (comma separated)')}
        {text('tools', 'Tools (comma separated)')}
        {text('sortOrder', 'Sort order', { type: 'number' })}
        {text('readTime', 'Read time')}
        {text('aspectRatio', 'Aspect ratio')}
        {text('coverImage', 'Cover image URL', { required: true })}
        {text('coverAlt', 'Cover alt text')}
        {text('externalLink', 'External link')}
        {area('summary', 'Summary')}
        {area('longDescription', 'Long description')}
        {area('challenge', 'Challenge')}
        {area('solution', 'Solution')}
        {area('impact', 'Impact')}
        <label className="admin-span">
          <span className="label">Gallery — one per line: URL | Alt | Caption | Poster (poster optional)</span>
          <textarea name="gallery" rows={5} defaultValue={project.gallery} placeholder="/work/shot-01.jpg | Dashboard overview | Fig. 01" />
        </label>
      </div>
      <div className="admin-form__checks">
        {check('featured', 'Featured')}
        {check('needsRealMedia', 'Needs real media (inherited stock asset)')}
      </div>
      <div className="admin-form__actions">
        <button className="button" type="submit">Save project</button>
        <a className="admin-preview" href="/admin/projects">Cancel</a>
      </div>
    </form>
  );
}
