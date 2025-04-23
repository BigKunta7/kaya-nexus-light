import { NextRequest, NextResponse } from "next/server";
import { getOAuthUrl, handleOAuthCallback } from "@/modules/auth/oauthService";

// GET = Redirection vers le provider OAuth (Google, Microsoft, Apple...)
export async function GET(req: NextRequest, { params }: { params: { provider: string } }) {
  const { provider } = params;
  const redirectUrl = getOAuthUrl(provider);
  if (!redirectUrl) {
    return NextResponse.json({ message: "Provider non supporté" }, { status: 400 });
  }
  return NextResponse.redirect(redirectUrl);
}

// POST = Callback du provider (à sécuriser, à compléter selon le provider)
export async function POST(req: NextRequest, { params }: { params: { provider: string } }) {
  const { provider } = params;
  try {
    const { user, token } = await handleOAuthCallback(req, provider);
    if (!user || !token) {
      return NextResponse.json({ message: "Authentification échouée" }, { status: 401 });
    }
    const response = NextResponse.json({ message: "Connexion OAuth réussie" });
    response.cookies.set("kaya-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30 // 30 jours
    });
    return response;
  } catch (error) {
    console.error("[OAUTH]", error);
    return NextResponse.json({ message: "Erreur OAuth" }, { status: 500 });
  }
}
