import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import GarcyBootLoader from "@/components/garcy/GarcyBootLoader";

export default function Home() {
  const router = useRouter();

  // Clear any legacy sessionStorage flags so the loading screen always appears
  useEffect(() => {
    try {
      sessionStorage.removeItem("aac_boot_done");
    } catch (e) {}
  }, []);

  const handleBootComplete = () => {
    router.push("/moment");
  };

  return (
    <>
      <Head>
        <title>ADVANCED ACADEMIC CENTER // GRIET HYDERABAD</title>
        <meta
          name="description"
          content="Advanced Academic Center (AAC) at GRIET Hyderabad. Interdisciplinary student research center for autonomous systems, patents, R&D projects, and publications."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Full-screen Boot Loader — clicking "Enter" routes directly to /moment */}
      <GarcyBootLoader onComplete={handleBootComplete} />
    </>
  );
}
