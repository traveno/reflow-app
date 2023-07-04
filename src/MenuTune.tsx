import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart, Line } from 'react-chartjs-2';
import { RadioGroup, Switch } from '@headlessui/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    }
  },
};

const labels = ['5mm3/s', '10mm3/s', '15mm3/s', '20mm3/s', '25mm3/s'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Real Flow %',
      data: [100, 98, 95, 90, 85],
      borderColor: 'rgb(92, 255, 102)',
      backgroundColor: 'rgb(92, 255, 102)',
    },
    {
        label: 'Adjusted Flow %',
        data: [100, 101, 103, 105, 109],
        backgroundColor: 'rgb(8 145 178)',
        borderColor: 'rgb(8 145 178)',
      }
  ],
};

const visualOptions = [
    {
        name: 'Volumetric Flow'
    },
    {
        name: 'Adjusted Amount'
    }
]

export default function MenuTune() {
    const [selected, setSelected] = useState(visualOptions[0]);
    ChartJS.defaults.color = '#fff';

  return (
    <div>
        <div className="w-52 bg-zinc-800/90 rounded-xl flex flex-col mb-8">
            <div className="w-full flex flex-row justify-center bg-cyan-800 p-2 rounded-t-lg">
                <span className="text-white uppercase font-light">Visual</span>
            </div>
            <div className="flex flex-col gap-4 p-4">
            <RadioGroup value={selected} onChange={setSelected}>
                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                <div className="space-y-2">
                    {visualOptions.map((option) => (
                    <RadioGroup.Option
                        key={option.name}
                        value={option}
                        className={({ active, checked }) =>
                        `${
                            active
                            ? ''
                            : ''
                        }
                        ${
                            checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                        }
                            relative flex cursor-pointer rounded-lg px-4 py-2 focus:outline-none`
                        }
                    >
                        {({ active, checked }) => (
                        <>
                            <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                                <div className="text-sm">
                                <RadioGroup.Label
                                    as="p"
                                    className={`font-thin uppercase text-xs  ${
                                    checked ? 'text-white' : 'text-gray-900'
                                    }`}
                                >
                                    {option.name}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                    as="span"
                                    className={`inline ${
                                    checked ? 'text-sky-100' : 'text-gray-500'
                                    }`}
                                >
                                    <span>
                                    </span>{' '}
                                </RadioGroup.Description>
                                </div>
                            </div>
                            {checked && (
                                <div className="shrink-0 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            )}
                            </div>
                        </>
                        )}
                    </RadioGroup.Option>
                    ))}
                </div>
                </RadioGroup>
            </div>
        </div>
        <div className="bg-zinc-800/90 rounded-xl w-96 flex flex-col">
            <div className="w-full flex flex-row justify-center bg-cyan-800 p-2 rounded-t-lg">
                <span className="text-white uppercase font-light">Compensation Station</span>
            </div>
            <div className="px-2 py-2">
                <Line options={options} data={data} />
            </div>
            <div className="flex flex-row p-4 pt-2 gap-4">
                <button className="text-white bg-cyan-800 px-2 py-1 rounded-lg font-thin uppercase hover:bg-cyan-600 transition">Data Config</button>
                <button className="text-white bg-cyan-800 px-2 py-1 rounded-lg font-thin uppercase hover:bg-cyan-600 transition">Adjust</button>
            </div>
        </div>
    </div>
  );
}
