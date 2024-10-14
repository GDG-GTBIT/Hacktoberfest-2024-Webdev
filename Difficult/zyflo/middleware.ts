import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    request.headers.set("x-url", request.url);

    return NextResponse.next();
}