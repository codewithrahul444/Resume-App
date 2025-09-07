import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../context/I18nContext';

export default function ChatScreen() {
  const { theme } = useTheme();
  const { t } = useI18n();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock user for demo
  const user = {
    id: 'demo-user',
    first_name: 'Demo User',
    photo_url: null
  };

  useEffect(() => {
    // Add welcome message
    setMessages([
      {
        _id: 1,
        text: 'Welcome to Resume Craft Pro! I can help you create professional resumes. Type "help" to see available commands.',
        createdAt: new Date(),
        user: {
          _id: 'bot',
          name: 'Resume Bot',
          avatar: null,
        },
      },
    ]);
  }, []);

  const onSend = useCallback(async (newMessages = []) => {
    const message = newMessages[0];
    
    // Add user message to chat
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(message.text);
      const botMessage = {
        _id: Math.random().toString(),
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 'bot',
          name: 'Resume Bot',
          avatar: null,
        },
      };
      
      setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
    }, 1000);
  }, []);

  const generateBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('help')) {
      return 'Available commands:\n• "create resume" - Start creating a new resume\n• "templates" - View available templates\n• "my resumes" - View saved resumes\n• "contact info" - Add your contact details';
    }
    
    if (msg.includes('create resume') || msg.includes('new resume')) {
      return 'Great! Let\'s create your resume. First, please tell me your full name.';
    }
    
    if (msg.includes('templates')) {
      return 'Available templates:\n• Professional\n• Modern\n• Creative\n• Minimal\n\nWhich template would you like to use?';
    }
    
    if (msg.includes('my resumes')) {
      return 'You have 2 saved resumes:\n• Software Developer Resume (Created: 2 days ago)\n• Marketing Manager Resume (Created: 1 week ago)\n\nWhich one would you like to view or edit?';
    }
    
    return 'I understand you want to work on your resume. Type "help" to see available commands, or tell me what specific help you need with your resume.';
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: theme.colors.primary },
        left: { backgroundColor: theme.colors.surfaceVariant },
      }}
      textStyle={{
        right: { color: '#fff' },
        left: { color: theme.colors.onSurface },
      }}
    />
  );

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={[
        styles.inputToolbar,
        { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.outline }
      ]}
      textInputStyle={{ color: theme.colors.onSurface }}
    />
  );

  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendContainer}>
      <Ionicons name="send" size={24} color={theme.colors.primary} />
    </Send>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: user.id }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        placeholder="Type your message..."
        scrollToBottom
        scrollToBottomComponent={() => (
          <Ionicons name="chevron-down" size={24} color={theme.colors.primary} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputToolbar: {
    borderTopWidth: 1,
    paddingHorizontal: 8,
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
});
