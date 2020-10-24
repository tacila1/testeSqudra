package com.squad.prova.chat;

import java.util.HashMap;

import org.codehaus.jackson.map.util.JSONPObject;
import org.json.JSONObject;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class ChatWebSocketHandler extends TextWebSocketHandler {

	private final HashMap<Long, WebSocketSession> sessoes = new HashMap<Long, WebSocketSession>();

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Long id = getIdOfUri(session.getUri().toString());
		sessoes.put(id, session);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		int idTarget = (int) new JSONObject(message.getPayload()).get("toId");
		WebSocketSession sessionTarget = sessoes.get(new Long(idTarget));
		if (sessionTarget != null) {
			sessionTarget.sendMessage(message);
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessoes.remove(getIdOfUri(session.getUri().toString()));
	}

	private Long getIdOfUri(String uri) {
		int index = uri.indexOf("id");
		String idP = uri.substring(index + 3, uri.length());
		return Long.parseLong(idP);

	}

}
