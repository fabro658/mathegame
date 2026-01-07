import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Config serveur manquante (SUPABASE_SERVICE_ROLE_KEY / URL)." },
        { status: 500 }
      );
    }

    // 1) Lire le token d'auth depuis l'en-tête
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    if (!token) {
      return NextResponse.json(
        { error: "Non autorisé: token manquant." },
        { status: 401 }
      );
    }

    // 2) Vérifier le token et récupérer l'utilisateur
    const supabaseAuth = createClient(
      supabaseUrl,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );

    const { data: userData, error: userError } = await supabaseAuth.auth.getUser(
      token
    );

    if (userError || !userData?.user) {
      return NextResponse.json(
        { error: "Non autorisé: session invalide." },
        { status: 401 }
      );
    }

    const userId = userData.user.id;

    // 3) Supprimer l'utilisateur via admin (service role)
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      userId
    );

    if (deleteError) {
      return NextResponse.json(
        { error: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erreur inconnue." },
      { status: 500 }
    );
  }
}
