import { ModulePage } from '@/components/ui/ModulePage';
import { moduleCopy } from '@/lib/module-content';

export default function QuotationsPage() {
  const title = 'Quotations';
  return <ModulePage title={title} description={moduleCopy[title]} />;
}
