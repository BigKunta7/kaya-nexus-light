import { NextRequest, NextResponse } from "next/server";
import { getCollaborationFeed, postCollaborationMessage, getComments } from "@/modules/collaboration/service";
import { verifyJwt } from "@/lib/jwt";
import { z } from "zod";

// Validation Zod stricte pour les messages de collaboration
const CollaborationMessageSchema = z.object({
  type: z.enum(["chat", "comment", "edit"]),
  content: z.string().min(1).max(2000),
  targetId: z.string().optional(), // Pour commenter un doc, une tâche, etc.
});

// GET : Récupérer le fil de collaboration (chat, commentaires, édition collaborative)
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
    const feed = await getCollaborationFeed(user.id, user.role);
    return NextResponse.json({ feed });
  } catch (error) {
    console.error("[COLLABORATION]", error);
    return NextResponse.json({ message: "Erreur serveur collaboration" }, { status: 500 });
  }
}

// POST : Envoyer un message/commentaire/collab
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("kaya-token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }
    const user = verifyJwt(token);
    if (!user) {
      return NextResponse.json({ message: "Token invalide" }, { status: 401 });
    }
    const body = await req.json();
    const parsed = CollaborationMessageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Payload invalide", errors: parsed.error.errors }, { status: 400 });
    }
    // TODO: Gestion fine des permissions par type
    const message = await postCollaborationMessage(user.id, parsed.data);
    // Audit/logging ici
    return NextResponse.json({ message });
  } catch (error) {
    console.error("[COLLABORATION-POST]", error);
    return NextResponse.json({ message: "Erreur serveur collaboration" }, { status: 500 });
  }
}

// Nouveau endpoint : GET /api/v1/collaboration/comments
export async function GET_COMMENTS(req: NextRequest) {
  try {
    const token = req.cookies.get("kaya-token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }
    const user = verifyJwt(token);
    if (!user) {
      return NextResponse.json({ message: "Token invalide" }, { status: 401 });
    }
    const url = new URL(req.url);
    const targetId = url.searchParams.get("targetId");
    if (!targetId) {
      return NextResponse.json({ message: "targetId requis" }, { status: 400 });
    }
    const comments = await getComments(targetId, user.id, user.role);
    return NextResponse.json({ comments });
  } catch (error) {
    console.error("[COLLABORATION-COMMENTS]", error);
    return NextResponse.json({ message: "Erreur serveur collaboration/comments" }, { status: 500 });
  }
}
