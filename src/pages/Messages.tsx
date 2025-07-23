import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile
} from 'lucide-react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState('1');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'Adewale Johnson',
      role: 'Agent',
      lastMessage: 'The property viewing is scheduled for tomorrow at 2 PM',
      timestamp: '2 min ago',
      unread: 2,
      avatar: '/placeholder.svg',
      property: 'Luxury 3BR Apartment in VI',
      online: true,
    },
    {
      id: '2',
      name: 'Funmi Okafor',
      role: 'Agent',
      lastMessage: 'I can arrange a virtual tour if you prefer',
      timestamp: '1 hour ago',
      unread: 0,
      avatar: '/placeholder.svg',
      property: 'Modern Duplex in Lekki',
      online: false,
    },
    {
      id: '3',
      name: 'Emeka Chukwu',
      role: 'Landlord',
      lastMessage: 'The rent includes utilities and maintenance',
      timestamp: '3 hours ago',
      unread: 1,
      avatar: '/placeholder.svg',
      property: 'Executive 2BR Flat in Ikoyi',
      online: true,
    },
  ];

  const messages = [
    {
      id: '1',
      senderId: '2',
      content: 'Hello! I saw your listing for the luxury apartment in Victoria Island. Is it still available?',
      timestamp: '2:30 PM',
      isOwn: true,
    },
    {
      id: '2',
      senderId: '1',
      content: 'Yes, it is still available! Would you like to schedule a viewing?',
      timestamp: '2:35 PM',
      isOwn: false,
    },
    {
      id: '3',
      senderId: '2',
      content: 'That would be great. What times work best for you this week?',
      timestamp: '2:36 PM',
      isOwn: true,
    },
    {
      id: '4',
      senderId: '1',
      content: 'I have availability tomorrow (Tuesday) at 2 PM or Thursday at 10 AM. Both work well for touring the property.',
      timestamp: '2:40 PM',
      isOwn: false,
    },
    {
      id: '5',
      senderId: '2',
      content: 'Tomorrow at 2 PM works perfectly for me. Should I meet you at the property?',
      timestamp: '2:42 PM',
      isOwn: true,
    },
    {
      id: '6',
      senderId: '1',
      content: 'Perfect! Yes, please meet me at the building entrance. The address is 45 Ahmadu Bello Way, Victoria Island. I\'ll send you my contact number.',
      timestamp: '2:45 PM',
      isOwn: false,
    },
    {
      id: '7',
      senderId: '1',
      content: 'My number is +234 801 234 5678. Looking forward to meeting you tomorrow!',
      timestamp: '2:46 PM',
      isOwn: false,
    },
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  return (
    <div className="h-screen bg-secondary/20 flex">
      {/* Conversations List */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b cursor-pointer hover:bg-secondary/50 transition-colors ${
                selectedChat === conversation.id ? 'bg-primary/10 border-r-2 border-r-primary' : ''
              }`}
              onClick={() => setSelectedChat(conversation.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>
                      {conversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {conversation.role}
                    </Badge>
                    {conversation.unread > 0 && (
                      <Badge variant="default" className="text-xs bg-primary">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {conversation.property}
                  </p>
                  
                  <p className="text-sm text-muted-foreground mt-1 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatar} />
                  <AvatarFallback>
                    {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedConversation.name}</h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {selectedConversation.role}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {selectedConversation.property}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] space-y-1`}>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white border'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className={`text-xs text-muted-foreground ${
                      message.isOwn ? 'text-right' : 'text-left'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t p-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  variant="default"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                No conversation selected
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;