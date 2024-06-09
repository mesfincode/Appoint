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
import Image from "next/image"

interface modalProps {
    isOpen: boolean;
    handleClose: () => void;
    profile: Profile | null
}
const AppointmentModal = ({ isOpen, handleClose, profile }: modalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={handleClose} >
            {/* <DialogTrigger asChild>
                <Button variant="outline">Share</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-[425px]  z-50">
                <DialogHeader>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <DialogTitle >Request Appointment</DialogTitle>
                        <DialogDescription>
                            Fill the following form and request appointment
                        </DialogDescription>
                    </div>
                </DialogHeader>
                <div className="flex flex-col justify-center items-center gap-1">
                    <div className="pb-4 flex flex-col justify-center items-center">
                        {
                            profile?.profileUrl && (
                                <Image src={profile?.profileUrl} width={40} height={40} alt={profile.name} style={{ borderRadius: "100%" }} />

                            )
                        }
                        <h1>{profile?.name}</h1>
                        <h1>{profile?.company}</h1>
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
