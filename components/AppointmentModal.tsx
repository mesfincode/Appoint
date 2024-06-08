// import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Profile, profileRepCard } from "@/types"
import { CopyIcon } from "lucide-react"

interface modalProps {
    isOpen: boolean;
    handleClose: () => void;
    profile: Profile | null
}
const AppointmentModal = ({ isOpen, handleClose,profile }: modalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={handleClose} >
            {/* <DialogTrigger asChild>
                <Button variant="outline">Share</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-[425px]  z-50">
                <DialogHeader>
                    <DialogTitle>{profile?.name}</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AppointmentModal
