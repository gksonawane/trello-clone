import {OrganizationProfile} from "@clerk/nextjs";

const SettingPage = () => {
    return(
        <div className="w-full ">
            <OrganizationProfile
                routing='hash'
                appearance={{
                    elements:{
                        rootBox:{
                            boxShadow:"none",
                            width:"100%"

                        },
                        cardBox : {
                            border:"1px solid #e5e5e5",
                            boxShadow:"none",
                            width:"100%",
                            height:"30rem"
                        }
                    }
                }}
            />
        </div>
    )
}

export default SettingPage;

//   border:"1px solid #e5e5e5",