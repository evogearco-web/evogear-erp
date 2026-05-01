import { ModulePage } from '@/components/ui/ModulePage';
import { moduleCopy } from '@/lib/module-content';

export default function SupplierOrdersPage() {
  const title = 'Supplier Orders';
  return <ModulePage title={title} description={moduleCopy[title]} />;
}
