import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signJwt } from "@/lib/jwt";
import { getUserByEmail } from "@/modules/auth/service";

// Schéma de validation Zod (sécurité + conformité)
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.boolean().optional()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = LoginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ message: "Format des identifiants incorrect" }, { status: 400 });
    }
    const { email, password, remember } = result.data;
    const user = await getUserByEmail(email);
    if (!user) {
      // Ne jamais révéler si l'email existe (anti-enumération)
      return NextResponse.json({ message: "Identifiants invalides" }, { status: 401 });
    }
    const passwordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordValid) {
      return NextResponse.json({ message: "Identifiants invalides" }, { status: 401 });
    }
    // Génération du JWT sécurisé (payload minimal)
    const token = signJwt({
      sub: user.id,
      email: user.email,
      role: user.role
    });
    // Cookie sécurisé, HTTPOnly, SameSite strict
    const response = NextResponse.json({ message: "Connexion réussie" });
    response.cookies.set("kaya-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 4 // 30j ou 4h
    });
    return response;
  } catch (error) {
    // Journalisation, pas de fuite d'info sensible
    console.error("[LOGIN]", error);
    return NextResponse.json({ message: "Erreur serveur, réessayez." }, { status: 500 });
  }
}
