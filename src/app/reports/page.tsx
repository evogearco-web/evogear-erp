import { ModulePage } from '@/components/ui/ModulePage';
import { moduleCopy } from '@/lib/module-content';

export default function ReportsPage() {
  const title = 'Reports';
  return <ModulePage title={title} description={moduleCopy[title]} />;
}
