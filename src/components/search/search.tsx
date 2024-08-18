import {Input} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";

export default function SearchComponent() {
  return (
    <div className="sm:w-[60%] w-[90%] h-16 px-5 mt-5 sm:mt-5 rounded-2xl flex justify-center items-center text-white shadow-lg">
      <Input
        isClearable
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            "border-none"
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
    </div>
  );
}
