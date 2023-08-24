"use client"

import { getWithoutProvingUrl, openPassportPopup, usePassportPopupMessages } from "@pcd/passport-interface"
import { SemaphoreSignaturePCDPackage } from "@pcd/semaphore-signature-pcd"
import { useEffect } from "react"
import styles from "./page.module.css"

const PCDPASS_URL = "http://localhost:3000"

export default function Home() {
    const [passportPCDStr] = usePassportPopupMessages()

    useEffect(() => {
        console.log(passportPCDStr)
    }, [passportPCDStr])

    return (
        <main className={styles.main}>
            <button onClick={getSemaphoreSignature}>Get a PCD from PCD pass</button>
        </main>
    )
}

async function getSemaphoreSignature() {
    const url = getWithoutProvingUrl(PCDPASS_URL, window.location.origin + "/popup", SemaphoreSignaturePCDPackage.name)

    openPassportPopup("/popup", url)
}
