import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import HomeMobileNav from "@/components/home/HomeMobileNav";
import HomeNav from "@/components/home/HomeNav";
import Image from "next/image";
import Link from "next/link";
// import { app } from "@/lib/firebase";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex flex-col">

            <main className="relative flex bg-black-3">
                <LeftSideBar />
                <section className="
                    flex min-h-screen bg-black-3 flex-1 flex-col 
                    ">
                    <div className="mx-auto flex  w-full flex-col  ">
                      <HomeMobileNav />
                   
                     <div className="lg:ml-[270px]  xl:mr-[270px] m-4 p-4">
                     {children}
                     </div>
                    </div>
                </section>

                <RightSideBar />
            </main>
        </div>


    )
}