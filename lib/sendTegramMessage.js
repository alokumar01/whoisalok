export const sendTelegramMessage = async (message) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        const res = await fetch(telegramUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
            }),
        });

        const data = await res.json();
        
        if(!data.ok) {
            console.log("telegram api error:", data.description);
        }
    } catch (error) {
        console.log("Failed to send message", error);
    }
}