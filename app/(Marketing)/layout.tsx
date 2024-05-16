import {Navbar} from "@/app/(Marketing)/_components/Navbar";
import {Footer} from "@/app/(Marketing)/_components/Footer";

const MartketingLayout = ({
    children
}:{
    children : React.ReactNode;
}) => {
    return(
        <div className="h-full bg-slate-100">
            <Navbar/>
            <main className="pt-40 pb-20 bg-slate-100">
                {children}
            </main>
            <Footer/>
        </div>
    )
};

export default MartketingLayout;