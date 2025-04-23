import { NextRequest, NextResponse } from "next/server";
import { getDashboardData } from "@/modules/dashboard/service";
import { verifyJwt } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("kaya-token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }
    const user = verifyJwt(token);
    if (!user) {
      return NextResponse.json({ message: "Token invalide" }, { status: 401 });
    }
    const data = await getDashboardData(user.id, user.role);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("[DASHBOARD]", error);
    return NextResponse.json({ message: "Erreur serveur dashboard" }, { status: 500 });
  }
}
