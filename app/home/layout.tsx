import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import HomeMobileNav from "@/components/home/HomeMobileNav";
import Image from "next/image";
import Link from "next/link";

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
                      {children}
                    </div>
                </section>

                <RightSideBar />
            </main>
        </div>


    )
}