import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
    const fileName = req.nextUrl.searchParams.get("fileName");

    if (!fileName) {
        return NextResponse.json({ error: "File name is required" }, { status: 400 });
    }

    try {
        const filePath = path.resolve(process.cwd(), fileName);
        let content = fs.readFileSync(filePath, "utf8");

        // Convert tabs to 4 spaces
        content = content.replace(/\t/g, "    ");

        return NextResponse.json({ content });
    } catch (error) {
        console.error("Error reading file:", error);
        return NextResponse.json({ error: "Error reading file" }, { status: 500 });
    }
}
