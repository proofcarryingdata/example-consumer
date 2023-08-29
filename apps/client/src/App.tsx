import { EdDSAPCDPackage } from "@pcd/eddsa-pcd"
import { getWithoutProvingUrl, openPassportPopup, usePassportPopupMessages } from "@pcd/passport-interface"
import { useCallback, useEffect } from "react"

/**
 * It takes a message signed with your EdDSA key containing a
 * color and uses it as the background color of the app page
 * if the signature is valid.
 */
export default function App() {
    const [passportPCDString] = usePassportPopupMessages()

    useEffect(() => {
        ;(async () => {
            await EdDSAPCDPackage.init({})

            if (passportPCDString) {
                const { pcd: serializedPCD } = JSON.parse(passportPCDString)

                const pcd = await EdDSAPCDPackage.deserialize(serializedPCD)

                if (await EdDSAPCDPackage.verify(pcd)) {
                    const color = pcd.claim.message[0].toString(16)

                    const appElement = document.getElementById("app")

                    alert(`The signature is valid, #${color} will be used as a background color!`)

                    appElement.style.backgroundColor = `#${color}`
                } else {
                    alert(`The signature is not valid!`)
                }
            }
        })()
    }, [passportPCDString])

    const getEdDSAPCD = useCallback(() => {
        const url = getWithoutProvingUrl(
            process.env.PCDPASS_URL,
            window.location.origin + "/popup",
            EdDSAPCDPackage.name
        )

        openPassportPopup("/popup", url)
    }, [])

    return <button onClick={getEdDSAPCD}>Get PCD signature</button>
}
