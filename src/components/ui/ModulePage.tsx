import { DataTablePlaceholder } from './DataTablePlaceholder';
import { FilterBar } from './FilterBar';
import { PageHeader } from './PageHeader';
import { SlideInDrawer } from './SlideInDrawer';

export function ModulePage({ title, description }: { title: string; description: string }) {
  return (
    <section className="space-y-4">
      <PageHeader title={title} description={description} primaryActionLabel={`New ${title.slice(0, -1) || title}`} />
      <FilterBar />
      <div className="flex justify-end"><SlideInDrawer /></div>
      <DataTablePlaceholder title={title} />
    </section>
  );
}
