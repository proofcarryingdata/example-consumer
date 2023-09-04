import { EdDSAPCDPackage } from "@pcd/eddsa-pcd"
import { getWithoutProvingUrl, openPassportPopup, usePassportPopupMessages } from "@pcd/passport-interface"
import { useCallback, useEffect } from "react"

/**
 * This page allows users to get an EdDSA PCD containing a color as a message signed by
 * the issuer. If the signature is valid the color is stored in the server and the background color
 * of this page will be changed.
 */
export default function App() {
    const [passportPCDString] = usePassportPopupMessages()

    // Get the latest color stored in the server.
    useEffect(() => {
        ;(async () => {
            const response = await fetch(`http://localhost:${process.env.SERVER_PORT}/color`, {
                method: "GET",
                mode: "cors"
            })

            if (response.status === 404) {
                return
            }

            if (!response.ok) {
                alert("Some error occurred")
                return
            }

            const { color } = await response.json()

            setBgColor(color)
        })()
    }, [])

    // Store the color in the server if its PCD is valid
    // and then updates the background color of this page.
    useEffect(() => {
        ;(async () => {
            if (passportPCDString) {
                const { pcd } = JSON.parse(passportPCDString)

                const response = await fetch(`http://localhost:${process.env.SERVER_PORT}/color`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        pcd
                    })
                })

                if (!response.ok) {
                    alert("Some error occurred")
                    return
                }

                alert(`The signature is valid, the background color will be changed`)

                const { color } = await response.json()

                setBgColor(color)
            }
        })()
    }, [passportPCDString])

    // Update the background color.
    const setBgColor = useCallback((color: string) => {
        const appElement = document.getElementById("app")!

        appElement.style.backgroundColor = color
    }, [])

    // Get the EdDSA PCD with the color signed by the issuer.
    const getEdDSAPCD = useCallback(() => {
        const url = getWithoutProvingUrl(
            process.env.PCDPASS_URL as string,
            window.location.origin + "/popup",
            EdDSAPCDPackage.name
        )

        openPassportPopup("/popup", url)
    }, [])

    return <button onClick={getEdDSAPCD}>Get a PCD signature with your color</button>
}
