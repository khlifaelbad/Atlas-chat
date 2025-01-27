import { useEffect } from "react";
import { useChat } from "context";
import { getChats, ChatEngine } from "react-chat-engine";
import { LeftRail, ChatToolbar, ChatInput, MessageList } from "components";
import { useAuth, useResolved } from "hooks";
import { useHistory } from "react-router-dom";

export const Chat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    setSelectedChat,
  } = useChat();
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);


  useEffect(() => {
    if (authResolved) {
      history.push(!!authUser ? "/chat" : "/login");
    }
  }, [authResolved, authUser, history]);

  return (
    <>
      {!!chatConfig && (
        <ChatEngine
          hideUI={true}
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onConnect={() => {
            getChats(chatConfig, setMyChats);
          }}
          onNewChat={(chat) => {
            if (chat.admin.username === chatConfig.userName) {
              selectChatClick(chat);
            }
            setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
          }}
          onDeleteChat={(chat) => {
            if (selectedChat?.id === chat.id) {
              setSelectedChat(null);
            }
            setMyChats(
              myChats
                .filter((chat) => chat.id !== chat.id)
                .sort((a, b) => a.id - b.id)
            );
          }}
          onNewMessage={(chatId, message) => {
            if (selectedChat && chatId === selectedChat.id) {
              setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, message],
              });
            }
            const chatThatMessageBelongsTo = myChats.find(
              (chat) => chat.id === chatId
            );
            const filteredChats = myChats.filter((chat) => chat.id !== chatId);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              last_message: message,
            };
            setMyChats(
              [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id)
            );
          }}
        />
      )}

      <div className="chat-container">
        <LeftRail />
        <div className="current-chat">
          {selectedChat ? (
            <div className="chat">
              <ChatToolbar />
              <MessageList />
              <ChatInput />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
