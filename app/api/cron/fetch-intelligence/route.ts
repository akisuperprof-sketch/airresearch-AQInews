import { NextResponse } from "next/server";
import { collectAllIntelligence } from "@/lib/intelligence/collectors";
import { saveIntelligenceItems } from "@/lib/intelligence/service";

// Vercel Cron or manual trigger
export async function GET(request: Request) {
  try {
    // Vercel Cron 認証 (本番環境のみチェック)
    if (process.env.NODE_ENV === "production") {
      const authHeader = request.headers.get("authorization");
      if (
        process.env.CRON_SECRET &&
        authHeader !== `Bearer ${process.env.CRON_SECRET}`
      ) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    console.log("Starting intelligence collection...");
    const items = await collectAllIntelligence();
    
    console.log(`Collected ${items.length} items. Saving to database...`);
    const result = await saveIntelligenceItems(items);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to save intelligence items", details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Intelligence items fetched and saved successfully",
      collectedCount: items.length,
      savedCount: result.count
    });
  } catch (error) {
    console.error("Cron Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
