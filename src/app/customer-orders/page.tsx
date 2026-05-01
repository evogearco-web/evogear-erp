import { ModulePage } from '@/components/ui/ModulePage';
import { moduleCopy } from '@/lib/module-content';

export default function CustomerOrdersPage() {
  const title = 'Customer Orders';
  return <ModulePage title={title} description={moduleCopy[title]} />;
}
