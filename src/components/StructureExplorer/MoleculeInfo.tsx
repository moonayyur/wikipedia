import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import { AiOutlineLink, AiOutlineSearch } from 'react-icons/ai';
import { MF } from 'react-mf';
import { IdcodeSvgRenderer } from 'react-ocl';

import { IMolecule } from '../../hooks/DataContext';
import { useIdContext } from '../../hooks/IdContext';

interface MoleculeInfoProps {
  mol: IMolecule;
}

export function MoleculeInfo({ mol }: MoleculeInfoProps): JSX.Element {
  const { selectedTitle, setSelectedTitle, setSimIdCode } = useIdContext();

  return (
    <button
      type="button"
      className={clsx(
        'group flex h-[217px] w-full flex-col items-center justify-between overflow-hidden border py-2 px-1 text-xs',
        {
          'border-darkgray bg-darkgray': mol.code === selectedTitle,
          'hover:bg-lightgray': mol.code !== selectedTitle,
        },
      )}
      onClick={() => setSelectedTitle(mol.code)}
    >
      <Tooltip
        title="Similar molecules"
        placement="top"
        arrow
        className="absolute top-1.5 left-2 "
      >
        <div
          onClick={() => {
            setSimIdCode(mol.actID.value);
          }}
        >
          <AiOutlineSearch className="transform text-xl text-darkblue opacity-0 transition-all duration-150 ease-in-out hover:scale-125 group-hover:opacity-100" />
        </div>
      </Tooltip>
      <div className="mx-5 text-center font-bold">{mol.code}</div>
      <Tooltip
        title="Wikipedia article"
        placement="top"
        arrow
        className="absolute top-1.5 right-2"
      >
        <a
          href={`https://en.wikipedia.org/wiki/${mol.code}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineLink className="transform text-xl text-darkblue opacity-0 transition-all duration-150 ease-in-out hover:scale-125 group-hover:opacity-100" />
        </a>
      </Tooltip>

      <div>
        <IdcodeSvgRenderer height={135} width={180} idcode={mol.actID.value} />
      </div>
      <div className="flex flex-wrap justify-center gap-x-1">
        <div>
          <MF mf={mol.mf.value} />
        </div>
        <div className="flex">
          (<div className="mr-0.5 font-bold">mw:</div>
          <div>{mol.mw.toFixed(2)}</div>)
        </div>
      </div>
    </button>
  );
}
