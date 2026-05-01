import { ModulePage } from '@/components/ui/ModulePage';
import { moduleCopy } from '@/lib/module-content';

export default function ShippingPage() {
  const title = 'Shipping';
  return <ModulePage title={title} description={moduleCopy[title]} />;
}
