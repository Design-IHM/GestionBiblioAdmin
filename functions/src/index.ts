import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialise l'application admin pour pouvoir accéder à Firestore
admin.initializeApp();
const db = admin.firestore();

/**
 * Cloud Function HTTP qui vérifie un token de compte.
 * S'active lorsqu'un utilisateur clique sur le lien dans son email.
 */
export const verifyAccount = functions.https.onRequest(async (request, response) => {
	const token = request.query.token as string;

	if (!token) {
		response.status(400).send(generateHtmlResponse("Erreur", "Token de vérification manquant."));
		return;
	}

	try {
		const adminsRef = db.collection("BiblioAdmin");
		const snapshot = await adminsRef.where("verificationToken", "==", token).limit(1).get();

		if (snapshot.empty) {
			response.status(404).send(generateHtmlResponse("Échec de la Vérification", "Ce lien est invalide ou a déjà été utilisé. Veuillez réessayer de vous inscrire."));
			return;
		}

		const adminDoc = snapshot.docs[0];
		await adminDoc.ref.update({
			isVerified: true,
			verificationToken: admin.firestore.FieldValue.delete(), // Supprime le token pour la sécurité
		});

		response.status(200).send(generateHtmlResponse("Compte Vérifié !", "Votre compte a été activé avec succès. Vous pouvez maintenant fermer cette page et vous connecter à l'application."));
	} catch (error) {
		console.error("Erreur lors de la vérification du token:", error);
		response.status(500).send(generateHtmlResponse("Erreur Serveur", "Une erreur interne est survenue. Veuillez contacter le support."));
	}
});

/**
 * Génère une page HTML simple pour la réponse.
 */
function generateHtmlResponse(title: string, message: string): string {
	const isSuccess = title.toLowerCase().startsWith("compte vérifié");
	const primaryColor = isSuccess ? "#22c55e" : "#ef4444";
	const icon = isSuccess
		? `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
		: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

	return `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vérification de Compte</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #f3f4f6; margin: 0; padding: 20px; }
                .card { background-color: white; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); padding: 40px; text-align: center; max-width: 450px; width: 100%; }
                .icon { color: ${primaryColor}; margin-bottom: 20px; }
                h1 { color: #1f2937; font-size: 24px; margin-top: 0; margin-bottom: 12px; }
                p { color: #4b5563; font-size: 16px; }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="icon">${icon}</div>
                <h1>${title}</h1>
                <p>${message}</p>
            </div>
        </body>
        </html>
    `;
}