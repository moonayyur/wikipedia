import { useState, useEffect } from 'react';

export default function useGetData() {
  interface SMILEError {
    id: number;
    smiles: string;
    message: string;
  }
  const [date, setDate] = useState('');
  const [dup, setDup] = useState([]);
  const [notfound, setNotfound] = useState([]);
  const [nogood, setNogood] = useState([]);
  const [errors, setErrors] = useState<SMILEError[]>([]);
  const [dupLength, setDupLength] = useState('');
  const [notfoundLength, setNotfoundLength] = useState('');
  const [nogoodLength, setNogoodLength] = useState('');
  const [errorsLength, setErrorsLength] = useState('');

  useEffect(() => {
    void fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        setDate(JSON.stringify(myJson.count.date).slice(1, 11));
        setDup(myJson.data.dup);
        setNotfound(myJson.data.notfound);
        setNogood(myJson.data.nogood);
        setErrors(myJson.data.errors);
        setDupLength(JSON.stringify(myJson.count.dup));
        setNotfoundLength(JSON.stringify(myJson.count.notfound));
        setNogoodLength(JSON.stringify(myJson.count.nogood));
        setErrorsLength(JSON.stringify(myJson.count.errors));
      });
  }, []);
  return {
    date,
    dup,
    notfound,
    nogood,
    errors,
    dupLength,
    notfoundLength,
    nogoodLength,
    errorsLength,
  };
}
