import json
from typing import List

from app.models.actions import Action
from starlette.websockets import WebSocket


class WebsocketConnection:
    socket: WebSocket
    projectId: str

    def __init__(self, websocket: WebSocket, id: str):
        self.socket = websocket
        self.projectId = id


class WebsocketManager():
    active_connections: List[WebsocketConnection]

    def __init__(self):
        self.active_connections: List[WebsocketConnection] = []

    async def connect(self, websocket: WebSocket, projectId: str) -> WebsocketConnection:
        await websocket.accept()
        connection = WebsocketConnection(websocket, projectId)
        self.active_connections.append(connection)
        return connection

    def disconnect(self, connection: WebsocketConnection):
        self.active_connections.remove(connection)

    async def send_by_projectId(self, action: Action, projectId: str):
        users = (
            conn for conn in self.active_connections if conn.projectId == projectId)
        for user in users:
            await user.socket.send_json(json.dumps({
                "event": action.name,
                "projectId": projectId
            }))


wsManager = WebsocketManager()
