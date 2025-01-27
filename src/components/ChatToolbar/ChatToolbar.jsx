import { useState } from "react";
import { useChat } from "context";
import { joinUsernames, notMe } from "helpers";
import { Icon } from "semantic-ui-react";
import { ChatAvatar, SearchUsers } from "components";
export const ChatToolbar = () => {
  const { chatConfig, selectedChat } = useChat();
  const [searching, setSearching] = useState(false);

  return (
    <>
      <div className="chat-toolbar">
        <div className="chat-header-text">
          {selectedChat.people.length === 1 ? (
            <>
              <Icon circular inverted color="violet" name="user cancel" />
              <div className="chat-list-preview">
                <div className="preview-username">No One Added Yet</div>
              </div>
            </>
          ) : selectedChat.people.length === 2 ? (
            <>
              <ChatAvatar
                username={notMe(chatConfig, selectedChat)}
                chat={selectedChat}
              />
              <div className="chat-list-preview">
                <div className="preview-username">
                  {notMe(chatConfig, selectedChat)}
                </div>
              </div>
            </>
          ) : (
            <>
              <Icon circular inverted color="brown" name="users" />
              <div className="chat-list-preview">
                <div className="preview-username">
                  {joinUsernames(
                    selectedChat.people,
                    chatConfig.userName
                  ).slice(0, 200)}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="add-user-icon">
          <Icon
            color="grey"
            name="user plus"
            onClick={() => setSearching(true)}
          />
        </div>
      </div>

      <SearchUsers closeFn={() => setSearching(false)} visible={searching} />
    </>
  );
};
