import { NextResponse } from "next/server";

// Fallback API route — если EmailJS не настроен, форма может слать сюда
// В текущей конфигурации используется EmailJS (клиентская отправка)
// Этот endpoint нужен только если захотите переключиться на серверную отправку

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Логируем заявку в консоль сервера (не теряем лиды)
    console.log("=== НОВАЯ ЗАЯВКА ===");
    console.log(JSON.stringify(data, null, 2));
    console.log("====================");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
