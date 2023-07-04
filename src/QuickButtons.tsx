import { Tooltip, TooltipContent, TooltipTrigger } from "./lib/Tooltip";

export default function QuickButtons() {

    function onRefreshClick() {
        window.location.reload();
    }

    return (
        <div className="p-4 bg-zinc-800/90 rounded-xl flex flex-col gap-4">
            <Tooltip placement="left">
                <TooltipTrigger onClick={onRefreshClick}>
                    <div className="rounded-xl border-2 border-cyan-600 p-4 bg-cyan-800/25 hover:bg-cyan-600 hover:cursor-pointer transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-8 h-8 stroke-cyan-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="tooltip-style"><span className="font-thin">Open .gcode</span></TooltipContent>
            </Tooltip>
            <Tooltip placement="left">
                <TooltipTrigger onClick={onRefreshClick}>
                    <div className="rounded-xl border-2 border-cyan-600 p-4 bg-cyan-800/25 hover:bg-cyan-600 hover:cursor-pointer transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-8 h-8 stroke-cyan-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="tooltip-style"><span className="font-thin">Refresh App (DevMode!)</span></TooltipContent>
            </Tooltip>
            <Tooltip placement="left">
                <TooltipTrigger>
                    <div className="rounded-xl border-2 border-cyan-600 p-4 bg-cyan-800/25 hover:bg-cyan-600 hover:cursor-pointer transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-8 h-8 stroke-cyan-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>

                    </div>
                </TooltipTrigger>
                <TooltipContent className="tooltip-style"><span className="font-thin">EM Stats</span></TooltipContent>
            </Tooltip>
            <Tooltip placement="left">
                <TooltipTrigger>
                    <div className="rounded-xl border-2 border-cyan-600 p-4 bg-cyan-800/25 hover:bg-cyan-600 hover:cursor-pointer transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-8 h-8 stroke-cyan-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="tooltip-style"><span className="font-thin">Export .gcode</span></TooltipContent>
            </Tooltip>
        </div>
    );
}