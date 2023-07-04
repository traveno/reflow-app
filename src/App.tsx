import { useState } from "react";
import MenuSide from "./MenuSide";
import Render from "./Render";
import { Dialog } from "@headlessui/react";
import QuickButtons from "./QuickButtons";
import MenuTune from "./MenuTune";

function App() {
  

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-8 mr-8 z-50">
        <QuickButtons />
      </div>
      <div className="fixed bottom-0 left-0 mb-8 ml-8 z-50">
        <MenuTune />
      </div>
      <div className="flex flex-row h-screen w-screen bg-zinc-900">
        <div className="flex-1">
          <Render />
        </div>
      </div>
    </>
  );
}

export default App;

function MyDialog() {
  let [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto rounded-xl p-6 bg-zinc-300">
          <Dialog.Title className="font-semibold">Complete your order</Dialog.Title>

          <Dialog.Description className="font-light">Description of panel</Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}