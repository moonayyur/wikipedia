import SimpleTable from '../SimpleTable';

import { ErrorSection } from './ErrorSection';

function Content(): JSX.Element {
  return (
    <div className="scrollbar grid max-h-[204px] grid-cols-10 overflow-y-auto">
      {/* DATA */}
      <div className="flex justify-center border py-2 text-xs">3334</div>
    </div>
  );
}

export function NotFound(): JSX.Element {
  return (
    <ErrorSection
      title="Not found :"
      number={2130}
      description="List of pages that contain a ChemBox or DrugBox but no SMILES field"
      table={
        <SimpleTable
          title="Article ID"
          content={<Content />}
          height="h-[204px]"
          className="text-sm"
        />
      }
    />
  );
}
