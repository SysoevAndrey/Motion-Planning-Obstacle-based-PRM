import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import { parseJsonFile } from './utils/parseJsonFile';
import { EStatus, IPolyline, TEntity } from './types';
import { solve } from './main';

function App() {
    const [file, setFile] = useState<File>();
    const [status, setStatus] = useState<EStatus>(EStatus.initial);
    const dataRef = useRef<TEntity[] | null>(null);
    const blobRef = useRef<Blob | null>(null);
    const [count, setCount] = useState(0);

    const resultsRef = useRef<number[]>([]);

    const disabled = !(
        status === EStatus.loaded || status === EStatus.noSolution
    );

    const startTimeRef = useRef<number | null>(null);
    const endTimeRef = useRef<number | null>(null);

    useEffect(() => {
        (async () => {
            if (file) {
                dataRef.current = await parseJsonFile(file);
            }
        })();
    }, [file]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setStatus(EStatus.loaded);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus(EStatus.processing);

        if (dataRef.current) {
            try {
                startTimeRef.current = performance.now();
                const result = await solve(dataRef.current);
                endTimeRef.current = performance.now();
                resultsRef.current.push(
                    endTimeRef.current - startTimeRef.current
                );
                setStatus(EStatus.hasSolution);
                generateBlob(result);

                if (resultsRef.current.length < 100) {
                    handleSubmit(event);
                } else {
                    console.log('finished');
                }
            } catch (e) {
                setCount(count + 1);
                if (count < 100) {
                    handleSubmit(event);
                } else {
                    setStatus(EStatus.noSolution);
                }
            }
        }
    };

    const generateBlob = (data: IPolyline[]) => {
        const jsonContent = JSON.stringify(data, null, 2); // null, 2 - для отступов и красивого форматирования

        blobRef.current = new Blob([jsonContent], { type: 'application/json' });
    };

    const downloadFile = () => {
        const sum = resultsRef.current.reduce((acc, item) => acc + item, 0);
        console.log(sum / resultsRef.current.length);
        if (blobRef.current) {
            const downloadLink = document.createElement('a');
            downloadLink.download = 'solution.json'; // Имя файла
            downloadLink.href = window.URL.createObjectURL(blobRef.current);
            downloadLink.click();
        }
    };

    return (
        <div className="flex flex-col gap-3 items-center justify-center h-screen">
            <div className="flex flex-col gap-2 border-solid border-2 border-indigo-600 rounded-md p-5">
                <h1>Статус: {status}</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center space-x-6"
                >
                    <label className="block">
                        <span className="sr-only">Choose file</span>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "
                        />
                    </label>
                    <button
                        disabled={disabled}
                        className="px-8 py-3 text-white bg-violet-600 rounded-full focus:outline-none disabled:opacity-25"
                    >
                        Запуск
                    </button>
                </form>
                {status === EStatus.hasSolution &&
                    endTimeRef.current &&
                    startTimeRef.current && (
                        <>
                            <p>
                                Время нахождения решения:&nbsp;
                                {(
                                    endTimeRef.current - startTimeRef.current
                                ).toFixed(2)}{' '}
                                ms
                            </p>
                            <button
                                onClick={downloadFile}
                                className="px-8 py-3 text-white bg-violet-600 rounded-full focus:outline-none disabled:opacity-25"
                            >
                                Скачать решение
                            </button>
                        </>
                    )}
            </div>
        </div>
    );
}

export default App;
