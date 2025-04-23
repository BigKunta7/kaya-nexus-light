// Service notifications temps réel (WebSocket, push) — squelette à compléter côté infra
export async function notifyUser(userId: string, payload: any) {
  // À brancher sur un serveur WebSocket ou service push
  // Exemple : ws.send(userId, JSON.stringify(payload))
}

export async function broadcastToRoom(roomId: string, payload: any) {
  // À brancher sur un serveur WebSocket ou service push
}
