import "./styles.css";
import { useState } from 'react'
import { Switch } from '@headlessui/react'

function MenuSide() {

    return (
        <div className="w-72 h-screen bg-zinc-800 flex flex-col justify-start items-center">
            <div>test</div>
            <div><Example /></div>
        </div>
    );
}



function Example() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="py-4">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-green-500' : 'bg-green-900'}
          relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}


export default MenuSide;