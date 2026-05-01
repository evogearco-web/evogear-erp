import { ModulePage } from '@/components/ui/ModulePage';
import { moduleCopy } from '@/lib/module-content';

export default function CustomersPage() {
  const title = 'Customers';
  return <ModulePage title={title} description={moduleCopy[title]} />;
}
