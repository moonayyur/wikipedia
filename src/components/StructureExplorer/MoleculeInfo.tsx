import { MF } from 'react-mf';
import { IdcodeSvgRenderer } from 'react-ocl';

import { IMolecule } from '../../hooks/DataContext';
import { useIdContext } from '../../hooks/IdContext';

interface MoleculeInfoProps {
  mol: IMolecule;
}

export function MoleculeInfo({ mol }: MoleculeInfoProps): JSX.Element {
  const { setSelectedTitle } = useIdContext();

  return (
    <div
      className="flex h-[217px] flex-col items-center justify-between overflow-hidden border py-1 text-xs font-bold hover:bg-lightgray"
      onClick={() => setSelectedTitle(mol.code)}
    >
      <div className="text-center">{mol.code}</div>
      <div className="">
        <IdcodeSvgRenderer height={135} width={180} idcode={mol.actID.value} />
      </div>
      <div className="">
        <div className="flex space-x-3">
          <div className="">MF:</div>
          <div className="font-normal">
            <MF mf={mol.mf.value} />
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="">MW:</div>
          <div className="font-normal">{mol.mw}</div>
        </div>
      </div>
    </div>
  );
}
