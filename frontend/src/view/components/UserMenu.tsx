import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../app/hooks/useAuth";
import { DropdownMenu } from "./DropdownMenu";

export function UserMenu(){
  const {signout, user} = useAuth();
  console.log({user})
  return (
    <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      <div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100">
        <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
         KC
        </span>
      </div>
    </DropdownMenu.Trigger>


      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item className="flex items-center justify-between"
        onSelect={signout}
        >
          Sair
          <ExitIcon className="w-4 h-4"/>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
  </DropdownMenu.Root>
  )
}
