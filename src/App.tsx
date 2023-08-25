import { EdDSAPCDPackage } from "@pcd/eddsa-pcd"
import { getWithoutProvingUrl, openPassportPopup, usePassportPopupMessages } from "@pcd/passport-interface"
import { useCallback, useEffect } from "react"

export default function App() {
    const [passportPCDStr] = usePassportPopupMessages()

    useEffect(() => {
        console.log(passportPCDStr)
    }, [passportPCDStr])

    const getSemaphoreSignature = useCallback(() => {
        const url = getWithoutProvingUrl(
            process.env.PCDPASS_URL,
            window.location.origin + "/popup",
            EdDSAPCDPackage.name
        )

        openPassportPopup("/popup", url)
    }, [])

    return <button onClick={getSemaphoreSignature}>Get a PCD from PCD pass</button>
}
