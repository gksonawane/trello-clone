import Link from "next/link";
import Image from "next/image";
import { Work_Sans } from "next/font/google";

import { cn } from "@/lib/utils";

const textFont = Work_Sans({
    subsets:["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900"
    ]
})

const Logo = () => {
    return(
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image
                    src="/logo.png"
                    alt="logo"
                    height={30}
                    width={30}
                />
                <p className={cn("" +
                    "text-xl text-neutral-700 pb-1 font-bold",
                    textFont.className,
                )}>
                    Taskify
                </p>
            </div>
        </Link>
    )
}

export default  Logo;