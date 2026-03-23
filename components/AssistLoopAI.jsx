"use client";
import Script from "next/script"

export default function AssistLoopAI() {
    return (
        <Script
            src="https://assistloop.ai/assistloop-widget.js"
            strategy="afterInteractive"
            onLoad={() => {
                window.AssistLoopWidget?.init({
                    agentId: process.env.NEXT_PUBLIC_ASSISTLOOP_AGENT_ID,
                });
            }}
        />
    )
}