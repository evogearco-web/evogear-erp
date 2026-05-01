import { ModulePage } from '@/components/ui/ModulePage';
import { moduleCopy } from '@/lib/module-content';

export default function InvoicesPage() {
  const title = 'Invoices';
  return <ModulePage title={title} description={moduleCopy[title]} />;
}
