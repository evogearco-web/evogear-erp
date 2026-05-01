import { ModulePage } from '@/components/ui/ModulePage';
import { moduleCopy } from '@/lib/module-content';

export default function ProductsPage() {
  const title = 'Products';
  return <ModulePage title={title} description={moduleCopy[title]} />;
}
