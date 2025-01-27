import { fb } from 'service';
import { useChat } from 'context';
import { Image } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import { useResolved } from 'hooks';

export const ChatAvatar = ({ chat, username, className }) => {
  const { chatConfig } = useChat();
  const fbResolved = useResolved(fb);
  const [avatar, setAvatar] = useState('');
  useEffect(() => {
      fbResolved.firestore
        ?.collection('chatUsers')
        .where('userName', '===', username)
        .get()
        .then(snap => {
          const data = snap?.docs[0].data();
          if (data?.avatar) {
            setAvatar(data.avatar);
        }});

  });

  return avatar ? (
    
    <Image className={className || 'chat-list-avatar'} src={avatar} />
  )
  : (

    <div className={className || 'empty-avatar'}>
      {chat.people
        .find(p => p?.person?.username
           !==
           chatConfig?.userName)?.person?.username[0].toUpperCase()}
    </div>
  );
};