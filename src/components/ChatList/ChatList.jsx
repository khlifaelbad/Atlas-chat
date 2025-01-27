import React from "react";
import { useChat } from "context";
import { ChatAvatar } from "components";
import { Icon } from "semantic-ui-react";
import { joinUsernames, notMe } from "helpers";
import { useEffect } from "react";

export const ChatList = () => {
  const {
    myChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    deleteChatClick,
  } = useChat();
  useEffect(() => {
    console.log(
      myChats,
      chatConfig,
      selectedChat,
      selectChatClick,
      deleteChatClick
    );
  });

  return (
    <div className="chat-list">
      {myChats.map((chat, index) => (
        <div
          className={`chat-list-item ${
            selectedChat?.id === chat.id ? "selected-chat-item" : ""
          }`}
          key={index}
        >
          <div
            onClick={() => selectChatClick(chat)}
            className="chat-list-item-content"
          >
            {chat.people.length === 1 ? (
              <>
                <Icon circular inverted color="violet" name="user cancel" />
                <div className="chat-list-preview">
                  <div className="preview-username">No One Added Yet</div>
                </div>
              </>
            ) : chat.people.length === 2 ? (
              <>
                <ChatAvatar username={notMe(chatConfig, chat)} chat={chat} />

                <div className="chat-list-preview">
                  <div className="preview-username">
                    {notMe(chatConfig, chat)}
                  </div>
                  <div className="preview-message">
                    {chat.last_message.attachments.length
                      ? `${chat.last_message.sender.username} sent an attachment`
                      : chat.last_message.text.slice(0, 60) + "..."}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Icon circular inverted color="brown" name="users" />
                <div className="chat-list-preview">
                  <div className="preview-username">
                    {joinUsernames(chat.people, chatConfig.userName).slice(
                      0,
                      50
                    )}
                    ...
                  </div>
                  <div className="preview-message">
                    {chat.last_message.attachments.length
                      ? `${chat.last_message.sender.username} sent an attachment`
                      : chat.last_message.text.slice(0, 50) + "..."}
                  </div>
                </div>
              </>
            )}
          </div>
          {console.log("chat:", chat)}
          <div
            onClick={() => {
              deleteChatClick(chat);
              window.location.reload();
            }}
            className="chat-item-delete"
          >
            <Icon name="delete" />
          </div>
        </div>
      ))}
    </div>
  );
};
