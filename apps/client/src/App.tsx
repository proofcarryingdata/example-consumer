import { deserialize, EdDSAPCDPackage, init as initEdDSAPCD, verify } from "@pcd/eddsa-pcd"
import { getWithoutProvingUrl, openPassportPopup, usePassportPopupMessages } from "@pcd/passport-interface"
import { useCallback, useEffect, useState } from "react"

/**
 * This component consumes a message signed with an EdDSA key. If you have provided a valid signature,
 * it uses the color as the background of the web app page. This background is preserved as long as
 * you do not consume a signature on a different colour.
 */
export default function App() {
    const [passportPCDString] = usePassportPopupMessages()
    const [bgColor, setBgColor] = useState<string>()

    useEffect(() => {
        // Get the color extracted from the latest valid message signed with an EdDSA key.
        const getLatestConsumedColor = async () => {
            const response = await fetch(`http://localhost:${process.env.SERVER_PORT}/color/get`, {
                method: "GET",
                mode: "cors"
            })

            if (!!response.ok) {
                const body = await response.json()
                setBgColor(body.color)
            }
        }

        getLatestConsumedColor()
    }, [])

    useEffect(() => {
        // Update the background color accordingly to color change.
        const appElement = document.getElementById("app")!

        appElement.style.backgroundColor = `#${bgColor}`
    }, [bgColor])

    useEffect(() => {
        ;(async () => {
            await initEdDSAPCD()

            if (passportPCDString) {
                const { pcd: serializedPCD } = JSON.parse(passportPCDString)

                const pcd = await deserialize(serializedPCD)

                if (await verify(pcd)) {
                    // Get PCD claim (color).
                    const color = pcd.claim.message[0].toString(16)

                    // Store consumed color on the server.
                    await fetch(`http://localhost:${process.env.SERVER_PORT}/color/set`, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            color: color
                        })
                    })

                    alert(`The signature is valid, #${color} will be used as a background color!`)

                    setBgColor(color)
                } else {
                    alert(`The signature is not valid!`)
                }
            }
        })()
    }, [passportPCDString])

    const getEdDSAPCD = useCallback(() => {
        const url = getWithoutProvingUrl(
            process.env.PCDPASS_URL as string,
            window.location.origin + "/popup",
            EdDSAPCDPackage.name
        )

        openPassportPopup("/popup", url)
    }, [])

    return <button onClick={getEdDSAPCD}>Get PCD signature</button>
}
